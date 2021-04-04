import { BaseError } from "../../common/error/BaseError";
import { StatusCode } from "../../common/vo/StatusCode";

export class AuthenticationError extends BaseError {
  constructor() {
    super("login failed", StatusCode.UNAUTHORIZED);
  }
}
