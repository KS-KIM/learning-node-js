import { BaseError } from "../../common/error/BaseError";
import { StatusCode } from "../../common/vo/StatusCode";

export default class AlreadyExistEmailError extends BaseError {
  constructor(message: string) {
    super(message, StatusCode.CONFLICT);
  }

  static fromEmail(email: string): AlreadyExistEmailError {
    return new AlreadyExistEmailError(
      `User's email is duplicated. { email: ${email} }`
    );
  }
}
