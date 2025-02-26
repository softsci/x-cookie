export default defineContentScript({
  matches: ["*://*.xiaohongshu.com/*", "*://*.x.com/*"],
  async main() {
    console.log("Injecting script...");
    await injectScript("/dom.js");
    console.log("Done!");
  },
});
