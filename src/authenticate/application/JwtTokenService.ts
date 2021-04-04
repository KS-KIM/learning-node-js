import jsonWebToken from "jsonwebtoken";

import { LoginUser } from "../vo/LoginUser";
import { TokenService } from "./TokenService";

export class JwtTokenService implements TokenService {
  private static ACCESS_TOKEN_EXPIRE_PERIOD = "1d";
  private static REFRESH_TOKEN_EXPIRE_PERIOD = "7d";
  private static JWT_SECRET = "SECRET_KEY";

  createAccessToken(loginUser: LoginUser): string {
    return jsonWebToken.sign(loginUser, JwtTokenService.JWT_SECRET, {
      expiresIn: JwtTokenService.ACCESS_TOKEN_EXPIRE_PERIOD,
    });
  }

  createRefreshToken(loginUser: LoginUser): string {
    return jsonWebToken.sign(loginUser, JwtTokenService.JWT_SECRET, {
      expiresIn: JwtTokenService.REFRESH_TOKEN_EXPIRE_PERIOD,
    });
  }

  validateToken(token: string): LoginUser {
    return jsonWebToken.verify(token, JwtTokenService.JWT_SECRET) as LoginUser;
  }
}
