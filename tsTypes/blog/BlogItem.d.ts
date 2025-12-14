/**
 * 博客/文档条目类型定义
 * 表示每一篇文档的元信息，包含唯一标识、标题、链接等字段
 * 大部分字段为可选，以适应不同类型的文档结构
 */
export interface BlogItem {
    slug: string; // 文档唯一标识，如 "blog/20250924-test"
    title: string; // 文档标题
    link: string; // 可直接访问的完整 URL（如 GitHub raw 链接）
    description?: string; // 描述信息
    type?: string; // 类型标识
    path?: string; // 在仓库中的相对路径
    generatedAt?: number; // 索引生成时间戳（毫秒）
    date?: string; // 文档日期
    tags?: string[]; // 标签数组
}
