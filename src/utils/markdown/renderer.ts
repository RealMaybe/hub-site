import type {
    FrontMatterResult,
    FrontMatterAttributes,
    MarkdownRenderResult,
    MarkdownRenderOptions,
} from "@tsTypes";

import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import highlight from "markdown-it-highlightjs";
import frontMatter from "front-matter";

import hljs from "./hljs-config";
import { formatFrontMatterAsMarkdown } from "./front-matter";

/* ========== */

/**
 * 创建配置好的 Markdown 渲染器实例
 *
 * @param options - 渲染器配置选项
 * @returns 配置完成的 MarkdownIt 实例
 *
 * @example
 * ```typescript
 * const md = createMarkdownRenderer();
 * const html = md.render("# Hello World");
 * ```
 */
export const createMarkdownRenderer = (options: MarkdownRenderOptions = {}): MarkdownIt => {
    const { enableHighlight = true, enableAnchor = true, enableHTML = true } = options;

    const md = new MarkdownIt({
        html: enableHTML,
        linkify: true,
        typographer: true,
        highlight: enableHighlight
            ? (code: string, lang: string): string =>
                  /* html */ `<pre class="language-${lang}"><code>${code}</code></pre>`
            : undefined,
    });

    if (enableAnchor) md.use(anchor);
    if (enableHighlight) md.use(highlight, { hljs });

    return md;
};

/**
 * 渲染 Markdown 文本为 HTML
 *
 * @param markdownText - 原始 Markdown 文本
 * @param options - 渲染配置选项
 * @returns 包含渲染结果和 Front Matter 数据的对象
 *
 * @example
 * ```typescript
 * // 基本用法
 * const result = renderMarkdown("# Title\n\nContent");
 *
 * // 禁用 Front Matter 处理
 * const result = renderMarkdown(markdownText, {
 *   includeFrontMatter: false
 * });
 *
 * // 自定义 Front Matter 标题
 * const result = renderMarkdown(markdownText, {
 *   frontMatterTitle: "元数据"
 * });
 * ```
 */
export const renderMarkdown = (
    markdownText: string,
    options: MarkdownRenderOptions = {}
): MarkdownRenderResult => {
    const { includeFrontMatter = true } = options;

    const md = createMarkdownRenderer(options);

    // 解析 front matter
    const parsed: FrontMatterResult<FrontMatterAttributes> = frontMatter(markdownText);

    // 如果有 front matter，根据配置决定是否添加表格
    let finalMarkdown = parsed.body;
    const hasFrontMatter = Object.keys(parsed.attributes).length > 0;

    if (hasFrontMatter && includeFrontMatter) {
        const frontMatterTable = formatFrontMatterAsMarkdown(parsed.attributes);
        finalMarkdown = frontMatterTable + parsed.body;
    }

    const html = md.render(finalMarkdown);

    return {
        html,
        frontMatter: hasFrontMatter ? parsed.attributes : undefined,
    };
};

/**
 * 从远程 URL 加载并渲染 Markdown 内容
 *
 * @param url - Markdown 文件的远程 URL
 * @param options - 渲染配置选项
 * @returns 包含渲染结果和 Front Matter 数据的 Promise
 *
 * @throws { Error } 当网络请求失败或 HTTP 状态码非 200 时抛出错误
 *
 * @example
 * ```typescript
 * // 基本用法
 * const result = await renderMarkdownFromUrl("https://example.com/doc.md");
 *
 * // 禁用 Front Matter 表格
 * const result = await renderMarkdownFromUrl("https://example.com/doc.md", {
 *   includeFrontMatter: false
 * });
 * ```
 */
export const renderMarkdownFromUrl = async (
    url: string,
    options: MarkdownRenderOptions = {}
): Promise<MarkdownRenderResult> => {
    const response = await fetch(url);

    if (!response.ok)
        throw new Error(`Failed to load markdown: ${response.status} ${response.statusText}`);

    const markdownText = await response.text();

    return renderMarkdown(markdownText, options);
};
