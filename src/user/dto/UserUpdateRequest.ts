import { User } from "../domain/User";

export default class UserUpdateRequest {
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
    });
  }
}
