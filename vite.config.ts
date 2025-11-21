import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
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
