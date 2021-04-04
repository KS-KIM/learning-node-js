import { Context, Next } from "koa";

import { ResponseEntity } from "../http/ResponseEntity";

export const resolveResponse = async (
  context: Context,
  next: Next
): Promise<void> => {
  await next();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const responseEntity: ResponseEntity<object> = context.state.response;
  if (responseEntity) {
    context.response.status = responseEntity.statusCode;
    for (const [key, value] of responseEntity.responseHeaders.entries()) {
      context.response.header[key] = value;
    }
    context.response.body = responseEntity.responseBody;
  }
};
