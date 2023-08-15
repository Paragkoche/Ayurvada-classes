import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, WithoutId } from "typeorm";
import { Video } from "./Video.entity";
import { User } from "./Users.entity";
@Entity()
export class Classes {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    photo: string

    @Column()
    name: string

    @Column()
    pay: string

    @Column()
    end_on: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    CreateAt: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    UpdateAt: Date

    @OneToMany(() => Video, (video) => video.classes)
    Videos: Video[]

    @ManyToOne(() => User, (user) => user.Classes)
    users: User

}