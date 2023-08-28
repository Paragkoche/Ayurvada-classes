import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  WithoutId,
} from "typeorm";
import { User } from "./Users.entity";
import { Classes } from "./Classes.entity";
@Entity()
export class Video {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "text" })
  photo: string;

  @Column({ type: "text" })
  disc: string;

  @Column({ nullable: true })
  doc: string;
  @Column()
  link: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  CreateAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  UpdateAt: Date;

  @ManyToOne((type) => Classes, (classes) => classes.Videos)
  classes: Classes;

  @OneToMany(() => Comment, (comment) => comment.video)
  Comments: Comment[];

  @OneToMany(() => Like, (link) => link.video)
  Likes: Like[];
}

@Entity()
export class Like {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @ManyToOne(() => Video, (video) => video.Likes, {
    cascade: true,
    onDelete: "CASCADE",
  })
  video: Video;
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  CreateAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  UpdateAt: Date;
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  comment: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
  @ManyToOne(() => Video, (video) => video.Comments, {
    cascade: true,
    onDelete: "CASCADE",
  })
  video: Video;
  @OneToMany((type) => Comment, (comment) => comment.Comment_of_comment_rle)
  Comment_of_Comment: Comment[];

  @ManyToOne((type) => Comment, (comment) => comment.Comment_of_Comment, {
    cascade: true,
    onDelete: "CASCADE",
  })
  Comment_of_comment_rle: Comment;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  CreateAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  UpdateAt: Date;
}
