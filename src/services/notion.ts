class NotionRequestQueue {
  private queue: Array<() => Promise<any>>;
  private rateLimit: number;
  private lastRequestTime: number;
  private processing: boolean;

  constructor(rateLimitePerSecond: number) {
    this.queue = [];
    this.rateLimit = 1000 / rateLimitePerSecond;
    this.lastRequestTime = 0;
    this.processing = false;
  }

  public add<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(() => request().then(resolve).catch(reject));
      this.processQueue();
    });
  }

  private processQueue(): void {
    if (this.queue.length === 0 || this.processing) return;

    this.processing = true;
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    const delay = Math.max(0, this.rateLimit - timeSinceLastRequest);

    setTimeout(() => {
      const request = this.queue.shift();
      if (request) {
        request().finally(() => {
          this.lastRequestTime = Date.now();
          this.processing = false;
          this.processQueue();
        });
      }
    }, delay);
  }
}

export const notionRequestQueue = new NotionRequestQueue(2);
