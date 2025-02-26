export interface PlatformStrategy {
  getDomainName: () => string;
  getDetectionPageUrl: () => string;
  waitForLogin: (timeout: number) => Promise<boolean>;
}
