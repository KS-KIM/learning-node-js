import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { AuthorizationError } from "../../authenticate/error/AuthorizationError";
import { Role } from "../vo/Role";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Index()
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: Role })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  validateOwnerByEmail(email: string): void {
    if (this.email !== email) {
      throw new AuthorizationError(`Login user is mismatch.`);
    }
  }
}
