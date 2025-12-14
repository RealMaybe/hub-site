import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

// 设置中文语言环境
dayjs.locale("zh-cn");

/**
 * 格式化 Front Matter 日期
 * @param dateString - 原始日期字符串，格式为 YYYY-MM-DD
 * @returns 格式化后的中文日期字符串，格式为 YYYY年MM月DD日
 */
export function formatFrontMatterDate(dateString: string | Date): string {
    if (!dateString) return "";

    const date = dayjs(dateString);
    return date.isValid() ? date.format("YYYY 年 MM 月 DD 日") : String(dateString);
}
