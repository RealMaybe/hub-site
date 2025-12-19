import type { FrontMatterAttributes } from "@tsTypes";
import { keyMap } from "./constant"; // 或调整为相对路径
import { formatFrontMatterDate } from "@/utils";

/* ========== */

/**
 * 安全地将任意值转换为字符串
 *
 * @param value - 需要转换的值
 * @returns 转换后的字符串
 *
 * @example
 * ```typescript
 * safeToString(null) // => ""
 * safeToString(42) // => "42"
 * safeToString([1, 2, 3]) // => "1, 2, 3"
 * safeToString({ key: "value" }) // => "{"key":"value"}"
 * ```
 */
export const safeToString = (value: unknown): string => {
    if (value === null || value === void 0) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return value.toString();
    if (Array.isArray(value)) return value.map(safeToString).join(", ");
    if (typeof value === "object") return JSON.stringify(value);

    return String(value);
};

/**
 * 将 Front Matter 属性格式化为 Markdown 表格
 *
 * @param attributes - Front Matter 属性对象
 * @param title - 表格标题，默认为 "文档信息"
 * @returns 格式化的 Markdown 表格字符串
 *
 * @example
 * ```typescript
 * const attributes = { title: "测试", created: "2024-01-01" };
 * formatFrontMatterAsMarkdown(attributes);
 * // 返回：
 * // ## 文档信息
 * //
 * // | 属性 | 值 |
 * // |---|---|
 * // | title | 测试 |
 * // | created | 2024-01-01 |
 * //
 * // ---
 * //
 * ```
 */
export const formatFrontMatterAsMarkdown = (attributes: FrontMatterAttributes): string => {
    const validEntries = Object.entries(attributes).filter(
        ([key, value]) => value !== undefined && value !== null && key.trim() !== ""
    );

    if (validEntries.length === 0) return "";

    let table = "| 属性 | 值 |\n|---|---|\n";
    validEntries.forEach(([key, value]) => {
        if (key === "created" || key === "updated") {
            value = formatFrontMatterDate(value as string);
        }
        table += `| ${keyMap[key] || key} | ${safeToString(value)} |\n`;
    });

    return `## 文档信息\n${table}\n---\n`;
};
