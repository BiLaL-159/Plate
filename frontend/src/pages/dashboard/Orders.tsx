
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter, Check, X } from 'lucide-react';
import { toast } from 'sonner';


type OrderStatus = 'pending' | 'completed' | 'cancelled';

interface Order {
  id: string;
  customer: string;
  date: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  status: OrderStatus;
  address: string;
  phone: string;
}


const mockOrders: Order[] = [
  {
    id: 'ORD-1001',
    customer: 'John Doe',
    date: '2024-03-10T15:30:00',
    items: [
      { name: 'Margherita Pizza', quantity: 2, price: 12.99 },
      { name: 'Garlic Breadsticks', quantity: 1, price: 4.99 },
      { name: 'Coca Cola', quantity: 2, price: 1.99 }
    ],
    total: 34.95,
    status: 'pending',
    address: '123 Main St, Anytown, CA 94105',
    phone: '(555) 123-4567'
  },
  {
    id: 'ORD-1002',
    customer: 'Jane Smith',
    date: '2024-03-10T14:15:00',
    items: [
      { name: 'Chicken Alfredo', quantity: 1, price: 14.99 },
      { name: 'Caesar Salad', quantity: 1, price: 8.99 }
    ],
    total: 23.98,
    status: 'completed',
    address: '456 Oak Ave, Anytown, CA 94106',
    phone: '(555) 987-6543'
  },
  {
    id: 'ORD-1003',
    customer: 'Robert Johnson',
    date: '2024-03-10T13:45:00',
    items: [
      { name: 'Pepperoni Pizza', quantity: 1, price: 13.99 },
      { name: 'Buffalo Wings', quantity: 1, price: 9.99 },
      { name: 'Sprite', quantity: 1, price: 1.99 }
    ],
    total: 25.97,
    status: 'pending',
    address: '789 Pine St, Anytown, CA 94107',
    phone: '(555) 456-7890'
  },
  {
    id: 'ORD-1004',
    customer: 'Emily Williams',
    date: '2024-03-09T18:20:00',
    items: [
      { name: 'Vegetarian Pizza', quantity: 1, price: 13.99 },
      { name: 'Greek Salad', quantity: 1, price: 7.99 }
    ],
    total: 21.98,
    status: 'completed',
    address: '321 Elm St, Anytown, CA 94108',
    phone: '(555) 321-6547'
  },
  {
    id: 'ORD-1005',
    customer: 'Michael Brown',
    date: '2024-03-09T19:10:00',
    items: [
      { name: 'Supreme Pizza', quantity: 1, price: 15.99 },
      { name: 'Cheesy Breadsticks', quantity: 1, price: 5.99 },
      { name: 'Diet Coke', quantity: 2, price: 1.99 }
    ],
    total: 25.96,
    status: 'completed',
    address: '654 Maple Ave, Anytown, CA 94109',
    phone: '(555) 789-0123'
  }
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast.success(`Order ${orderId} marked as ${newStatus}`);
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        
        {/* Filters and search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex space-x-2">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'pending' ? 'default' : 'outline'} 
              onClick={() => setFilter('pending')}
            >
              Pending
            </Button>
            <Button 
              variant={filter === 'completed' ? 'default' : 'outline'} 
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
            <Button 
              variant={filter === 'cancelled' ? 'default' : 'outline'} 
              onClick={() => setFilter('cancelled')}
            >
              Cancelled
            </Button>
          </div>
          
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Orders list */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No orders found</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <Card key={order.id} className="overflow-hidden">
                <div className="p-4 cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{order.id}</span>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{order.customer}</span>
                    </div>
                    
                    <div className="flex mt-2 md:mt-0 items-center justify-between md:justify-end space-x-4">
                      <span className="text-sm">{formatDate(order.date)}</span>
                      <span className="font-medium">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {expandedOrderId === order.id && (
                  <CardContent className="pb-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-sm mb-2">Order Details</h3>
                        <ul className="space-y-2 text-sm">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="flex justify-between">
                              <span>{item.quantity}x {item.name}</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                          <li className="flex justify-between font-bold pt-2 border-t">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-sm mb-2">Customer Information</h3>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-muted-foreground">Name:</span> {order.customer}</p>
                          <p><span className="text-muted-foreground">Phone:</span> {order.phone}</p>
                          <p><span className="text-muted-foreground">Address:</span> {order.address}</p>
                        </div>
                        
                        {order.status === 'pending' && (
                          <div className="mt-4 flex space-x-2">
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(order.id, 'completed');
                              }}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Complete
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(order.id, 'cancelled');
                              }}
                            >
                              <X className="mr-1 h-4 w-4" />
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
