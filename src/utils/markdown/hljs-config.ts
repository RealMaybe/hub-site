// 显式注册语言，避免打包全部语法
import hljs from "highlight.js/lib/core";

import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/yaml";
import bash from "highlight.js/lib/languages/bash";
import xml from "highlight.js/lib/languages/xml";
import markdown from "highlight.js/lib/languages/markdown";
import css from "highlight.js/lib/languages/css";
import scss from "highlight.js/lib/languages/scss";
import less from "highlight.js/lib/languages/less";
import diff from "highlight.js/lib/languages/diff";

// 注册语言
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("yml", yaml);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("md", markdown);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("css", css);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("less", less);
hljs.registerLanguage("diff", diff);

export default hljs;
