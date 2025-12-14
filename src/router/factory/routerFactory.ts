import type { RouteRecordRaw, RouteMeta, Component, Children, Other } from "@tsTypes";

/* ========== */

/**
 * 主站点路由工厂函数。
 *
 * 快速生成一条供主导航使用的 `RouteRecordRaw`，已内置常用 `meta`：
 * - `title` / `disableZoom` / `nav.show` / `nav.title`
 *
 * **使用指南：**
 * - 当需要子路由时，**父级记录可以挂载布局组件**，用于承载子路由的 `<RouterView>`
 * - 如果父级不需要布局组件，可将 `component` 设为 `void 0`
 * - 子路由请把 `path` 设为空串 `""` 作为默认页
 * - 如果创建的路由需要展示在导航栏中，请使用 `createRoute`，否则请使用 `createHiddenRoute`
 * - 如需展示在导航栏中，且包含子路由，默认页面请使用 `createRoute` 创建
 * - 无论是否展示在导航栏中，非默认页都请使用 `createHiddenRoute` 来辅助创建
 *
 * @param path      一级路径，必须以 `/` 开头，例如 `/shop`（如果是作为子路由的时候请勿带 `/` 前缀）
 * @param component 页面组件（无子级时必填；有子级时可作为布局组件使用，也可设为 `void 0`）
 * @param navTitle  导航栏展示名称，也会作为 `nav.title` 和默认 `document.title`
 * @param title     浏览器页签标题；缺省同 `navTitle`
 * @param children  子路由数组；提供后父级仍可保留 `component` 作为布局
 * @returns 可直接放入路由表的完整记录
 *
 * @example
 * ```ts
 * // 无子级
 * createRoute("/about", views.about, "关于", "个人简介")
 *
 * // 有子级 + 布局组件
 * createRoute("/shop", ShopLayout, "精品小店", void 0, [
 *     createRoute("", views.shop, "小店首页"),        // 默认页
 *     createRoute("policies", ShopPolicies, "店铺政策")
 * ])
 *
 * // 有子级 + 无布局（纯结构）
 * createRoute("/legacy", void 0, "旧版页面", void 0, [
 *     createRoute("", { redirect: "/new" }, "重定向")
 * ])
 * ```
 */
export function createRoute(
    path: string,
    component: Component,
    navTitle: string,
    title?: string,
    children?: Children,
    other?: Other
): RouteRecordRaw {
    const base: Omit<RouteRecordRaw, "component" | "children"> = {
        path,
        meta: {
            title: title ?? navTitle,
            disableZoom: true,
            nav: { show: true, title: navTitle },
            ...other?.meta,
        },
        ...other?.attr,
    };

    return children
        ? ({ ...base, component: component ?? void 0, children } as RouteRecordRaw)
        : ({ ...base, component } as RouteRecordRaw);
}

/**
 * 隐藏导航路由工厂函数。
 *
 * 在 `createRoute` 基础上生成**不会出现在主导航**的 `RouteRecordRaw`。
 * 唯一差异：把 `meta.nav` 强制设为 `false`，其余 `title / disableZoom` 等保持不变。
 *
 * 适用场景：
 * - 登录页、404、独立活动页等无需入口的页面；
 * - 需要保持路由结构，但不想让主导航抓取。
 *
 * 参数列表与 `createRoute` 完全一致，可无缝替换：
 *
 * **使用指南：**
 * - 当需要子路由时，**父级记录可以挂载布局组件**，用于承载子路由的 `<RouterView>`
 * - 如果父级不需要布局组件，可将 `component` 设为 `void 0`
 * - 子路由请把 `path` 设为空串 `""` 作为默认页
 * - 如果创建的路由需要展示在导航栏中，请使用 `createRoute`，否则请使用 `createHiddenRoute`
 * - 如需展示在导航栏中，且包含子路由，默认页面请使用 `createRoute` 创建
 * - 无论是否展示在导航栏中，非默认页都请使用 `createHiddenRoute` 来辅助创建
 *
 * @param path      一级路径，必须以 `/` 开头（如果是作为子路由的时候请勿带 `/` 前缀）
 * @param component 页面组件（无子级时必填；有子级时可作为布局组件使用，也可设为 `void 0`）
 * @param navTitle  导航名称，仍会写入 `nav.title`（仅作标识，不会展示）
 * @param title     浏览器页签标题；缺省同 `navTitle`
 * @param children  子路由数组；提供后父级仍可保留 `component` 作为布局
 * @returns 已关闭导航的完整路由记录，可直接放入路由表
 *
 * @example
 * ```ts
 * // 隐藏的单页
 * createHiddenRoute("/callback", OAuthCallback, "三方回调")
 *
 * // 隐藏的嵌套路由（带布局）
 * createHiddenRoute("/debug", DebugLayout, "调试面板", void 0, [
 *     createRoute("", DebugHome, "首页"),
 *     createRoute("log", DebugLog, "日志")
 * ])
 *
 * // 隐藏的嵌套路由（无布局）
 * createHiddenRoute("/admin", void 0, "管理后台", void 0, [
 *     createRoute("", AdminDashboard, "仪表板"),
 *     createRoute("users", UserManagement, "用户管理")
 * ])
 * ```
 */
export function createHiddenRoute(
    path: string,
    component: Component,
    navTitle: string,
    title?: string,
    children?: Children,
    other?: Other
): RouteRecordRaw {
    const r = createRoute(path, component, navTitle, title, children, other);

    // 保证 meta 存在
    if (!r.meta) r.meta = {};

    // 保证 nav 是对象（而不是 false）
    const m: RouteMeta = r.meta;

    // 关闭导航
    m.nav = false;

    return r;
}

/**
 * 批量重定向工厂函数。
 *
 * 针对同一个“目标路径”批量生成多条 `RouteRecordRaw`，覆盖两种场景：
 * 1. 精确匹配：`/foo` → 重定向到 `to`
 * 2. 通配子路径：`/foo/:path(.*)` → 重定向到 `to/$path`
 *
 * 常用于旧路径兼容、缩写路径、大小写归一等场景。
 *
 * @param to   目标路径，必须以 `/` 开头，例如 `/documents`
 * @param from 来源路径数组，每一项必须以 `/` 开头，例如 `["/doc", "/docs"]`
 *
 * @returns 扁平化的路由记录数组，可直接展开到路由表
 *
 * @example
 * ```ts
 * const specialRoutes: Array<RouteRecordRaw> = [
 *     ...createRedirects("/documents", ["/doc", "/docs", "/document"]),
 * ]
 * ```
 */
export function createRedirects(
    to: `/${string}`,
    from: Array<`/${string}`>
): Array<RouteRecordRaw> {
    const routes: Array<RouteRecordRaw> = [];

    from.forEach(prefix => {
        // 精确重定向
        routes.push({ path: prefix, redirect: to });
        // 子路径通配重定向
        routes.push({
            path: `${prefix}/:path(.*)`,
            redirect: route => `${to}/${route.params.path as string}`,
        });
    });

    return routes;
}
