import { defineConfig } from "wxt";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/auto-icons", "@wxt-dev/module-react"],
  vite: () => ({
    plugins: [
      obfuscatorPlugin({
        options: {
          compact: true,
          controlFlowFlattening: true,
          deadCodeInjection: true,
          debugProtection: true,
          disableConsoleOutput: true,
          identifierNamesGenerator: "hexadecimal",
          numbersToExpressions: true,
          selfDefending: true,
          simplify: true,
          splitStrings: true,
          stringArray: true,
          stringArrayEncoding: ["base64"],
          transformObjectKeys: true,
        },
      }),
    ],
  }),
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
