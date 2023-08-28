import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./Users.entity";

@Entity()
export class OTP {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  otp: string;

  @Column({ default: false })
  isUse: boolean;

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

  @OneToOne(() => User, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  User: User;
}
