import { ResponseEntity } from "../../common/http/ResponseEntity";
import { User } from "../../user/domain/User";
import { LoginService } from "../application/LoginService";
import { LoginRequest } from "../dto/LoginRequest";
import { LoginResponse } from "../dto/LoginResponse";

export class AuthenticationController {
  loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  async login(
    loginRequest: LoginRequest
  ): Promise<ResponseEntity<LoginResponse>> {
    const loginResponse: LoginResponse = await this.loginService.login(
      loginRequest
    );

    return ResponseEntity.ok(loginResponse);
  }

  async logout(loginUser: User): Promise<ResponseEntity<void>> {
    await this.loginService.logout(loginUser);

    return ResponseEntity.noContent();
  }
}
