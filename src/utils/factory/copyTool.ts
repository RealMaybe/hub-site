let copyFunction: (text: string) => void;

/**
 * 复制工具，用于复制文本到剪贴板
 * @param text 需要复制的内容
 * @returns { void }
 */
export function copyTool(text: string): void {
    if (!copyFunction) {
        // 第一次调用时确定使用哪种方法
        if (navigator.clipboard)
            copyFunction = (text: string) => {
                navigator.clipboard.writeText(text).catch(err => {
                    console.error("Failed to copy text: ", err);
                });
            };
        // 如果 navigator.clipboard 不可用，则使用 textarea 方法
        else
            copyFunction = (text: string) => {
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.select();

                try {
                    const successful = document.execCommand("copy");
                    if (!successful) console.error("Copy command was unsuccessful");
                } catch (err) {
                    console.error("Fallback copy failed: ", err);
                } finally {
                    document.body.removeChild(textarea);
                }
            };
    }

    // 调用已确定的函数
    copyFunction(text);
}
