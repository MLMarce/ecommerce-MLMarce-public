import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./orderDetail.entity";
import { Category } from "./category.entity";

@Entity({
    name: "products"
})

export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({type: 'varchar',unique: true, length: 50, nullable: false})
    name: string
    @Column({type: 'text', nullable: false})
    description: string
    @Column({type: "decimal", precision: 10, scale: 2, nullable: false})
    price: number
    @Column({type: "int", nullable: false})
    stock: number
    @Column('text')
    imgUrl: string = "https://i.ytimg.com/vi/_LbbKKuimaM/maxresdefault.jpg"
    @ManyToOne(() => Category, category => category.products)
    @JoinColumn()
    category: Category
    @ManyToMany(() => OrderDetail, orderDetail => orderDetail.products)
    orderDetails: OrderDetail[]
}