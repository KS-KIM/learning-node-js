import { StatusCode } from "../vo/StatusCode";

export class BaseError extends Error {
  errorCode: StatusCode;

  constructor(message: string, errorCode: StatusCode) {
    super(message);
    this.errorCode = errorCode;
  }
}
