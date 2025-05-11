
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export interface Order {
  id: string;
  date: string;
  total: string;
  status: "Delivered" | "Processing" | "Shipped" | "Cancelled";
}

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory = ({ orders = [] }: OrderHistoryProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and track your recent orders</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="divide-y">
              {orders.map((order) => (
                <motion.div 
                  key={order.id} 
                  className="py-4 flex justify-between items-center"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <p className="font-medium text-secondary">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "Delivered" 
                        ? "bg-green-100 text-green-800" 
                        : order.status === "Processing"
                        ? "bg-amber-100 text-amber-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-secondary">No orders yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You haven't placed any orders yet.
              </p>
              <div className="mt-6">
                <Button onClick={() => navigate('/home')}>Start Shopping</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderHistory;
