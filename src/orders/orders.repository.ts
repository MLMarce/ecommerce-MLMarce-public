import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'src/dtos/orders.dto';
import { Order } from 'src/entities/order.entity';
import { OrderDetail } from 'src/entities/orderDetail.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(OrderDetail)
        private readonly orderDetailRepository: Repository<OrderDetail>,
    ) { }

    async getOrder(id: string) {
        const orderFound = await this.orderRepository.findOne({ where: { id: id }, relations: { orderDetail: { products: true } } });
        if(!orderFound) throw new NotFoundException(`Order with ID: ${id} not found`);
        return orderFound;
    }

    async addOrder(order: OrderDto) {
        const user = await this.userRepository.findOneBy({ id: order.userId });
        if (!user) throw new NotFoundException('User not found');
        const newOrder = new Order();
        newOrder.user = user;
        newOrder.date = new Date().toISOString();
        const createdOrder = await this.orderRepository.save(newOrder);
        let total = 0;
        const productsIdArr = order.products;
        const productsFound = await Promise.all(
            productsIdArr.map(
                async ({ id }) => {
                    const product = await this.productRepository.findOne({
                        where: { id: id, stock: MoreThan(0) },
                    })
                    if (!product) return
                    total += Number(product.price)
                    await this.productRepository.update(id, { stock: product.stock - 1 })
                    return product
                }
            ),
        );
        console.log(productsFound, productsFound.length);


        if (productsFound.every(product => product === undefined)) throw new NotFoundException("Product aren't available");

        const newOrderDetail = new OrderDetail();
        newOrderDetail.order = createdOrder;
        newOrderDetail.price = Number(total.toFixed(2));
        newOrderDetail.products = productsFound;

        await this.orderDetailRepository.save(newOrderDetail);

        return await this.orderRepository.find({ where: { id: createdOrder.id }, relations: { orderDetail: true } })

    }

    async removeOrder(id: string, userID: string) {
        const orderToDelete = await this.orderRepository.findOne({ where: { id: id, user: { id: userID } }, relations:{orderDetail: {products: true}} })

        if (!orderToDelete) throw new NotFoundException('Order not found');
        const orderDetail = orderToDelete.orderDetail
        const productsInOrder = orderDetail.products
        
        await Promise.all(productsInOrder.map(async ({ id, stock }) => await this.productRepository.update(id, { stock: stock + 1 })))
        await this.orderDetailRepository.delete(orderDetail.id)
        await this.orderRepository.delete(id)
        return `Order with ID: ${id} has been deleted`
    }
}
