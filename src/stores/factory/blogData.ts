import type { BlogItem, ContentCache } from "@tsTypes";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

/* ========== */

/**
 * 定义一个 Pinia Store，用于统一管理文档数据的加载与缓存
 * 支持：
 * - 拉取远端索引（index.json）
 * - 按需加载单个文档内容
 * - 批量预加载所有文档（带并发控制）
 * - 内容缓存与错误处理
 */
export const useBlogDataStore = defineStore("blogData", () => {
    const list = ref<BlogItem[]>([]); // 存储从远端加载的文档元信息列表
    const loaded = ref(false); // 标记索引是否已成功加载过
    const loading = ref(false); // 标记当前是否正在加载索引（用于 UI 反馈）
    const error = ref<string | null>(null); // 存储最近发生的错误信息（便于调试或提示用户）
    const contentCache = ref<ContentCache>({}); // 缓存已加载的 Markdown 内容，避免重复请求

    /**
     * 计算属性：根据 slug 快速查找文档元信息
     * 返回一个函数，调用时传入 slug 即可获取对应条目
     * 例如：bySlug.value("blog/20250924-test")
     */
    const bySlug = computed(() => (slug: string) => list.value.find(item => item.slug === slug));

    /**
     * 加载文档索引文件（index.json）
     * 该方法只会执行一次，后续调用将直接返回
     * 成功后填充 list 并设置 loaded 为 true
     */
    async function fetchIndex() {
        // 如果已经加载过或正在加载，直接返回，避免重复请求
        if (loaded.value || loading.value) return;
        loading.value = true;
        error.value = null; // 清除旧错误

        try {
            // 请求远端索引文件
            const url =
                "https://raw.githubusercontent.com/RealMaybe/realmaybe-io-website-data/main/data/docs.json";
            const res = await fetch(url);

            // 检查响应状态
            if (!res.ok) throw new Error(`索引请求失败: ${res.status} ${res.statusText}`);

            // 解析 JSON 数据
            const data = await res.json();

            // 确保返回的是数组，防止格式错误
            if (!Array.isArray(data)) throw new Error("远端数据格式错误：期望一个数组");

            // 更新状态
            list.value = data;
            loaded.value = true;
        } catch (err) {
            // 捕获并记录错误
            error.value = err instanceof Error ? err.message : String(err);
            console.error("[BlogDataStore] fetchIndex error:", err);
        } finally {
            // 无论成功或失败，结束加载状态
            loading.value = false;
        }
    }

    /**
     * 根据 slug 加载指定文档的 Markdown 内容
     * 自动检查缓存，若已存在则直接返回
     * 否则发起网络请求获取内容并写入缓存
     * @param slug - 文档唯一标识
     * @returns Promise<string> - Markdown 原文
     */
    async function fetchContent(slug: string): Promise<string> {
        // 如果缓存中已有，直接返回
        if (contentCache.value[slug]) return contentCache.value[slug];

        // 查找文档元信息
        const meta = bySlug.value(slug);
        if (!meta) throw new Error(`找不到 slug: ${slug}`);
        if (!meta.link || typeof meta.link !== "string") throw new Error(`无效的链接字段: ${slug}`);

        // 清理 URL：去除空格并进行编码，防止请求失败
        const cleanURL = meta.link.trim().replace(/ /g, "%20");

        let res: Response;
        try {
            // 发起请求
            res = await fetch(cleanURL);
            // 检查响应状态
            if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        } catch (err) {
            throw new Error(`网络请求失败 (${slug}): ${err instanceof Error ? err.message : err}`);
        }

        let md: string;
        try {
            // 读取响应体为文本
            md = await res.text();
        } catch (err) {
            throw new Error(`内容解析失败 (${slug}): ${err instanceof Error ? err.message : err}`);
        }

        // 写入缓存，避免下次重复请求
        contentCache.value[slug] = md;
        return md;
    }

    // 最大并发请求数，防止触发 GitHub 的速率限制（未认证用户约 60/小时）
    const MAX_CONCURRENT = 5;

    /**
     * 批量加载所有非系统类型的 Markdown 文档
     * 使用并发控制，避免一次性发起过多请求
     * 适用于需要预加载全部内容的场景
     */
    async function fetchAllContents() {
        // 确保索引已加载
        if (!loaded.value) await fetchIndex();

        // 筛选出需要加载的 Markdown 文件（排除系统文件）
        const mdItems = list.value.filter(
            item => item.link?.endsWith(".md") && item.type !== "system"
        );

        // 如果没有需要加载的项目，直接返回
        if (mdItems.length === 0) return;

        // 创建任务队列
        const queue = [...mdItems];
        const workers: Promise<void>[] = [];

        // 启动多个并发工作线程（最多 MAX_CONCURRENT 个）
        for (let i = 0; i < Math.min(MAX_CONCURRENT, queue.length); i++) {
            workers.push(
                (async () => {
                    // 每个工作线程持续从队列中取任务，直到为空
                    while (queue.length > 0) {
                        const item = queue.shift()!;
                        try {
                            await fetchContent(item.slug);
                        } catch (err) {
                            // 失败时不中断整体流程，仅记录警告
                            console.warn(`[BlogDataStore] 内容加载失败 (${item.slug}):`, err);
                        }
                    }
                })()
            );
        }

        // 等待所有工作线程完成
        await Promise.all(workers);
    }

    /**
     * 清空所有已缓存的 Markdown 内容
     * 用于刷新数据或释放内存
     */
    function clearCache() {
        Object.keys(contentCache.value).forEach(key => {
            delete contentCache.value[key];
        });
    }

    /**
     * 检查某个文档的内容是否已被缓存
     * @param slug - 文档唯一标识
     * @returns boolean - 是否已缓存
     */
    const hasCached = (slug: string): boolean => !!contentCache.value[slug];

    // 暴露所有状态和方法，供组件或其他模块使用
    return {
        // 状态
        list,
        loaded,
        loading,
        error,
        contentCache,

        // 计算属性
        bySlug,

        // 操作方法
        fetchIndex,
        fetchContent,
        fetchAllContents,
        clearCache,
        hasCached,
    };
});
