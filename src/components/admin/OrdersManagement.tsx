
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Search, Filter, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
  color?: string;
  size?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  timestamp: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  recipientName?: string;
  recipientPhone?: string;
  items: OrderItem[];
  subtotal: string;
  deliveryFee: number;
  totalAmount: string;
  paymentMethod: string;
  paymentType: string;
  paymentStatus: string;
  deliveryType: string;
  itemCount: number;
  status: string;
}

const OrdersManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadOrders = () => {
    const adminOrders = JSON.parse(localStorage.getItem("admin_orders") || "[]");
    const regularOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    
    const allOrders = [...adminOrders, ...regularOrders];
    const uniqueOrders = allOrders.filter((order, index, self) => 
      index === self.findIndex(o => o.id === order.id || o.orderNumber === order.orderNumber)
    );
    
    setOrders(uniqueOrders.sort((a, b) => new Date(b.timestamp || "").getTime() - new Date(a.timestamp || "").getTime()));
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const adminOrders = JSON.parse(localStorage.getItem("admin_orders") || "[]");
    const regularOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    
    // Update in admin orders
    const updatedAdminOrders = adminOrders.map((order: Order) => 
      (order.id === orderId || order.orderNumber === orderId) 
        ? { ...order, status: newStatus }
        : order
    );
    
    // Update in regular orders
    const updatedRegularOrders = regularOrders.map((order: Order) => 
      (order.id === orderId || order.orderNumber === orderId) 
        ? { ...order, status: newStatus }
        : order
    );
    
    localStorage.setItem("admin_orders", JSON.stringify(updatedAdminOrders));
    localStorage.setItem("orders", JSON.stringify(updatedRegularOrders));
    
    // Update local state
    setOrders(prev => prev.map(order => 
      (order.id === orderId || order.orderNumber === orderId) 
        ? { ...order, status: newStatus }
        : order
    ));
    
    if (selectedOrder && (selectedOrder.id === orderId || selectedOrder.orderNumber === orderId)) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
    
    toast({
      title: "Order Updated",
      description: `Order status changed to ${newStatus}`,
    });
  };

  const updatePaymentStatus = (orderId: string, newPaymentStatus: string) => {
    const adminOrders = JSON.parse(localStorage.getItem("admin_orders") || "[]");
    const regularOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    
    const updatedAdminOrders = adminOrders.map((order: Order) => 
      (order.id === orderId || order.orderNumber === orderId) 
        ? { ...order, paymentStatus: newPaymentStatus }
        : order
    );
    
    const updatedRegularOrders = regularOrders.map((order: Order) => 
      (order.id === orderId || order.orderNumber === orderId) 
        ? { ...order, paymentStatus: newPaymentStatus }
        : order
    );
    
    localStorage.setItem("admin_orders", JSON.stringify(updatedAdminOrders));
    localStorage.setItem("orders", JSON.stringify(updatedRegularOrders));
    
    setOrders(prev => prev.map(order => 
      (order.id === orderId || order.orderNumber === orderId) 
        ? { ...order, paymentStatus: newPaymentStatus }
        : order
    ));
    
    if (selectedOrder && (selectedOrder.id === orderId || selectedOrder.orderNumber === orderId)) {
      setSelectedOrder(prev => prev ? { ...prev, paymentStatus: newPaymentStatus } : null);
    }
    
    toast({
      title: "Payment Updated",
      description: `Payment status changed to ${newPaymentStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-500";
      case "processing": return "bg-blue-500";
      case "shipped": return "bg-purple-500";
      case "delivered": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "failed": return "bg-red-500";
      case "pay on delivery": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.paymentStatus?.toLowerCase().includes(paymentFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Orders Management</CardTitle>
          <CardDescription>Manage and track all customer orders</CardDescription>
          
          {/* Filters */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="search">Search Orders</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by order number, customer name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <Label>Order Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Label>Payment Status</Label>
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="delivery">Pay on Delivery</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id || order.orderNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="space-y-1">
                    <p className="font-medium">#{order.orderNumber || order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.timestamp || "").toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <Badge className={`${getPaymentStatusColor(order.paymentStatus || "pending")} text-white text-xs`}>
                        {order.paymentStatus || "Pending"}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-medium">₵{order.totalAmount}</p>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      {order.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
              
              {filteredOrders.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No orders found matching your criteria
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle>Order Details & Actions</CardTitle>
          <CardDescription>
            {selectedOrder ? `Order #${selectedOrder.orderNumber || selectedOrder.id}` : "Select an order to view and manage"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedOrder ? (
            <ScrollArea className="h-96">
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Update Order Status</Label>
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(value) => updateOrderStatus(selectedOrder.id || selectedOrder.orderNumber, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Update Payment Status</Label>
                    <Select
                      value={selectedOrder.paymentStatus || "pending"}
                      onValueChange={(value) => updatePaymentStatus(selectedOrder.id || selectedOrder.orderNumber, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="Pay on Delivery">Pay on Delivery</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Order Information */}
                <div>
                  <h4 className="font-medium mb-2">Order Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Number:</span>
                      <span>#{selectedOrder.orderNumber || selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{new Date(selectedOrder.timestamp || "").toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className={`${getStatusColor(selectedOrder.status)} text-white`}>
                        {selectedOrder.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Status:</span>
                      <Badge className={`${getPaymentStatusColor(selectedOrder.paymentStatus || "pending")} text-white`}>
                        {selectedOrder.paymentStatus || "Pending"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Customer Information */}
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{selectedOrder.customerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{selectedOrder.customerPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Address:</span>
                      <span className="text-right">{selectedOrder.customerAddress}</span>
                    </div>
                  </div>
                </div>

                {selectedOrder.recipientName && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Delivery Recipient</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span>{selectedOrder.recipientName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone:</span>
                          <span>{selectedOrder.recipientPhone}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                {/* Items */}
                <div>
                  <h4 className="font-medium mb-2">Order Items</h4>
                  <div className="space-y-3">
                    {(selectedOrder.items || []).map((item, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          {item.color && <p className="text-xs text-muted-foreground">Color: {item.color}</p>}
                          {item.size && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Order Summary */}
                <div>
                  <h4 className="font-medium mb-2">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal:</span>
                      <span>{selectedOrder.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee:</span>
                      <span>₵{selectedOrder.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total:</span>
                      <span>₵{selectedOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Payment & Delivery */}
                <div>
                  <h4 className="font-medium mb-2">Payment & Delivery</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Method:</span>
                      <span>{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Type:</span>
                      <span>{selectedOrder.paymentType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Type:</span>
                      <span>{selectedOrder.deliveryType}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center h-96 text-muted-foreground">
              <div className="text-center">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select an order to view and manage details</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersManagement;
