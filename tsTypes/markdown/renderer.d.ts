/**
 * 从 front-matter 库重新导出的 Front Matter 解析结果类型
 *
 * @template T - Front Matter 属性的类型，默认为空对象
 *
 * @example
 * ```typescript
 * const result: FrontMatterResult<{ title: string }> = frontMatter(content);
 * console.log(result.attributes.title); // 类型安全的访问
 * ```
 */
export type { FrontMatterResult } from "front-matter";

/**
 * Front Matter 属性接口定义
 *
 * 用于描述 Markdown 文档头部 YAML 格式的元数据
 *
 * @example
 * ```yaml
 * ---
 * title: 示例文档
 * description: 这是一个示例文档
 * created: 2024-01-01
 * updated: 2024-01-02
 * revisions: 2
 * customField: 自定义值
 * ---
 * ```
 */
export interface FrontMatterAttributes {
    /**
     * 文档标题
     *
     * @example "Vue 3 入门指南"
     */
    title?: string;

    /**
     * 文档描述或摘要
     *
     * @example "本文档介绍 Vue 3 的基本概念和使用方法"
     */
    description?: string;

    /**
     * 文档介绍或前言
     *
     * @example "在开始学习 Vue 3 之前，建议先了解 HTML、CSS 和 JavaScript 基础知识"
     */
    introduction?: string;

    /**
     * 文档创建时间
     *
     * @format YYYY-MM-DD
     * @example "2024-01-01"
     */
    created?: string | Date;

    /**
     * 文档最后更新时间
     *
     * @format YYYY-MM-DD
     * @example "2024-01-15"
     */
    updated?: string | Date;

    /**
     * 文档修订次数
     *
     * @minimum 0
     * @example 3
     */
    revisions?: number;

    /**
     * 允许其他自定义属性
     *
     * 用于扩展 Front Matter 的元数据字段
     *
     * @example
     * ```yaml
     * author: "张三"
     * tags: ["Vue", "前端", "教程"]
     * difficulty: "初级"
     * ```
     */
    [key: string]: unknown;
}

/**
 * Markdown 渲染结果对象
 *
 * 包含渲染后的 HTML 内容和解析出的 Front Matter 数据
 */
export interface MarkdownRenderResult {
    /**
     * 渲染后的 HTML 内容
     *
     * 这是将 Markdown 文本转换为 HTML 后的结果，
     * 可以直接在 Vue 模板中使用 `v-html` 绑定
     *
     * @example
     * ```html
     * <article v-html="result.html"></article>
     * ```
     */
    html: string;

    /**
     * 解析出的 Front Matter 数据
     *
     * 如果原始 Markdown 文档包含 Front Matter，
     * 这里将包含解析后的属性对象
     *
     * @example
     * ```typescript
     * if (result.frontMatter?.title) {
     *   console.log(`文档标题: ${result.frontMatter.title}`);
     * }
     * ```
     */
    frontMatter?: FrontMatterAttributes;
}

/**
 * Markdown 渲染配置选项
 *
 * 用于自定义 Markdown 渲染过程的各种行为
 *
 * @example
 * ```typescript
 * // 基本配置
 * const options: MarkdownRenderOptions = {
 *   includeFrontMatter: true,
 *   enableHighlight: true
 * };
 *
 * // 最小化配置
 * const minimalOptions: MarkdownRenderOptions = {
 *   includeFrontMatter: false,
 *   enableHighlight: false,
 *   enableAnchor: false
 * };
 * ```
 */
export interface MarkdownRenderOptions {
    /**
     * 是否在渲染结果中包含 Front Matter 信息表格
     *
     * 当设置为 `true` 时，会在文档内容前添加一个表格显示 Front Matter 信息
     * 当设置为 `false` 时，Front Matter 仅作为元数据返回，不显示在内容中
     *
     * @default true
     *
     * @example
     * ```typescript
     * // 包含 Front Matter 表格
     * { includeFrontMatter: true }
     *
     * // 不包含 Front Matter 表格
     * { includeFrontMatter: false }
     * ```
     */
    includeFrontMatter?: boolean;

    /**
     * 自定义 Front Matter 表格的标题
     *
     * 仅当 `includeFrontMatter` 为 `true` 时生效
     *
     * @default "文档信息"
     *
     * @example
     * ```typescript
     * { frontMatterTitle: "元数据" }
     * { frontMatterTitle: "文档属性" }
     * ```
     */
    frontMatterTitle?: string;

    /**
     * 是否启用代码语法高亮
     *
     * 当设置为 `true` 时，会对代码块进行语法高亮处理
     * 当设置为 `false` 时，代码块将保持原始格式
     *
     * @default true
     *
     * @example
     * ```typescript
     * // 启用代码高亮
     * { enableHighlight: true }
     *
     * // 禁用代码高亮（性能更好）
     * { enableHighlight: false }
     * ```
     */
    enableHighlight?: boolean;

    /**
     * 是否启用标题锚点链接
     *
     * 当设置为 `true` 时，会为所有标题生成锚点链接
     * 当设置为 `false` 时，标题将不包含锚点
     *
     * @default true
     *
     * @example
     * ```typescript
     * // 启用锚点链接
     * { enableAnchor: true }
     *
     * // 禁用锚点链接
     * { enableAnchor: false }
     * ```
     */
    enableAnchor?: boolean;

    /**
     * 是否启用 HTML 标签解析
     *
     * 当设置为 `true` 时，Markdown 中的 HTML 标签会被正常解析
     * 当设置为 `false` 时，HTML 标签会被转义为文本
     *
     * @default true
     *
     * @example
     * ```typescript
     * // 允许 HTML 标签
     * { enableHTML: true }
     *
     * // 转义 HTML 标签（更安全）
     * { enableHTML: false }
     * ```
     */
    enableHTML?: boolean;
}
