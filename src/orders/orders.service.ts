import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  create(createOrderDto: any) {
    return this.ordersRepository.addOrder(createOrderDto);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: string) {
    return this.ordersRepository.getOrder(id);
  }

  update(id: number, updateOrderDto: any) {
    return `This action updates a #${id} order ${updateOrderDto}`;
  }

  remove(id: string, userId: string) {
    return this.ordersRepository.removeOrder(id, userId);
  }
}
