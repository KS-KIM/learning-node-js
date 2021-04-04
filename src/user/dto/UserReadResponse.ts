import { Role } from "../vo/Role";

export default class UserReadResponse {
  id: number;
  name: string;
  nickname: string;
  email: string;
  role: Role;
  createdAt: Date;

  constructor({
    id,
    name,
    nickname,
    email,
    role,
    createdAt,
  }: {
    id: number;
    name: string;
    nickname: string;
    email: string;
    role: Role;
    createdAt: Date;
  }) {
    this.id = id;
    this.name = name;
    this.nickname = nickname;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
  }
}
