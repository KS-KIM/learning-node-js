import bcrypt from "bcrypt";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";

import { User } from "../domain/User";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  private static readonly SALT_ROUNDS = 10;

  // constructor(connection: Connection) {
  //   connection.subscribers.push(this);
  // }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>): Promise<void> {
    event.entity.password = await bcrypt.hash(
      event.entity.password,
      UserSubscriber.SALT_ROUNDS
    );
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
    if (event.entity.password !== event.databaseEntity.password) {
      event.entity.password = await bcrypt.hash(
        event.entity.password,
        UserSubscriber.SALT_ROUNDS
      );
    }
  }
}
