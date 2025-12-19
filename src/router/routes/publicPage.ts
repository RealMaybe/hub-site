/* 普通页面路由配置 */

import type { RouteRecordRaw } from "@tsTypes";
import { views } from "./routesMaps";
// import { components } from "./routesMaps";
import { createRoute } from "../factory";

/* ========== */

/**
 * 普通页面路由
 */
export const publicPages: Array<RouteRecordRaw> = [
    createRoute("/index", views.index, "首页"),
    createRoute("/docs", views.docs, "关于"),
    createRoute("/blog", views.blog, "博客"),
    createRoute("/change-log", views.changeLog, "更新日志"),
];
