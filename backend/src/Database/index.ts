import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  username: "postgres",
  password: "koche3588",
  host: "localhost",
  port: 5432,
  database: "_test",
  entities: ["src/Database/Entity/*.entity.ts"],
  logging: true,
  synchronize: true,
  cache: true,
});
