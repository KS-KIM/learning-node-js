import { User } from "../domain/User";
import { Role } from "../vo/Role";

export default class UserCreateRequest {
  name: string;

  nickname: string;

  email: string;

  password: string;

  constructor(name: string, nickname: string, email: string, password: string) {
    this.name = name;
    this.nickname = nickname;
    this.email = email;
    this.password = password;
  }

  toUserEntity(): Partial<User> {
    return User.create({
      name: this.name,
      nickname: this.nickname,
      email: this.email,
      password: this.password,
      role: Role.USER,
    });
  }
}
