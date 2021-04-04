import { EntityRepository, Repository } from "typeorm";

import { User } from "../domain/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
