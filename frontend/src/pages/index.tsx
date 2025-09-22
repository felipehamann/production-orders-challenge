import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Form, Input, InputNumber, DatePicker, Button, Table, Select, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { ProductionOrder, CreateProductionOrderDto, ProductionOrderStatus } from '../types/production-order';
import { productionOrdersApi } from '../services/api';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const ProductionOrdersPage: React.FC = () => {
  const [form] = Form.useForm();
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusFilter, setStatusFilter] = useState<ProductionOrderStatus | undefined>();

  const columns = [
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: ProductionOrderStatus) => (
        <span style={{ 
          color: status === 'completed' ? 'green' : 
                status === 'in_progress' ? 'blue' : 
                status === 'scheduled' ? 'orange' : 'gray'
        }}>
          {status.replace('_', ' ').toUpperCase()}
        </span>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
  ];

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await productionOrdersApi.getOrders(statusFilter);
      setOrders(data);
    } catch (error) {
      message.error('Failed to load production orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  const handleSubmit = async (values: CreateProductionOrderDto) => {
    setSubmitting(true);
    try {
      await productionOrdersApi.createOrder(values);
      message.success('Production order created successfully!');
      form.resetFields();
      loadOrders();
    } catch (error) {
      message.error('Failed to create production order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Title level={2} style={{ margin: '16px 0', color: '#1890ff' }}>
          Production Orders
        </Title>
      </Header>
      
      <Content style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Card title="Add New Production Order" style={{ marginBottom: '24px' }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{ quantity: 1 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Form.Item
                  name="reference"
                  label="Reference"
                  rules={[{ required: true, message: 'Please enter reference' }]}
                >
                  <Input placeholder="e.g., PO-001" />
                </Form.Item>
                
                <Form.Item
                  name="product"
                  label="Product"
                  rules={[{ required: true, message: 'Please enter product name' }]}
                >
                  <Input placeholder="e.g., Widget A" />
                </Form.Item>
                
                <Form.Item
                  name="quantity"
                  label="Quantity"
                  rules={[
                    { required: true, message: 'Please enter quantity' },
                    { type: 'number', min: 1, message: 'Quantity must be at least 1' }
                  ]}
                >
                  <InputNumber min={1} style={{ width: '100%' }} placeholder="100" />
                </Form.Item>
                
                <Form.Item
                  name="dueDate"
                  label="Due Date"
                  rules={[{ required: true, message: 'Please select due date' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </div>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<PlusOutlined />}
                  loading={submitting}
                  size="large"
                >
                  Add Order
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Card 
            title="Production Orders List"
            extra={
              <Select
                placeholder="Filter by status"
                allowClear
                style={{ width: 200 }}
                onChange={setStatusFilter}
                value={statusFilter}
              >
                <Option value="planned">Planned</Option>
                <Option value="scheduled">Scheduled</Option>
                <Option value="in_progress">In Progress</Option>
                <Option value="completed">Completed</Option>
              </Select>
            }
          >
            <Spin spinning={loading}>
              <Table
                columns={columns}
                dataSource={orders}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                locale={{ emptyText: 'No production orders found' }}
              />
            </Spin>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default ProductionOrdersPage;
