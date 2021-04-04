import { Context, Next } from "koa";

import { BaseError } from "../error/BaseError";
import { StatusCode } from "../vo/StatusCode";

export const resolveError = async (context: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof BaseError) {
      context.status = error.errorCode;
      console.debug(`[debug] ${error.message}`);
    } else {
      context.status = StatusCode.INTERNAL_SERVER_ERROR;
      console.error(`[error] ${error.stack}`);
    }
  }
};
