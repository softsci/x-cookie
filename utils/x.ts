class XStrategy implements PlatformStrategy {
  getDomainName = (): string => {
    return "x.com";
  };

  getDetectionPageUrl = (): string => {
    return "https://x.com/home";
  };

  waitForLogin = async (timeout: number): Promise<boolean> => {
    try {
      await window.domHelpers.waitForElement(
        "[data-testid=AppTabBar_Home_Link]",
        timeout
      );
      return true;
    } catch (error) {
      return false;
    }
  };
}
export default XStrategy;
