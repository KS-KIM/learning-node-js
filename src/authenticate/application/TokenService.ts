import { LoginUser } from "../vo/LoginUser";

export interface TokenService {
  createAccessToken(loginUser: LoginUser): string;
  createRefreshToken(loginUser: LoginUser): string;
  validateToken(token: string): LoginUser;
}
