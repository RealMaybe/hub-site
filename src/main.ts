/* 引入核心库 */
import { createApp } from "vue";
import { createPinia } from "pinia";

/* 引入项目根组件和路由配置 */
import App from "./App.vue";
import router from "./router";

/* 引入全局样式 */
import "@style/public-global.less";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "highlight.js/styles/atom-one-dark.css";

/* ========== */

// 创建 Vue 应用实例
const app = createApp(App);

// 注册 Pinia 状态管理和 Vue Router
app.use(createPinia());
app.use(router);

// 挂载应用到 DOM 元素 #app
app.mount("#app");
