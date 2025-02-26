export default defineUnlistedScript(() => {
  window.domHelpers = {
    waitForElement: (
      selector: string,
      timeout: number
    ): Promise<HTMLElement> => {
      return new Promise((resolve, reject) => {
        const element = document.querySelector<HTMLElement>(selector);
        if (element) {
          resolve(element);
          return;
        }

        const observer = new MutationObserver(() => {
          const element = document.querySelector<HTMLElement>(selector);
          if (element) {
            observer.disconnect();
            resolve(element);
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

        setTimeout(() => {
          observer.disconnect();
          reject(new Error(`Element timeout: ${selector}`));
        }, timeout);
      });
    },
  };
});
