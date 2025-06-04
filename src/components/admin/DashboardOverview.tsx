
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, TrendingUp, Bell, Users, ShoppingCart } from "lucide-react";
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
  totalAmount: string;
  status: string;
  items: OrderItem[];
}

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    todayOrders: 0,
    totalCustomers: 0,
    lowStockProducts: 0,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = () => {
    // Load orders from localStorage
    const adminOrders = JSON.parse(localStorage.getItem("admin_orders") || "[]");
    const regularOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    
    // Combine and deduplicate orders
    const allOrders = [...adminOrders, ...regularOrders];
    const uniqueOrders = allOrders.filter((order, index, self) => 
      index === self.findIndex(o => o.id === order.id || o.orderNumber === order.orderNumber)
    );
    
    setRecentOrders(uniqueOrders.slice(0, 5));
    
    // Calculate stats
    const today = new Date().toDateString();
    const todayOrders = uniqueOrders.filter(order => 
      new Date(order.timestamp || order.date || order.created_at || "").toDateString() === today
    );
    
    const totalRevenue = uniqueOrders.reduce((sum, order) => 
      sum + parseFloat((order.totalAmount || order.total || "0").replace(/[^\d.]/g, "")), 0
    );
    
    const pendingOrders = uniqueOrders.filter(order => 
      order.status === "pending" || order.status === "processing"
    ).length;

    // Get unique customers
    const uniqueCustomers = new Set(uniqueOrders.map(order => order.customerEmail)).size;
    
    setStats({
      totalOrders: uniqueOrders.length,
      totalRevenue,
      pendingOrders,
      todayOrders: todayOrders.length,
      totalCustomers: uniqueCustomers,
      lowStockProducts: 3, // This would come from products data
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

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">All time orders</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₵{stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total sales</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayOrders}</div>
              <p className="text-xs text-muted-foreground">Orders today</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">Unique customers</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Alert</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.lowStockProducts}</div>
              <p className="text-xs text-muted-foreground">Products low in stock</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest 5 orders from your store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id || order.orderNumber}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
              >
                <div className="space-y-1">
                  <p className="font-medium">#{order.orderNumber || order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customerName}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.timestamp || "").toLocaleString()}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium">₵{order.totalAmount}</p>
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    {order.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
            
            {recentOrders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No orders found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
