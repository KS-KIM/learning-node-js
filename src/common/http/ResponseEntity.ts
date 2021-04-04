import { StatusCode } from "../vo/StatusCode";
import { HttpHeaders } from "./HttpHeaders";

export class ResponseEntity<T> {
  private readonly _statusCode: StatusCode;
  private readonly _responseHeaders: HttpHeaders;
  private _responseBody?: T;

  constructor(statusCode: StatusCode, headers?: HttpHeaders, body?: T) {
    this._statusCode = statusCode;
    this._responseHeaders = headers ? headers : new HttpHeaders();
    this._responseBody = body;
  }

  static ok<T>(body?: T): ResponseEntity<T> {
    return new ResponseEntity(StatusCode.OK, undefined, body);
  }

  static created<T>(location: string, body?: T): ResponseEntity<T> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.setHeader("Location", location);
    return new ResponseEntity(StatusCode.CREATED, headers, body);
  }

  static noContent(): ResponseEntity<void> {
    return new ResponseEntity(StatusCode.NO_CONTENT);
  }

  header(key: string, value: string) {
    this._responseHeaders.setHeader(key, value);
  }

  headers(headers: HttpHeaders): void {
    for (const [key, value] of headers.entries()) {
      this._responseHeaders.setHeader(key, value);
    }
  }

  body(body: T): void {
    this._responseBody = body;
  }

  get statusCode(): StatusCode {
    return this._statusCode;
  }

  get responseHeaders(): HttpHeaders {
    return this._responseHeaders;
  }

  get responseBody(): T {
    return this._responseBody;
  }
}
