import { PlatformStrategy } from "@/utils/platform_strategy";
import RednodeStrategy from "@/utils/rednode";
import XStrategy from "@/utils/x";

export default defineBackground(() => {
  const PLATFORM_STRATEGIES = new Map<string, PlatformStrategy>([
    ["rednote", new RednodeStrategy()],
    ["x", new XStrategy()],
  ]);
  console.log("Hello background!", { id: browser.runtime.id });
  browser.runtime.onMessageExternal.addListener(
    async (message, sender, sendResponse) => {
      const platform = message.platform;
      const timeout = message.timeout || 60000;
      const platformStrategy = PLATFORM_STRATEGIES.get(platform);
      if (!platformStrategy) {
        sendResponse({
          success: false,
          message: "Platform not found",
        });
        return true;
      }
      const tab = await browser.tabs.create({
        url: platformStrategy.getDetectionPageUrl(),
        active: false,
      });
      if (!tab.id) {
        sendResponse({
          success: false,
          message: "Tab not found",
        });
        return true;
      }
      const tabId = tab.id;
      const handleTabUpdate = async (
        updatedTabId: number,
        changeInfo: chrome.tabs.TabChangeInfo,
        updatedTab: chrome.tabs.Tab
      ) => {
        if (updatedTabId === tabId && changeInfo.status === "complete") {
          // remove listener to ensure only invoke once
          browser.tabs.onUpdated.removeListener(handleTabUpdate);
          try {
            console.log("waiting for login", timeout);
            const [{ result }] = await browser.scripting.executeScript({
              target: { tabId },
              world: "MAIN",
              func: platformStrategy.waitForLogin,
              args: [timeout],
            });
            console.log("login result", result);
            if (result) {
              const cookies = await browser.cookies.getAll({
                domain: platformStrategy.getDomainName(),
              });
              sendResponse({
                success: true,
                cookies: cookies,
              });
              return true;
            } else {
              sendResponse({
                success: false,
              });
              return true;
            }
          } catch (error) {
            console.error("执行脚本错误:", error);
            sendResponse({
              success: false,
            });
            return true;
          } finally {
            await browser.tabs.remove(tabId);
          }
        }
      };
      browser.tabs.onUpdated.addListener(handleTabUpdate);
    }
  );
});
