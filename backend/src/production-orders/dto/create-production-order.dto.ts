import { IsString, IsNotEmpty, IsNumber, IsPositive, IsISO8601 } from 'class-validator';

export class CreateProductionOrderDto {
  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  @IsISO8601()
  dueDate: string;
}
