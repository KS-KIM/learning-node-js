import { BaseError } from "../../common/error/BaseError";
import { StatusCode } from "../../common/vo/StatusCode";

export class AuthorizationError extends BaseError {
  constructor(message: string) {
    super(message, StatusCode.FORBIDDEN);
  }
}
