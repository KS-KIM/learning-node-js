import { ResponseEntity } from "../../common/http/ResponseEntity";
import { UserService } from "../application/UserService";
import { User } from "../domain/User";
import UserCreateRequest from "../dto/UserCreateRequest";
import UserCreateResponse from "../dto/UserCreateResponse";
import UserReadResponse from "../dto/UserReadResponse";
import UserUpdateRequest from "../dto/UserUpdateRequest";

export default class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(
    userCreateRequest: UserCreateRequest
  ): Promise<ResponseEntity<UserCreateResponse>> {
    const userCreateResponse: UserCreateResponse = await this.userService.createUser(
      userCreateRequest
    );

    return ResponseEntity.created(
      `/${userCreateResponse.id}`,
      userCreateResponse
    );
  }

  async readUser(
    id: number,
    loginUser: User
  ): Promise<ResponseEntity<UserReadResponse>> {
    const userReadResponse: UserReadResponse = await this.userService.readUserById(
      id,
      loginUser
    );

    return ResponseEntity.ok(userReadResponse);
  }

  async updateUser(
    id: number,
    loginUser: User,
    userUpdateRequest: UserUpdateRequest
  ): Promise<ResponseEntity<UserReadResponse>> {
    const userReadResponse: UserReadResponse = await this.userService.updateUserById(
      id,
      loginUser,
      userUpdateRequest
    );

    return ResponseEntity.ok(userReadResponse);
  }

  async deleteUser(id: number, loginUser: User): Promise<ResponseEntity<void>> {
    await this.userService.deleteUserById(id, loginUser);

    return ResponseEntity.noContent();
  }
}
