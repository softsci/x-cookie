class RednodeStrategy implements PlatformStrategy {
  getDomainName = (): string => {
    return "xiaohongshu.com";
  };

  getDetectionPageUrl = (): string => {
    return "https://creator.xiaohongshu.com/publish/publish";
  };

  waitForLogin = async (timeout: number): Promise<boolean> => {
    try {
      await window.domHelpers.waitForElement(".name-box", timeout);
      return true;
    } catch (error) {
      return false;
    }
  };
}
export default RednodeStrategy;
