/*
 * 路由系统基础类型定义。
 * 包含路由相关的核心基础类型。
 */

import type { RouteRecordRaw } from "@tsTypes";

/**
 * 路由组件类型。
 *
 * 表示 Vue 路由组件，可以是：
 * - 有效的 Vue 组件
 * - 异步组件加载函数
 * - `undefined`（用于无组件的结构路由）
 *
 * @example
 * ```ts
 * const component: Component = () => import('@/views/Home.vue');
 * const component: Component = undefined; // 无组件路由
 * ```
 */
export type Component = RouteRecordRaw["component"] | undefined;

/**
 * 子路由数组类型。
 * 
 * 表示嵌套路由配置，包含当前路由的子路由记录。
 * 当提供子路由时，父级路由可以作为布局容器使用。
 * 
 * @example
 * ```ts
 * const children: Children = [
 *     createRoute("", HomeView, "首页"),
 *     createRoute("about", AboutView, "关于")
 * ];
 * ```
 */
export type Children = RouteRecordRaw["children"];
