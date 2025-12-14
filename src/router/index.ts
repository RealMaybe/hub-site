import { createRouter, createWebHistory } from "vue-router";
import { useRouteHistoryStore } from "@/stores";
import { routes } from "./routes";
import { manageViewportZoom, setDocumentTitle } from "./factory";

/* ========== */

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
    // 设置文档标题
    setDocumentTitle(to, "知识库 - RealMaybe 个人网站");

    // 管理视口缩放
    manageViewportZoom(to.meta);

    // 记录上一个有效路由（排除 404 和无效路由）
    const routeHistoryStore = useRouteHistoryStore();
    if (from.matched.length > 0 && from.name !== "NotFound")
        routeHistoryStore.setPreviousValidRoute(from);

    next();
});

export default router;
