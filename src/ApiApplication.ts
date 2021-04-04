import Router from "@koa/router";
import Koa, { Context, Next } from "koa";
import koaBody from "koa-body";
import { getCustomRepository } from "typeorm";

import { AuthenticationService } from "./authenticate/application/AuthenticationService";
import { JwtTokenService } from "./authenticate/application/JwtTokenService";
import { TokenService } from "./authenticate/application/TokenService";
import { AuthenticationRouterFactory } from "./authenticate/router/AuthenticationRouterFactory";
import { resolveError } from "./common/middleware/GlobalErrorHandler";
import { resolveResponse } from "./common/middleware/ResponseResolver";
import { UserRepository } from "./user/infrastructure/UserRepository";
import UserRouterFactory from "./user/router/UserRouterFactory";

const ApiApplication = async (): Promise<Koa> => {
  const koa: Koa = new Koa();

  // request body parser setting
  koa.use(koaBody({ multipart: true }));

  // authentication middleware setting
  const tokenService: TokenService = new JwtTokenService();
  const userRepository: UserRepository = getCustomRepository(UserRepository);
  const authenticationService: AuthenticationService = new AuthenticationService(
    tokenService,
    userRepository
  );
  koa.use(async (context: Context, next: Next) => {
    await authenticationService.authenticate(context);
    await next();
  });

  // global error handling setting
  koa.use(async (context: Context, next: Next) => resolveError(context, next));

  // response handler setting
  koa.use(async (context: Context, next: Next) =>
    resolveResponse(context, next)
  );

  // router setting
  const router = new Router();
  router.get("/health", async (context) => {
    context.status = 200;
  });
  router.use("/v1", AuthenticationRouterFactory.createRouter().routes());
  router.use("/v1", UserRouterFactory.createRouter().routes());

  koa.use(router.routes()).use(router.allowedMethods());

  return koa;
};

export default ApiApplication;
