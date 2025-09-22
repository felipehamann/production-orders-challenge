import axios from 'axios';
import { ProductionOrder, CreateProductionOrderDto, ProductionOrderStatus } from '../types/production-order';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productionOrdersApi = {
  async createOrder(orderData: CreateProductionOrderDto): Promise<ProductionOrder> {
    const response = await api.post('/api/production-orders', orderData);
    return response.data;
  },

  async getOrders(status?: ProductionOrderStatus): Promise<ProductionOrder[]> {
    const params = status ? { status } : {};
    const response = await api.get('/api/production-orders', { params });
    return response.data;
  },
};
