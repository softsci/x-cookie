import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/auto-icons", "@wxt-dev/module-react"],
  manifest: {
    permissions: ["tabs", "cookies", "scripting"],
    host_permissions: ["*://*.xiaohongshu.com/*", "*://*.x.com/*"],
    externally_connectable: {
      matches: ["<all_urls>"],
    },
    web_accessible_resources: [
      {
        resources: ["dom.js"],
        matches: ["*://*.xiaohongshu.com/*", "*://*.x.com/*"],
      },
    ],
  },
});
