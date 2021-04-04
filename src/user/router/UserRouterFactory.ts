import Router from "@koa/router";
import { getCustomRepository } from "typeorm";

import { JwtTokenService } from "../../authenticate/application/JwtTokenService";
import { TokenService } from "../../authenticate/application/TokenService";
import { AuthenticationError } from "../../authenticate/error/AuthenticationError";
import { ResponseEntity } from "../../common/http/ResponseEntity";
import { UserService } from "../application/UserService";
import { User } from "../domain/User";
import UserCreateRequest from "../dto/UserCreateRequest";
import UserCreateResponse from "../dto/UserCreateResponse";
import UserReadResponse from "../dto/UserReadResponse";
import UserUpdateRequest from "../dto/UserUpdateRequest";
import { UserRepository } from "../infrastructure/UserRepository";
import UserController from "../interface/UserController";

export default class UserRouterFactory {
  static createRouter(): Router {
    const userRepository: UserRepository = getCustomRepository(UserRepository);
    const authenticationService: TokenService = new JwtTokenService();
    const userService: UserService = new UserService(
      userRepository,
      authenticationService
    );
    const userController: UserController = new UserController(userService);

    const router = new Router();

    router.post("/users", async (context) => {
      const userCreateRequest: UserCreateRequest = context.request.body;

      const userCreateResponse: ResponseEntity<UserCreateResponse> = await userController.createUser(
        userCreateRequest
      );

      context.state.response = userCreateResponse;
    });

    router.get("/users/:id", async (context) => {
      const id: number = parseInt(context.params.id, 10);
      const loginUser: User = context.state.user;
      if (!loginUser) {
        throw new AuthenticationError();
      }

      const userReadResponse: ResponseEntity<UserReadResponse> = await userController.readUser(
        id,
        loginUser
      );

      context.state.response = userReadResponse;
    });

    router.put("/users/:id", async (context) => {
      const id: number = parseInt(context.params.id, 10);
      const loginUser: User = context.state.user;
      if (!loginUser) {
        throw new AuthenticationError();
      }
      const userUpdateRequest: UserUpdateRequest = context.request.body;

      const userReadResponse: ResponseEntity<UserReadResponse> = await userController.updateUser(
        id,
        loginUser,
        userUpdateRequest
      );

      context.state.response = userReadResponse;
    });

    router.delete("/users/:id", async (context) => {
      const id: number = parseInt(context.params.id, 10);
      const loginUser: User = context.state.user;
      if (!loginUser) {
        throw new AuthenticationError();
      }

      const userDeleteResponse: ResponseEntity<void> = await userController.deleteUser(
        id,
        loginUser
      );

      context.state.response = userDeleteResponse;
    });

    return router;
  }
}
