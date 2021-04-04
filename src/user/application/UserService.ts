import { TokenService } from "../../authenticate/application/TokenService";
import { User } from "../domain/User";
import UserCreateRequest from "../dto/UserCreateRequest";
import UserCreateResponse from "../dto/UserCreateResponse";
import UserReadResponse from "../dto/UserReadResponse";
import UserUpdateRequest from "../dto/UserUpdateRequest";
import AlreadyExistEmailError from "../error/AlreadyExistEmailError";
import UserNotFoundError from "../error/UserNotFoundError";
import { UserRepository } from "../infrastructure/UserRepository";
import { Role } from "../vo/Role";

export class UserService {
  private userRepository: UserRepository;
  private authenticationService: TokenService;

  constructor(
    userRepository: UserRepository,
    authenticationService: TokenService
  ) {
    this.userRepository = userRepository;
    this.authenticationService = authenticationService;
  }

  // @TODO encrypt password
  async createUser(
    userCreateRequest: UserCreateRequest
  ): Promise<UserCreateResponse> {
    const existUser = await this.userRepository.findOne({
      email: userCreateRequest.email,
    });
    if (existUser) {
      throw AlreadyExistEmailError.fromEmail(userCreateRequest.email);
    }

    // const newUser: Partial<User> = userCreateRequest.toUserEntity();
    const savedUser: User = await this.userRepository.save({
      ...userCreateRequest,
      role: Role.USER,
    });

    const accessToken: string = this.authenticationService.createAccessToken(
      savedUser
    );
    return new UserCreateResponse({ ...savedUser, accessToken });
  }

  async readUserById(id: number, loginUser: User): Promise<UserReadResponse> {
    const user: User = await this.readUserByIdOrElseThrow(id);
    user.validateOwnerByEmail(loginUser.email);

    return new UserReadResponse({ ...user });
  }

  // @TODO encrypt password
  async updateUserById(
    id: number,
    loginUser: User,
    userUpdateRequest: UserUpdateRequest
  ): Promise<UserReadResponse> {
    const user: User = await this.readUserByIdOrElseThrow(id);
    user.validateOwnerByEmail(loginUser.email);

    await this.userRepository.update(user, userUpdateRequest.toUserEntity());
    const updatedUser: User = await this.readUserByIdOrElseThrow(id);

    return new UserReadResponse({ ...updatedUser });
  }

  async deleteUserById(id: number, loginUser: User): Promise<void> {
    const user: User = await this.readUserByIdOrElseThrow(id);
    user.validateOwnerByEmail(loginUser.email);

    await this.userRepository.delete(user);
  }

  private async readUserByIdOrElseThrow(id: number): Promise<User> {
    const user: User = await this.userRepository.findOne({ id });
    if (!user) {
      throw UserNotFoundError.fromId(id);
    }

    return user;
  }
}
