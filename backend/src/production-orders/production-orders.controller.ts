import { Controller, Get, Post, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductionOrdersService } from './production-orders.service';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';
import { ProductionOrder, ProductionOrderStatus } from './entities/production-order.entity';

@Controller('api/production-orders')
export class ProductionOrdersController {
  constructor(private readonly productionOrdersService: ProductionOrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductionOrderDto: CreateProductionOrderDto): ProductionOrder {
    return this.productionOrdersService.create(createProductionOrderDto);
  }

  @Get()
  findAll(@Query('status') status?: ProductionOrderStatus): ProductionOrder[] {
    return this.productionOrdersService.findAll(status);
  }
}
