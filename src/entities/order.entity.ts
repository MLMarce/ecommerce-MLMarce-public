import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { OrderDetail} from "./orderDetail.entity";

@Entity({
    name: "orders"
})

export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string 
    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn()
    user: User;
    @Column()
    date: string
    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
    orderDetail: OrderDetail;
}

