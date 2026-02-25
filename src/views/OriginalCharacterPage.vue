<template>
    <section class="oc-page">
        <OriginalCharacter />

        <div class="tips">
            <p class="title">注：</p>
            <ul>
                <li>本站所有角色均为原创，未经允许不得转载。</li>
                <li>相关具体设计正在注册版权，现阶段暂不公布完整设定。</li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
import OriginalCharacter from "@/features/oc/OriginalCharacter.vue";
</script>

<style scoped lang="less">
.oc-page {
    flex: 1 1 100% !important;

    .tips {
        margin-top: 24px;
    }
}
</style>
