import {
  BeforeInsert,
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
import { Classes } from "./Classes.entity";
import { genSalt, hash } from "bcrypt";
import { OTP } from "./Otp.entity";
import { Comment } from "./Video.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  is_active: boolean;

  @Column({ enum: ["Admin", "Teacher", "Student"] })
  role: "Admin" | "Teacher" | "Student";

  @ManyToMany(() => Classes, { cascade: true, onDelete: "CASCADE" })
  @JoinTable()
  Classes: Classes[];

  @OneToMany(() => PayFor, (pfor) => pfor.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  payFor: PayFor[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  comments: Comment[];
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

  @BeforeInsert()
  async password_hashing(password: string) {
    let _password = this.password || password;
    let getSalt = await genSalt(14);
    let _hash = await hash(_password, getSalt);
    this.password = _hash;
  }
}

@Entity()
export class PayFor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.payFor)
  user: User;

  @ManyToOne(() => Classes, (classes) => classes.payFor, {
    cascade: true,
    onDelete: "CASCADE",
  })
  class: Classes;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  joinAt: Date;

  @Column("timestamp")
  endAt: Date;
}
