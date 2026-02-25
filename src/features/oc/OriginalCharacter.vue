<!-- OC 角色 -->

<template>
    <div class="oc-module">
        <h2>
            <i class="fas fa-paint-brush"></i>
            <span>OC 角色</span>
        </h2>

        <!-- 作品集 -->
        <article>
            <div class="oc-group" v-for="(group, groupKey) in characters" :key="groupKey">
                <h3 class="group-title">
                    <span>世界观：</span>
                    <ins>{{ group.title }}</ins>
                </h3>

                <!-- 角色卡片 -->
                <div class="oc-grid">
                    <div class="oc-card" v-for="c in group.character" :key="c.name">
                        <h3>{{ c.name }}</h3>
                        <p v-for="d in c.description" :key="d">{{ d }}</p>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script setup lang="ts">
import type { Characters } from "@tsTypes";
import charactersData from "@data/characters.json"

const characters = charactersData as Characters;
</script>

<style scoped lang="less">
@import url("@style/public-page.less");

.oc-module {
    flex: 1 1 100% !important;

    .oc-group {
        padding-bottom: 1.5rem;
        margin-bottom: 1.25rem;
        border-bottom: .0625rem solid @secondary-color;

        &:last-child {
            padding-bottom: 0;
            margin-bottom: 0;
            border: none;
        }

        // h3
        .group-title {
            // color: @secondary-color;
            font-size: 1.25rem;
            margin-bottom: 1.25rem;
        }
    }

    .oc-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 1.25rem;

        @media (max-width: @mobile-breakpoint) {
            flex-direction: column;

            .oc-card {
                flex: 0 0 100%;
                max-width: 100%;
            }
        }

        @media (min-width: (@mobile-breakpoint + 1px)) and (max-width: @tablet-breakpoint) {
            .oc-card {
                flex: 0 0 calc(50% - 0.625rem);
                max-width: calc(50% - 0.625rem);
            }
        }

        @media (min-width: @desktop-breakpoint) {
            .oc-card {
                flex: 0 0 calc(25% - 0.9375rem);
                max-width: calc(25% - 0.9375rem);
            }
        }
    }

    .oc-card {
        background: lighten(@card-bg, 5%);
        border-radius: 0.625rem;
        padding: 0.9375rem;
        transition: transform 0.3s, box-shadow 0.3s;

        &:hover {
            .hover(-0.3125rem);
        }

        h3 {
            color: @secondary-color;
            margin-bottom: 0.625rem;
        }

        p {
            color: @text-muted;
            font-size: 0.9rem;
        }
    }

    .tips {
        margin-top: 1rem;
        padding-top: 1rem;
        opacity: 0.5;

        .title {
            color: @secondary-color;
            font-size: .875rem;
            margin-bottom: 0.125rem;
        }

        ul {
            font-size: .75rem;
            padding-left: 1.125rem;

            li {
                margin-bottom: 0.125rem;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

    }
}
</style>