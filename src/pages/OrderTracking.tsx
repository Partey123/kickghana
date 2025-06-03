import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, MapPin, ArrowLeft, CreditCard, DollarSign } from "lucide-react";
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
  paymentStatus?: string;
  paymentMethod?: string;
  estimatedDelivery: string;
}

const OrderTracking = () => {
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
  
  // Calculate delivery progress based on order date and estimated delivery
  const orderDate = new Date(order.date);
  const estimatedDelivery = new Date(order.estimatedDelivery);
  const today = new Date();
  const totalDuration = estimatedDelivery.getTime() - orderDate.getTime();
  const progress = Math.min(
    100,
    Math.max(
      0,
      ((today.getTime() - orderDate.getTime()) / totalDuration) * 100
    )
  );

  // Define tracking steps
  const isCashOnDelivery = order.paymentMethod === "cashOnDelivery";

  // Different steps for different payment methods
  const steps = isCashOnDelivery ? [
    { 
      title: "Order Placed", 
      date: new Date(order.date).toLocaleDateString(), 
      completed: true,
      icon: <CheckCircle className="h-6 w-6" />
    },
    { 
      title: "Processing", 
      date: new Date(new Date(order.date).getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      completed: progress >= 25,
      icon: <Package className="h-6 w-6" />
    },
    { 
      title: "On Route", 
      date: new Date(new Date(order.date).getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      completed: progress >= 50,
      icon: <Truck className="h-6 w-6" />
    },
    { 
      title: "Delivered", 
      date: new Date(order.estimatedDelivery).toLocaleDateString(),
      completed: progress >= 90,
      icon: <MapPin className="h-6 w-6" />
    },
    { 
      title: "Payment Received", 
      date: "Upon delivery",
      completed: progress >= 100 && order.paymentStatus === "paid",
      icon: <DollarSign className="h-6 w-6" />
    }
  ] : [
    { 
      title: "Order Placed", 
      date: new Date(order.date).toLocaleDateString(), 
      completed: true,
      icon: <CheckCircle className="h-6 w-6" />
    },
    { 
      title: "Processing", 
      date: new Date(new Date(order.date).getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      completed: progress >= 33,
      icon: <Package className="h-6 w-6" />
    },
    { 
      title: "On Route", 
      date: new Date(new Date(order.date).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      completed: progress >= 66,
      icon: <Truck className="h-6 w-6" />
    },
    { 
      title: "Delivered", 
      date: new Date(order.estimatedDelivery).toLocaleDateString(),
      completed: progress >= 100,
      icon: <MapPin className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-background/80">
      <Navbar cartItemsCount={0} />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Button 
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" /> Back
        </Button>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 rounded-xl shadow-md p-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-secondary">Track Your Order</h1>
              <p className="text-gray-600">Order #{order.id}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <p className="font-bold">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
              {isCashOnDelivery && (
                <div className="mt-2 flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-amber-600" />
                  <span className="text-sm font-medium text-amber-600">
                    Payment on Delivery
                  </span>
                </div>
              )}
              {!isCashOnDelivery && (
                <div className="mt-2 flex items-center">
                  <CreditCard className="h-4 w-4 mr-1 text-green-600" />
                  <span className="text-sm font-medium text-green-600">
                    Payment Completed
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative mb-12">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Progress Steps */}
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="absolute text-center"
                  style={{ left: `calc(${(index / (steps.length - 1)) * 100}% - 12px)` }}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-primary text-white" : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step.completed ? step.icon : index + 1}
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-medium">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-secondary mb-4">Shipping Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{order.shipping.firstName} {order.shipping.lastName}</p>
                <p className="text-gray-600">{order.shipping.address}</p>
                <p className="text-gray-600">{order.shipping.city}, {order.shipping.postalCode}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-secondary mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Items:</span>
                  <span>{order.items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold">₵{order.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span>{isCashOnDelivery ? "Cash on Delivery" : "Online Payment"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <span className={`${isCashOnDelivery && order.paymentStatus !== 'paid' ? "text-amber-600" : "text-green-600"} font-medium`}>
                    {isCashOnDelivery && order.paymentStatus !== 'paid' ? "Pending" : "Paid"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Items */}
          <div className="mt-8">
            <h3 className="font-bold text-secondary mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 border-b pb-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                    {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                      <span className="font-medium">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderTracking;
