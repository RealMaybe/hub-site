/* 特殊页面路由配置 */

import type { Redirects, RouteRecordRaw } from "@tsTypes";
import { createRedirects } from "../factory";

/* ========== */

// 重定向配置
const REDIRECT_CONFIGS: Redirects = [
    // 文档
    { to: "/docs", from: ["/doc", "/document", "/documents", "/documentation"] },
    // 博客
    { to: "/blog", from: ["/bolg", "/blogs", "/blogging"] }, // 第一个纯属为了防止拼写错误
] as const;

/* ========== */

// 创建路由
export const specialRoutes: RouteRecordRaw[] = [
    { path: "/", redirect: "/index" },
    ...REDIRECT_CONFIGS.flatMap(config => createRedirects(config.to, config.from)),
];
