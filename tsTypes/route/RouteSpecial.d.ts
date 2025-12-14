interface Redirect {
    to: `/${string}`;
    from: Array<`/${string}`>;
}

/**
 * 不属于主要路由系统的特殊路由。
 * 全部为 `/${string}` 格式。
 * 全部为转发路由。
 */
export type Redirects = Array<Redirect>;