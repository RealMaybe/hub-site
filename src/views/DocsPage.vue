<template>
    <!-- 渲染 markdown 文档 -->
    <article v-if="renderedHtml" class="markdown-body" v-html="renderedHtml"></article>
    <div v-else-if="isLoading">Loading...</div>
    <div v-else class="error-message">
        Failed to load content
    </div>
</template>

<script setup lang="ts">
import type { MarkdownRenderResult } from "@tsTypes";
import { ref, watch, onMounted } from "vue";
import { renderMarkdownFromUrl } from "@/utils";

const { mdUrl } = defineProps<{
    mdUrl: string;
}>();

const renderedHtml = ref<string>("");
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);

// 动态加载和渲染 markdown
const loadMarkdown = async (url: string): Promise<void> => {
    try {
        isLoading.value = true;
        error.value = null;
        renderedHtml.value = "";

        const result: MarkdownRenderResult = await renderMarkdownFromUrl(url, {
            includeFrontMatter: false,
        });

        renderedHtml.value = result.html;
    } catch (err) {
        console.error("Error loading markdown:", err);
        error.value = err instanceof Error ? err.message : "Unknown error occurred";
        renderedHtml.value = "<p>Error loading content</p>";
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    if (mdUrl) loadMarkdown(mdUrl);
});

// 监听 URL 变化
watch(
    () => mdUrl,
    (newUrl: string) => {
        if (newUrl) loadMarkdown(newUrl);
    }
);
</script>

<style scoped lang="less">
.error-message {
    color: #d73a49;
    background-color: #ffeef0;
    border: 1px solid #d73a49;
    border-radius: 6px;
    padding: 16px;
    text-align: center;
}
</style>
