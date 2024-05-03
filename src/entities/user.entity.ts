import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { ApiTags, getSchemaPath } from "@nestjs/swagger";

@ApiTags(getSchemaPath('users'))
@Entity({
    name: "users"
})

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string
    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    email: string
    @Column()
    birthdate: string
    @Column({ type: 'varchar', nullable: false })
    password: string
    @Column('int')
    phone: number
    @Column({ type: 'varchar', length: 50 })
    country: string
    @Column('text')
    address: string
    @Column({ type: 'varchar', length: 50 })
    city: string
    @Column({
        default: false
    })
    isAdmin: boolean
    @OneToMany(() => Order, order => order.user)
    orders: Order[]
}