import { createConnection } from "typeorm";

export const TypeOrm = createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "authenticate",
  synchronize: false,
  migrationsRun: false,
  logging: true,
  entities: ["src/**/domain/*.ts"],
  migrations: ["src/infra/database/migration/**/*.ts"],
  subscribers: ["src/**/event/*.ts"],
  cli: {
    entitiesDir: "src/infra/database/domain",
    migrationsDir: "src/infra/database/migration",
    subscribersDir: "src/infra/database/subscriber",
  },
});
