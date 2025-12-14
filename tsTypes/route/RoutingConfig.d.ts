/* 包含路由配置、额外选项等高级类型定义 */

import type { RouteRecordRaw, RouteMeta } from "@tsTypes";

/**
 * 在 `createRoute` 函数中已明确处理的属性键名。
 *
 * 这些属性已在工厂函数内部处理，不应通过 `Other` 类型重复定义：
 * - `path`: 路由路径，由函数参数提供
 * - `component`: 路由组件，由函数参数提供
 * - `children`: 子路由数组，由函数参数提供
 * - `meta`: 路由元数据，由函数内部构建
 *
 * @see createRoute
 */
type ExcludedKeys = "path" | "component" | "children" | "meta";

/**
 * 路由额外配置类型。
 *
 * 用于为路由记录提供额外的配置选项，同时避免与工厂函数已处理的属性冲突。
 * 此类型确保类型安全，防止重复定义已在 `createRoute` 中明确设置的属性。
 *
 * @template T 允许的路由属性键名，默认排除已处理的属性
 *
 * @property attr 路由记录额外属性（排除已处理的属性）
 * @property meta 路由元数据额外属性（排除已处理的元数据属性）
 *
 * @example
 * ```ts
 * // 基本用法
 * const other: Other = {
 *     attr: { name: "shop", alias: "/store" },
 *     meta: { requiresAuth: true }
 * };
 *
 * // 指定允许的属性
 * const other: Other<"name" | "alias"> = {
 *     attr: { name: "shop", alias: "/store" }
 * };
 * ```
 *
 * @see createRoute
 * @see ExcludedKeys
 */
export type Other<
    T extends Exclude<keyof RouteRecordRaw, ExcludedKeys> = Exclude<
        keyof RouteRecordRaw,
        ExcludedKeys
    >,
> = {
    /**
     * 路由记录额外属性配置。
     *
     * 允许配置除已排除属性外的任何路由属性：
     * - `name`: 路由名称
     * - `alias`: 路由别名
     * - `redirect`: 重定向配置
     * - `beforeEnter`: 路由前置守卫
     * - `props`: 路由参数传递配置
     * - 其他未在 `ExcludedKeys` 中列出的路由属性
     *
     * @example
     * ```ts
     * attr: {
     *     name: "user-profile",
     *     alias: ["/profile", "/user"],
     *     beforeEnter: (to, from) => {} // 守卫逻辑
     * }
     * ```
     */
    attr?: {
        [K in T]?: RouteRecordRaw[K];
    };

    /**
     * 路由元数据额外属性配置。
     *
     * 允许配置除以下已处理属性外的任何元数据属性：
     * - `title`: 页面标题（由 `navTitle` 和 `title` 参数设置）
     * - `disableZoom`: 禁用缩放（固定为 `true`）
     * - `nav`: 导航配置（由工厂函数自动设置）
     *
     * 用于添加自定义元数据，如权限控制、页面分类等。
     *
     * @example
     * ```ts
     * meta: {
     *     requiresAuth: true,
     *     permissions: ["read", "write"],
     *     category: "documentation"
     * }
     * ```
     */
    meta?: Omit<RouteMeta, "title" | "disableZoom" | "nav">;
};
