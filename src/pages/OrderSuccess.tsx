
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, MapPin, CreditCard, DollarSign } from "lucide-react";
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
    phone: string;
  };
  status: string;
  paymentStatus?: string;
  paymentMethod?: string;
  estimatedDelivery: string;
  payment_reference?: string;
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
      // Update order status if coming from payment success
      if (foundOrder.status === "pending" && foundOrder.paymentMethod !== "cashOnDelivery") {
        const urlParams = new URLSearchParams(window.location.search);
        const reference = urlParams.get("reference");
        
        if (reference) {
          // Update the order with payment reference
          const updatedOrders = orders.map((o: any) => {
            if (o.id === orderId) {
              return { ...o, status: "processing", payment_reference: reference, paymentStatus: "paid" };
            }
            return o;
          });
          
          localStorage.setItem("orders", JSON.stringify(updatedOrders));
          foundOrder.status = "processing";
          foundOrder.payment_reference = reference;
          foundOrder.paymentStatus = "paid";
        }
      }
      
      setOrder(foundOrder);
    } else {
      navigate("/home");
    }
  }, [orderId, navigate]);
  
  if (!order) {
    return null;
  }
  
  const isCashOnDelivery = order.paymentMethod === "cashOnDelivery";
  
  return (
    <div className="min-h-screen bg-background/80">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl shadow-md overflow-hidden"
        >
          <div className="bg-primary/20 p-8 text-center">
            <CheckCircle size={72} className="mx-auto text-primary mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
            <p className="text-white/90">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>
          
          <div className="p-8 text-white">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-white/80">Order Number</p>
                <p className="font-bold"># {order.id}</p>
              </div>
              <Button 
                onClick={() => navigate(`/order-tracking/${order.id}`)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Track Order
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-medium text-white mb-2">Order Details</h3>
                <p className="text-sm text-white/80">Date: {new Date(order.date).toLocaleDateString()}</p>
                <p className="text-sm text-white/80">Status: <span className="text-primary font-medium">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></p>
                <p className="text-sm text-white/80">Total: ₵{order.total}</p>
                <div className="mt-2 flex items-center">
                  {isCashOnDelivery ? (
                    <>
                      <DollarSign className="h-4 w-4 mr-2 text-amber-400" />
                      <span className="text-sm text-white/80">Payment: <span className="text-amber-400 font-medium">Pay on Delivery</span></span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2 text-green-400" />
                      <span className="text-sm text-white/80">Payment: <span className="text-green-400 font-medium">Paid</span></span>
                    </>
                  )}
                </div>
                {order.payment_reference && (
                  <p className="text-sm text-white/80">Payment Reference: {order.payment_reference}</p>
                )}
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-2">Shipping Information</h3>
                <p className="text-sm text-white/80">{order.shipping.firstName} {order.shipping.lastName}</p>
                <p className="text-sm text-white/80">{order.shipping.address}</p>
                <p className="text-sm text-white/80">{order.shipping.city}, {order.shipping.postalCode}</p>
                <p className="text-sm text-white/80">{order.shipping.phone}</p>
              </div>
            </div>
            
            <div className="border-t border-white/20 pt-6">
              <h3 className="font-medium text-white mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3">
                    <div className="w-16 h-16 bg-white/5 rounded-md overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white text-sm">{item.name}</h3>
                      {item.color && <p className="text-xs text-white/80">Color: {item.color}</p>}
                      {item.size && <p className="text-xs text-white/80">Size: {item.size}</p>}
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-white/80">Qty: {item.quantity}</span>
                        <span className="font-medium text-sm text-primary">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-white/80 mb-4">
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
