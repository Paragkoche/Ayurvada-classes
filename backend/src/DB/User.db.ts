import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  BeforeInsert,
} from "typeorm";
import { Classes } from "./Classes.db";
import { Video } from "./Video.db";
import { password_key } from "../Env";
import { HmacSHA512 } from "crypto-js";
import { hash, genSalt } from "bcrypt";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: String;
  @Column()
  name: string;
  @Column()
  profile_pic: string;
  @Column({ unique: true })
  email: string;
  @Column()
  constantNo: string;
  @Column()
  age: number;
  @Column()
  gender: string;
  @Column()
  password: string;
  @Column({ enum: ["admin", "teacher", "client"], default: "client" })
  role: "admin" | "teacher" | "client";
  @Column()
  is_active: boolean;
  @OneToMany(() => Classes, (cc) => cc.makeBy)
  classes: Classes[];
  @ManyToOne(() => Video, (v) => v.Liked)
  liked_video: Video;
  @ManyToOne(() => Video, (v) => v.viewed_By)
  viewed_video: Video;
  @BeforeInsert()
  async passwordHash(_password: string) {
    const password = this.password || _password;
    const hash1 = HmacSHA512(password, password_key).toString();
    const hash2 = await hash(hash1, await genSalt(14));
    this.password = hash2;
  }
}
