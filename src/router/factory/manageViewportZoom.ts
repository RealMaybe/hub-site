/* 管理视口缩放 */

import type { RouteMeta } from "vue-router";

/* ========== */

const ORIGINAL_CONTENT = "width=device-width,initial-scale=1";
const ZOOM_DISABLED_CONTENT = "width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no";

/**
 * 管理视口缩放
 * @param meta 路由元数据
 * @returns { void }
 */
export function manageViewportZoom(meta: RouteMeta): void {
    if (typeof document === "undefined") return;

    let viewport = document.querySelector<HTMLMetaElement>("meta[name='viewport']");

    if (!viewport) {
        viewport = document.createElement("meta");
        viewport.name = "viewport";
        document.head.appendChild(viewport);
    }

    viewport.content = meta.disableZoom ? ZOOM_DISABLED_CONTENT : ORIGINAL_CONTENT;
}
