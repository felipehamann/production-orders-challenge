export type ProductionOrderStatus = 'planned' | 'scheduled' | 'in_progress' | 'completed';

export class ProductionOrder {
  id: string;
  reference: string;
  product: string;
  quantity: number;
  dueDate: string;
  status: ProductionOrderStatus;
  createdAt: string;

  constructor(partial: Partial<ProductionOrder>) {
    Object.assign(this, partial);
  }
}
