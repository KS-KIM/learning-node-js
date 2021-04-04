import { Role } from "../vo/Role";

// @TODO Implement refresh token
export default class UserCreateResponse {
  id: number;
  name: string;
  nickname: string;
  email: string;
  role: Role;
  createdAt: Date;
  accessToken: string;

  constructor({
    id,
    name,
    nickname,
    email,
    role,
    createdAt,
    accessToken,
  }: {
    id: number;
    name: string;
    nickname: string;
    email: string;
    role: Role;
    createdAt: Date;
    accessToken: string;
  }) {
    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
    this.accessToken = accessToken;
  }
}
