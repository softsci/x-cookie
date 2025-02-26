interface DOMHelpers {
  waitForElement(selector: string, timeout: number): Promise<HTMLElement>;
}

declare global {
  interface Window {
    domHelpers: DOMHelpers;
  }
}

export {};
