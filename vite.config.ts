import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import Markdown from "unplugin-vue-markdown/vite";
import hljs from "highlight.js"; // 引入 highlight.js

/* ========== */

/** 获取当前文件所在目录的绝对路径*/
const __dirname = fileURLToPath(new URL(".", import.meta.url));

/* ========== */

/** Vite 配置 */
export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/i, /\/src\/assets\/docs\/.*\.md$/i],
        }),
        vueDevTools(),
        Markdown({
            include: "src/assets/docs/**/*.md", // 开发时解析的 Markdown 文件
            exclude: "public/**", // 运行时动态区
            markdownItOptions: {
                html: true,
                linkify: true,
                typographer: true,
                highlight: function (str, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return hljs.highlight(str, { language: lang }).value;
                        } catch (err) {
                            console.error(err);
                        }
                    }
                    return ""; // 使用默认的转义
                },
            },
        }),
    ],
    server: {
        port: 4290, // 设置服务器端口号
        open: true, // 启动时自动打开浏览器
        host: "0.0.0.0", // 允许外部访问
    },
    resolve: {
        // 路径别名
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)), // src 文件夹
            "@tsTypes": fileURLToPath(new URL("./tsTypes/index.ts", import.meta.url)), // ts 类型文件
            "@style": fileURLToPath(new URL("./src/assets/style", import.meta.url)), // 样式文件
            "@data": fileURLToPath(new URL("./src/assets/data", import.meta.url)), // 数据文件
            "@docs": fileURLToPath(new URL("./src/assets/docs", import.meta.url)), // 文档文件
            "@img": fileURLToPath(new URL("./public/images", import.meta.url)), // 图片文件
            "@images": fileURLToPath(new URL("./public/images", import.meta.url)), // 图片文件
        },
    },
    build: {
        assetsDir: "assets", // 将所有静态资源放在 assets 文件夹中
        rollupOptions: {
            // 配置入口文件
            input: {
                main: resolve(__dirname, "index.html"),
                "404": resolve(__dirname, "404.html"),
            },
            // 配置输出文件
            output: {
                entryFileNames: "script/main-[hash].js", // 入口文件放在 script 文件夹中
                chunkFileNames: "script/[name]-[hash].js", // JS 文件放在 script 文件夹中
                assetFileNames: ({ names: [fileName] }) => {
                    // 样式文件放在 style 文件夹中
                    if (/\.(css|scss|sass|less)$/.test(fileName || ""))
                        return "style/[name]-[hash][extname]";

                    // 图片资源放在 images 文件夹中
                    if (/\.(png|jpe?g|gif|svg|ico|webp)$/.test(fileName || ""))
                        return "images/[name]-[hash][extname]";

                    // 字体文件放在 fonts 文件夹中
                    if (/\.(woff2?|eot|ttf|otf)$/.test(fileName || ""))
                        return "fonts/[name]-[hash][extname]";

                    // 媒体文件放在 media 文件夹中
                    if (/\.(mp3|mp4|webm)$/.test(fileName || ""))
                        return "media/[name]-[hash][extname]";

                    // 文档文件放在 documents 文件夹中
                    if (/\.(pdf|md|txt)$/.test(fileName || ""))
                        return "documents/[name]-[hash][extname]";

                    // json 文件放在 data 文件夹中
                    if (/\.(json)$/.test(fileName || "")) return "data/[name]-[hash][extname]";

                    // 其他静态资源放在 assets 文件夹中
                    return "assets/[name]-[hash][extname]";
                },
                manualChunks: id => {
                    // 将所有第三方依赖打包到一个名为 vendor 的文件中
                    if (id.includes("node_modules")) return "vendor";
                },
            },
        },
    },
});
