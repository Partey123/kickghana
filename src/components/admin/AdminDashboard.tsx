
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Package, Eye, Users, DollarSign, TrendingUp, Bell } from "lucide-react";
import { motion } from "framer-motion";

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

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    todayOrders: 0,
  });

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadOrders = () => {
    // Load orders from localStorage (where they're stored from checkout)
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    
    // Load admin orders (from the new notification system)
    const adminOrders = JSON.parse(localStorage.getItem("admin_orders") || "[]");
    
    // Combine and deduplicate orders
    const allOrders = [...storedOrders, ...adminOrders];
    const uniqueOrders = allOrders.filter((order, index, self) => 
      index === self.findIndex(o => o.id === order.id || o.orderNumber === order.orderNumber)
    );
    
    setOrders(uniqueOrders.sort((a, b) => new Date(b.date || b.timestamp).getTime() - new Date(a.date || a.timestamp).getTime()));
    
    // Calculate stats
    const today = new Date().toDateString();
    const todayOrders = uniqueOrders.filter(order => 
      new Date(order.date || order.timestamp).toDateString() === today
    );
    
    const totalRevenue = uniqueOrders.reduce((sum, order) => 
      sum + parseFloat((order.total || order.totalAmount || "0").replace(/[^\d.]/g, "")), 0
    );
    
    const pendingOrders = uniqueOrders.filter(order => 
      order.status === "pending" || order.status === "processing"
    ).length;
    
    setStats({
      totalOrders: uniqueOrders.length,
      totalRevenue,
      pendingOrders,
      todayOrders: todayOrders.length,
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
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{stats.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayOrders}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your store</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id || order.orderNumber}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="space-y-1">
                      <p className="font-medium">#{order.orderNumber || order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerName || `${order.shipping?.firstName} ${order.shipping?.lastName}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.timestamp || order.date).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium">₵{order.totalAmount || order.total}</p>
                      <Badge className={`${getStatusColor(order.status)} text-white`}>
                        {order.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
                
                {orders.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No orders found
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>
              {selectedOrder ? `Order #${selectedOrder.orderNumber || selectedOrder.id}` : "Select an order to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedOrder ? (
              <ScrollArea className="h-96">
                <div className="space-y-6">
                  {/* Order Info */}
                  <div>
                    <h4 className="font-medium mb-2">Order Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Order Number:</span>
                        <span>#{selectedOrder.orderNumber || selectedOrder.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{new Date(selectedOrder.timestamp || selectedOrder.date).toLocaleString()}</span>
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

                  {/* Customer Info */}
                  <div>
                    <h4 className="font-medium mb-2">Customer Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span>{selectedOrder.customerName || `${selectedOrder.shipping?.firstName} ${selectedOrder.shipping?.lastName}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{selectedOrder.customerEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span>{selectedOrder.customerPhone || selectedOrder.shipping?.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Address:</span>
                        <span className="text-right">
                          {selectedOrder.customerAddress || 
                           `${selectedOrder.shipping?.address}, ${selectedOrder.shipping?.city}, ${selectedOrder.shipping?.postalCode}`}
                        </span>
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
                        <span>₵{selectedOrder.totalAmount || selectedOrder.total}</span>
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
                  <p>Select an order to view details</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
