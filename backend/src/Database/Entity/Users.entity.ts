import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, WithoutId } from "typeorm";
import { Classes } from "./Classes.entity";
import { genSalt, hash } from "bcrypt"
@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    age: number

    @Column()
    password: string

    @Column()
    gender: string

    @Column()
    is_active: boolean

    @Column({ enum: ["Admin", "Teacher", "Student"] })
    role: "Admin" | "Teacher" | "Student"

    @ManyToMany(() => Classes)
    @JoinTable()
    Classes: Classes[]

    @OneToMany(() => Classes, (classes) => classes.users)
    payFor: Classes[]
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    CreateAt: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    UpdateAt: Date

    @BeforeInsert()
    async password_hashing(password: string) {
        let _password = this.password || password
        let getSalt = await genSalt(14)
        let _hash = await hash(_password, getSalt);
        this.password = _hash;
    }

}

