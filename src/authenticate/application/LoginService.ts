import bcrypt from "bcrypt";

import { User } from "../../user/domain/User";
import UserNotFoundError from "../../user/error/UserNotFoundError";
import { UserRepository } from "../../user/infrastructure/UserRepository";
import { LoginRequest } from "../dto/LoginRequest";
import { LoginResponse } from "../dto/LoginResponse";
import { AuthenticationError } from "../error/AuthenticationError";
import { TokenService } from "./TokenService";

export class LoginService {
  tokenService: TokenService;
  userRepository: UserRepository;

  constructor(
    authenticationService: TokenService,
    userRepository: UserRepository
  ) {
    this.tokenService = authenticationService;
    this.userRepository = userRepository;
  }

  // @TODO encrypt password
  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const user: User = await this.userRepository.findOne({
      email: loginRequest.email,
    });

    if (!user) {
      throw UserNotFoundError.fromEmail(loginRequest.email);
    }

    const passwordMatch: boolean = await bcrypt.compare(
      loginRequest.password,
      user.password
    );
    if (!passwordMatch) {
      throw new AuthenticationError();
    }

    const accessToken: string = this.tokenService.createAccessToken(user);

    return new LoginResponse(accessToken);
  }

  async logout(loginUser: User): Promise<void> {
    if (!loginUser) {
      throw new AuthenticationError();
    }
  }
}
