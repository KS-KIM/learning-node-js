import { BaseError } from "../../common/error/BaseError";
import { StatusCode } from "../../common/vo/StatusCode";

export default class UserNotFoundError extends BaseError {
  constructor(message: string) {
    super(message, StatusCode.NOT_FOUND);
  }

  static fromEmail(email: string): UserNotFoundError {
    return new UserNotFoundError(`User is not exists. { email: ${email} }`);
  }

  static fromId(id: number): UserNotFoundError {
    return new UserNotFoundError(`User is not exists. { id: ${id} }`);
  }
}
