import type { RouteRecordRaw as VueRouteRecordRaw } from "vue-router";

/* ========== 类型定义 ========== */

/**
 * @description 路由元信息接口。
 */
export interface RouteMeta {
    /**
     * @description 页面标题，可用于浏览器标签或导航栏文字。
     */
    title?: string;

    /**
     * @description 是否禁止页面缩放（true 时禁止）。
     */
    disableZoom?: boolean;

    /**
     * @description 是否作为导航菜单项显示（true 时显示）。
     */
    nav?:
        | boolean
        | {
              show: boolean;
              title?: string;
          };
}

/**
 * @description 带有 meta 属性的路由记录接口。
 */
export type RouteRecordRaw = VueRouteRecordRaw & {
    meta?: RouteMeta;
};
