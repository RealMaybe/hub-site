/**
 * 内容缓存结构
 * 用于将文档的 slug 映射到其 Markdown 原文内容
 * 避免重复请求同一文档，提升性能
 */
export interface ContentCache {
    [slug: string]: string; // 键：slug，值：Markdown 文本
}
