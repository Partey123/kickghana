
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = () => {
    const adminOrders = JSON.parse(localStorage.getItem("admin_orders") || "[]");
    const regularOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    
    const allOrders = [...adminOrders, ...regularOrders];
    const uniqueOrders = allOrders.filter((order, index, self) => 
      index === self.findIndex(o => o.id === order.id || o.orderNumber === order.orderNumber)
    );
    
    setRecentOrders(uniqueOrders.slice(0, 5));
    
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

    const uniqueCustomers = new Set(uniqueOrders.map(order => order.customerEmail)).size;
    
    setStats({
      totalOrders: uniqueOrders.length,
      totalRevenue,
      pendingOrders,
      todayOrders: todayOrders.length,
      totalCustomers: uniqueCustomers,
      lowStockProducts: 3,
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
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Total Orders</CardTitle>
              <Package className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.totalOrders}</div>
              <p className="text-xs text-gray-600">All time orders</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">₵{stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-gray-600">Total sales</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Pending Orders</CardTitle>
              <Bell className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.pendingOrders}</div>
              <p className="text-xs text-gray-600">Needs attention</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Today's Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.todayOrders}</div>
              <p className="text-xs text-gray-600">Orders today</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.totalCustomers}</div>
              <p className="text-xs text-gray-600">Unique customers</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Low Stock Alert</CardTitle>
              <ShoppingCart className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.lowStockProducts}</div>
              <p className="text-xs text-gray-600">Products low in stock</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-black">Recent Orders</CardTitle>
          <CardDescription className="text-gray-600">Latest 5 orders from your store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id || order.orderNumber}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 bg-white"
              >
                <div className="space-y-1">
                  <p className="font-medium text-black">#{order.orderNumber || order.id}</p>
                  <p className="text-sm text-gray-700">{order.customerName}</p>
                  <p className="text-xs text-gray-600">
                    {new Date(order.timestamp || "").toLocaleString()}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium text-black">₵{order.totalAmount}</p>
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    {order.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
            
            {recentOrders.length === 0 && (
              <div className="text-center py-8 text-gray-600">
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
