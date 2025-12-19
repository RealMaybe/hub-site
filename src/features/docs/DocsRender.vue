<template>
    <div class="docs-renderer">
        <div v-if="isLoading" class="loading">
            加载中...
        </div>
        <div v-else-if="error" class="error">
            {{ error }}
        </div>
        <article v-else ref="markdownContainer" class="markdown-body" v-html="renderedHtml"></article>
    </div>
</template>

<script setup lang="ts">
import type { MarkdownRenderResult } from "@tsTypes";
import { ref, watch, onMounted, nextTick } from "vue";
import { renderMarkdownFromUrl } from "@/utils";

const { mdUrl } = defineProps<{
    mdUrl: string;
}>();

const renderedHtml = ref<string>("");
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);

const loadMarkdown = async (url: string): Promise<void> => {
    try {
        isLoading.value = true;
        error.value = null;
        renderedHtml.value = "";

        const result: MarkdownRenderResult = await renderMarkdownFromUrl(url, {
            includeFrontMatter: false,
        });

        renderedHtml.value = result.html;

        // 等待 DOM 更新后增强代码块
        await nextTick();
    } catch (err) {
        console.error("Error loading markdown:", err);
        error.value = err instanceof Error ? err.message : "加载 Markdown 内容时发生未知错误";
        renderedHtml.value = /* html */`<p>内容加载失败</p>`;
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    if (mdUrl) loadMarkdown(mdUrl);
});

watch(
    () => mdUrl,
    newUrl => {
        if (newUrl) loadMarkdown(newUrl);
    }
);
</script>

<style scoped lang="less">
.docs-renderer {
    width: 100%;

    .loading,
    .error {
        padding: 20px;
        color: #666;
    }

    .error {
        color: #e53e3e;
    }
}
</style>
