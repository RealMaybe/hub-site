import type { RouteLocationNormalized } from "vue-router";
import { defineStore } from "pinia";

interface RouteHistoryState {
    previousValidRoute: RouteLocationNormalized | null;
    routeHistory: string[];
}

export const useRouteHistoryStore = defineStore("routeHistory", {
    state: (): RouteHistoryState => ({
        previousValidRoute: null,
        routeHistory: [],
    }),

    actions: {
        setPreviousValidRoute(route: RouteLocationNormalized) {
            // 排除 404 路由和其他无效路由
            if (route.matched.length > 0 && !route.path.includes("404")) {
                this.previousValidRoute = route;

                // 记录路由历史用于更复杂的场景
                const routePath = route.fullPath;
                if (!this.routeHistory.includes(routePath)) {
                    this.routeHistory.push(routePath);

                    // 保持历史记录不会无限增长
                    if (this.routeHistory.length > 5) this.routeHistory.shift();
                }
            }
        },

        clearHistory() {
            this.previousValidRoute = null;
            this.routeHistory = [];
        },
    },

    getters: {
        getLastValidRoute: state => state.previousValidRoute,
        hasValidHistory: state => state.previousValidRoute !== null,
    },
});
