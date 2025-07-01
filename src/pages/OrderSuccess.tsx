
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Truck, MapPin, CreditCard, DollarSign, Home } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-green-50 border-b border-green-200 p-8 text-center">
            <CheckCircle size={72} className="mx-auto text-green-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-bold text-gray-900 text-lg"># {order.id}</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => navigate("/home")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Home size={16} />
                  Home
                </Button>
                <Button 
                  onClick={() => navigate(`/order-tracking/${order.id}`)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Track Order
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-600">Date: <span className="text-gray-900">{new Date(order.date).toLocaleDateString()}</span></p>
                  <p className="text-gray-600">Status: <span className="text-primary font-medium">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></p>
                  <p className="text-gray-600">Total: <span className="text-gray-900 font-medium">₵{order.total}</span></p>
                  <div className="flex items-center">
                    {isCashOnDelivery ? (
                      <>
                        <DollarSign className="h-4 w-4 mr-2 text-amber-500" />
                        <span className="text-gray-600">Payment: <span className="text-amber-600 font-medium">Pay on Delivery</span></span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-gray-600">Payment: <span className="text-green-600 font-medium">Paid</span></span>
                      </>
                    )}
                  </div>
                  {order.payment_reference && (
                    <p className="text-gray-600">Reference: <span className="text-gray-900">{order.payment_reference}</span></p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Shipping Information</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p className="text-gray-900 font-medium">{order.shipping.firstName} {order.shipping.lastName}</p>
                  <p>{order.shipping.address}</p>
                  <p>{order.shipping.city}, {order.shipping.postalCode}</p>
                  <p>{order.shipping.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                      {item.color && <p className="text-xs text-gray-600">Color: {item.color}</p>}
                      {item.size && <p className="text-xs text-gray-600">Size: {item.size}</p>}
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                        <span className="font-medium text-sm text-gray-900">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 text-center space-y-4">
              <p className="text-gray-600">
                Have questions about your order? <a href="#" className="text-primary font-medium hover:underline">Contact us</a>
              </p>
              <div className="flex gap-3 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/home")}
                  className="flex items-center gap-2"
                >
                  <Home size={16} />
                  Home
                </Button>
                <Button 
                  onClick={() => navigate("/collections")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
