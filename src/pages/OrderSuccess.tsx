
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface Order {
  id: string;
  date: string;
  items: any[];
  total: string;
  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
  };
  status: string;
  estimatedDelivery: string;
}

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  
  useEffect(() => {
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = orders.find((o: any) => o.id === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      navigate("/home");
    }
  }, [orderId, navigate]);
  
  if (!order) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-background/80">
      <Navbar cartItemsCount={0} />
      
      <div className="max-w-3xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 rounded-xl shadow-md overflow-hidden"
        >
          <div className="bg-primary/10 p-8 text-center">
            <CheckCircle size={72} className="mx-auto text-green-600 mb-4" />
            <h1 className="text-3xl font-bold text-secondary mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-bold"># {order.id}</p>
              </div>
              <Button 
                onClick={() => navigate(`/order-tracking/${order.id}`)}
                className="bg-primary text-secondary hover:bg-primary/90"
              >
                Track Order
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Order Details</h3>
                <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">Status: <span className="text-green-600 font-medium">Processing</span></p>
                <p className="text-sm text-gray-500">Total: ₵{order.total}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Shipping Information</h3>
                <p className="text-sm text-gray-500">{order.shipping.firstName} {order.shipping.lastName}</p>
                <p className="text-sm text-gray-500">{order.shipping.address}</p>
                <p className="text-sm text-gray-500">{order.shipping.city}, {order.shipping.postalCode}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-700 mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-secondary text-sm">{item.name}</h3>
                      {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                      {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        <span className="font-medium text-sm">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-500 mb-4">
                Have questions about your order? <a href="#" className="text-primary font-medium">Contact us</a>
              </p>
              <Button 
                variant="outline" 
                onClick={() => navigate("/home")}
                className="border-primary text-primary hover:bg-primary/10"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
