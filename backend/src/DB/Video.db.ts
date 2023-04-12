import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { User } from "./User.db";
import { Classes } from "./Classes.db";
@Entity()
export class Video {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  title: string;
  @Column()
  photo: string;
  @Column()
  disc: string;
  @Column()
  path: string;
  @OneToMany(() => User, (u) => u.liked_video)
  Liked: User[];
  @OneToMany(() => User, (u) => u.viewed_video)
  viewed_By: User[];
  @ManyToOne(() => Classes, (c) => c.Videos)
  Classes: Classes;
}
