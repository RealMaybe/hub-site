/* 普通页面路由配置 */

import type { RouteRecordRaw } from "@tsTypes";
import { views } from "./routesMaps";
import { components } from "./routesMaps";
import { createRoute, createHiddenRoute } from "../factory";

/* ========== */

/**
 * 普通页面路由
 */
export const publicPages: Array<RouteRecordRaw> = [
    createRoute("/index", views.index, "首页"),
    createRoute("/docs", views.docs, "文档", void 0, [
        createHiddenRoute("shop", void 0, "商品文档", void 0, [
            createHiddenRoute(
                "ProductReleaseNotes-VMK&VMKS.md",
                components.docs.shop.ProductReleaseNotes,
                "VMKS 发行说明文档"
            ),
        ]),
    ]),
    createRoute("/blog", views.blog, "博客"),
    createRoute("/shop", views.shop, "商店", void 0, [
        createHiddenRoute("notice", components.shop.notice, "购买须知"),
    ]),
    createRoute("/original-character", views.oc, "原创角色", "原创角色", [
        // createRoute("", views.oc, "原创角色"),
    ]),
    createRoute("/change-log", views.changeLog, "更新日志"),
];
