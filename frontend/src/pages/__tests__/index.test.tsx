import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { message } from 'antd';
import ProductionOrdersPage from '../index';
import { productionOrdersApi } from '../../services/api';

// Mock the API
jest.mock('../../services/api');
const mockProductionOrdersApi = productionOrdersApi as jest.Mocked<typeof productionOrdersApi>;

// Mock antd message
jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('ProductionOrdersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockProductionOrdersApi.getOrders.mockResolvedValue([]);
  });

  it('renders the page and shows form and table', async () => {
    render(<ProductionOrdersPage />);
    
    expect(screen.getByText('Production Orders')).toBeInTheDocument();
    expect(screen.getByText('Add New Production Order')).toBeInTheDocument();
    expect(screen.getByText('Production Orders List')).toBeInTheDocument();
    
    // Wait for the API call to complete
    await waitFor(() => {
      expect(mockProductionOrdersApi.getOrders).toHaveBeenCalled();
    });
  });

  it('shows form elements and submit button', async () => {
    render(<ProductionOrdersPage />);

    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByText('Production Orders')).toBeInTheDocument();
    });

    // Check that form elements are present
    expect(screen.getByPlaceholderText('e.g., PO-001')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., Widget A')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('100')).toBeInTheDocument();
    expect(screen.getByText('Add Order')).toBeInTheDocument();
    
    // Check that the API was called to load orders
    expect(mockProductionOrdersApi.getOrders).toHaveBeenCalled();
  });
});
