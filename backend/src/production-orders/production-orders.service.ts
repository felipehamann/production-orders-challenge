import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';
import { ProductionOrder, ProductionOrderStatus } from './entities/production-order.entity';

@Injectable()
export class ProductionOrdersService {
  private orders: ProductionOrder[] = [];

  create(createProductionOrderDto: CreateProductionOrderDto): ProductionOrder {
    const order = new ProductionOrder({
      id: uuidv4(),
      reference: createProductionOrderDto.reference,
      product: createProductionOrderDto.product,
      quantity: createProductionOrderDto.quantity,
      dueDate: createProductionOrderDto.dueDate,
      status: 'planned' as ProductionOrderStatus,
      createdAt: new Date().toISOString(),
    });

    this.orders.push(order);
    return order;
  }

  findAll(status?: ProductionOrderStatus): ProductionOrder[] {
    if (status) {
      return this.orders.filter(order => order.status === status);
    }
    return this.orders;
  }
}
