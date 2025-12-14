/// <reference types="vite/client" />

// markdown
declare module "*.md" {
    import { DefineComponent } from "vue";
    const Component: DefineComponent<{}, {}, any>;
    export default Component;
}

// vue
declare module "*.vue" {
    import type { DefineComponent } from "vue";
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// json
declare module "*.json?url" {
    const value: string;
    export default value;
}
