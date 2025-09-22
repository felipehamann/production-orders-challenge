import { Test, TestingModule } from '@nestjs/testing';
import { ProductionOrdersService } from './production-orders.service';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';

describe('ProductionOrdersService', () => {
  let service: ProductionOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductionOrdersService],
    }).compile();

    service = module.get<ProductionOrdersService>(ProductionOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create and list production orders', () => {
    const createOrderDto: CreateProductionOrderDto = {
      reference: 'PO-001',
      product: 'Widget A',
      quantity: 100,
      dueDate: '2024-12-31T00:00:00.000Z',
    };

    const createdOrder = service.create(createOrderDto);
    const allOrders = service.findAll();

    expect(createdOrder).toBeDefined();
    expect(createdOrder.id).toBeDefined();
    expect(createdOrder.reference).toBe(createOrderDto.reference);
    expect(createdOrder.product).toBe(createOrderDto.product);
    expect(createdOrder.quantity).toBe(createOrderDto.quantity);
    expect(createdOrder.dueDate).toBe(createOrderDto.dueDate);
    expect(createdOrder.status).toBe('planned');
    expect(createdOrder.createdAt).toBeDefined();

    expect(allOrders).toHaveLength(1);
    expect(allOrders[0]).toEqual(createdOrder);
  });

  it('should filter orders by status', () => {
    const createOrderDto: CreateProductionOrderDto = {
      reference: 'PO-002',
      product: 'Widget B',
      quantity: 50,
      dueDate: '2024-12-31T00:00:00.000Z',
    };

    service.create(createOrderDto);
    const plannedOrders = service.findAll('planned');

    expect(plannedOrders).toHaveLength(1);
    expect(plannedOrders[0].status).toBe('planned');
  });
});
