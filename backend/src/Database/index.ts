import { DataSource } from "typeorm";
import { config } from "dotenv";
config();
console.log(__dirname);

export default new DataSource({
  type: "postgres",
  username: process.env.DB_username,
  password: process.env.DB_password,
  host: process.env.DB_host,
  port: parseInt(process.env.DB_port),
  database: process.env.DB_name,
  entities: ["src/Database/Entity/*.entity.ts"],
  logging: true,
  synchronize: true,
  cache: Boolean(process.env.DB_cache),
});
