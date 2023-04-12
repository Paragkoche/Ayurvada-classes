import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from "typeorm";
import { User } from "./User.db";
import { Video } from "./Video.db";
@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  comment: string;
  @OneToMany(() => Comment, (c) => c.id)
  comment_of_comment: Comment[];
  @OneToOne(() => User)
  @JoinTable()
  comment_by: User;
  @ManyToMany(() => Video)
  @JoinTable()
  video: Video[];
}
