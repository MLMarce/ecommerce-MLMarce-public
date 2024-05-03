import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity({
    name: "orderdetails"
})

export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number
    @OneToOne(() => Order, order => order.orderDetail)
    @JoinColumn()
    order: Order

    @ManyToMany(() => Product)
    @JoinTable({
        name: "orderdetails_products"
    })
    products: Product[]
}