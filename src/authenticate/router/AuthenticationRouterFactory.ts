import Router from "@koa/router";
import { getCustomRepository } from "typeorm";

import { ResponseEntity } from "../../common/http/ResponseEntity";
import { User } from "../../user/domain/User";
import { UserRepository } from "../../user/infrastructure/UserRepository";
import { JwtTokenService } from "../application/JwtTokenService";
import { LoginService } from "../application/LoginService";
import { TokenService } from "../application/TokenService";
import { LoginRequest } from "../dto/LoginRequest";
import { LoginResponse } from "../dto/LoginResponse";
import { AuthenticationError } from "../error/AuthenticationError";
import { AuthenticationController } from "../interface/AuthenticationController";

export class AuthenticationRouterFactory {
  static createRouter(): Router {
    const authenticationService: TokenService = new JwtTokenService();
    const userRepository: UserRepository = getCustomRepository(UserRepository);
    const loginService: LoginService = new LoginService(
      authenticationService,
      userRepository
    );
    const authenticationController: AuthenticationController = new AuthenticationController(
      loginService
    );

    const router: Router = new Router();

    router.post("/login", async (context) => {
      const loginRequest: LoginRequest = context.request.body;

      const loginResponse: ResponseEntity<LoginResponse> = await authenticationController.login(
        loginRequest
      );

      context.cookies.set(
        "Authorization",
        loginResponse.responseBody.accessToken
      );
      context.state.response = loginResponse;
    });

    router.post("/logout", async (context) => {
      const loginUser: User = context.state.user;
      if (!loginUser) {
        throw new AuthenticationError();
      }

      const logoutResponse: ResponseEntity<void> = await authenticationController.logout(
        loginUser
      );

      context.state.response = logoutResponse;
    });

    return router;
  }
}
