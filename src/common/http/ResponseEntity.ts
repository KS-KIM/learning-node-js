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

  header(key: string, value: string): ResponseEntity<T> {
    this._responseHeaders.setHeader(key, value);
    return this;
  }

  headers(headers: HttpHeaders): ResponseEntity<T> {
    for (const [key, value] of headers.entries()) {
      this._responseHeaders.setHeader(key, value);
    }
    return this;
  }

  body(body: T): ResponseEntity<T> {
    this._responseBody = body;
    return this;
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
