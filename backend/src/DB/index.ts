import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./User.db";
import { Classes } from "./Classes.db";
import { Comment } from "./Comment.db";
import { Video } from "./Video.db";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  password: "koche3588",
  database: "YoGa",
  synchronize: true,
  logging: "all",
  username: "postgres",
  entities: [User, Classes, Comment, Video],
});
