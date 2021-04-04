import { Context } from "koa";

import { User } from "../../user/domain/User";
import { UserRepository } from "../../user/infrastructure/UserRepository";
import { LoginUser } from "../vo/LoginUser";
import { TokenService } from "./TokenService";

export class AuthenticationService {
  private authenticationService: TokenService;
  private userRepository: UserRepository;

  constructor(
    authenticationService: TokenService,
    userRepository: UserRepository
  ) {
    this.authenticationService = authenticationService;
    this.userRepository = userRepository;
  }

  async authenticate(context: Context): Promise<void> {
    const accessToken: string = context.headers.authorization;
    if (!accessToken) {
      return;
    }

    const loginUser: LoginUser = this.authenticationService.validateToken(
      accessToken
    );
    const user: User = await this.userRepository.findOne({ id: loginUser.id });

    context.state.user = user;
  }
}
