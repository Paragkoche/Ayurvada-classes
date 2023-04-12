import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User.db";
import { Video } from "./Video.db";
@Entity()
export class Classes {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  photo: string;
  @Column()
  name: string;
  @Column()
  pay: string;
  @Column({ enum: ["UPI", "CARD"] })
  pay_by: "UPI" | "CARD";
  @Column()
  isPay: boolean;
  @Column()
  end_date: string;
  @Column({
    type: "date",
  })
  createAt: Date;
  @ManyToMany(() => User)
  @JoinTable()
  accessBy: User[];
  @ManyToOne(() => User, (uu) => uu.classes)
  makeBy: User;
  @OneToMany(() => Video, (v) => v.id)
  Videos: Video[];
}
