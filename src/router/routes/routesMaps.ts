import IndexPage from "@/views/IndexPage.vue";

/* ========== */

/**
 * 定义视图映射
 *
 * 注意：视图映射和组件映射是不同的，视图映射用于在路由配置中使用
 * * 例如：在路由配置中引入了首页组件，所以需要将首页组件映射到 views 中
 * * 在路由配置中使用 views 中的映射，而不是直接引入组件
 */
export const views = {
    notFound: () => import("@/views/NotFoundPage.vue"), // 404
    index: IndexPage, // 首页
    docs: () => import("@/views/DocsPage.vue"), // 文档
    blog: () => import("@/views/BlogPage.vue"), // 博客
    changeLog: () => import("@/views/ChangeLogPage.vue"), // 更新日志
};

/**
 * 定义组件映射
 *
 * 注意：组件映射和视图映射是不同的，组件映射用于在视图组件中引入子组件
 * * 例如：在首页组件中引入了 ShopPolicies 组件，所以需要将 ShopPolicies 组件映射到 components 中
 * * 在视图组件中引入子组件时，需要使用 components 中的映射，而不是直接引入子组件
 */
export const components = {
    shop: {
        // shopPolicies: () => import("@/features/shop/ShopPolicies.vue"),
    },
};
