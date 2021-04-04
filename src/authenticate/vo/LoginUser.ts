import { User } from "../../user/domain/User";
import { Role } from "../../user/vo/Role";

export class LoginUser {
  id: number;
  role: Role;

  constructor(id: number, role: Role) {
    this.id = id;
    this.role = role;
  }

  static fromUserEntity(user: User) {
    return new LoginUser(user.id, user.role);
  }
}
