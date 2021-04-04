export class HttpHeaders {
  headers: Map<string, string>;

  constructor(headers?: Map<string, string>) {
    if (headers) {
      this.headers = new Map(headers.entries());
    } else {
      this.headers = new Map<string, string>();
    }
  }

  getHeader(key: string) {
    return this.headers.get(key);
  }

  setHeader(key: string, value: string) {
    this.headers.set(key, value);
  }

  entries(): IterableIterator<[string, string]> {
    return this.headers.entries();
  }
}
