# 我的代码

## BlogPage.vue

```html
<template>
    <DocsRender :mdUrl="url" />
</template>

<script setup lang="ts">
import DocsRender from "@/features/docs/DocsRender.vue";

const url = "/docs/CHANGELOG.md";
</script>

<style scoped lang="less"></style>
```
