import { copyTool } from "@/utils";

/* ========== */

/**
 * 为指定容器内的代码块添加语言标签和复制按钮
 * @param container - 要增强的 DOM 容器（例如 article.markdown-body）
 */
export const enhanceCodeBlocks = (container: HTMLElement): void => {
    const preElements = container.querySelectorAll("pre");
    console.log(preElements);

    preElements.forEach(pre => {
        if (pre.querySelector(".code-header")) return; // 防重复

        const codeEl = pre.querySelector("code");
        let language = "text";

        if (codeEl) {
            const langClass = Array.from(codeEl.classList).find(cls => cls.startsWith("language-"));
            if (langClass) language = langClass.replace("language-", "");
        }

        const header = document.createElement("div");
        header.className = "code-header";
        header.innerHTML = /* html */ `
            <span class="code-language">${language}</span>
            <button class="copy-button" title="复制代码">📋</button>
        `;
        pre.insertBefore(header, pre.firstChild);

        const copyBtn = header.querySelector(".copy-button")!;
        copyBtn.addEventListener("click", () => {
            const codeText = codeEl?.innerText || "";
            copyTool(codeText);

            const originalIcon = copyBtn.textContent;
            copyBtn.textContent = "✓";
            setTimeout(() => (copyBtn.textContent = originalIcon), 1500);
        });
    });
};
