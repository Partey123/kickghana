
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { useCart } from "@/contexts/CartContext";
import { useLoading } from "@/contexts/LoadingContext";
import OrderSummary from "@/components/checkout/OrderSummary";
import { calculateDeliveryFee } from "@/components/checkout/DeliveryFeeCalculator";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { CheckoutFormValues } from "@/components/checkout/CheckoutFormSchema";
import { createOrder, processPayment } from "@/components/checkout/PaymentProcessor";
import { sendOrderNotification } from "@/components/checkout/EmailNotification";

const Checkout = () => {
  const { cartItems, subtotal, clearCart, totalItems } = useCart();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliverySpeed, setDeliverySpeed] = useState<"standard" | "express" | "scheduled">("standard");
  
  // Calculate delivery fee based on item count and delivery speed
  const deliveryFee = calculateDeliveryFee(totalItems, deliverySpeed);
  
  const handleCheckout = async (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    // Generate order number
    const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    
    // Calculate total amount in pesewas (Ghana Cedis × 100)
    const totalAmount = (parseFloat(subtotal.replace(/[^\d.]/g, "")) + deliveryFee);
    
    // Prepare checkout details for email notification
    const checkoutDetails = {
      orderNumber,
      customerInfo: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        city: values.city,
        postalCode: values.postalCode,
      },
      recipientInfo: values.deliveryType === "other" ? {
        firstName: values.recipientFirstName,
        lastName: values.recipientLastName,
        phone: values.recipientPhone,
      } : undefined,
      items: cartItems,
      total: subtotal,
      deliveryFee,
      paymentMethod: values.paymentMethod,
      paymentType: values.paymentType,
      deliveryType: values.deliveryType,
    };

    // Send email notification in the background
    sendOrderNotification(checkoutDetails);
    
    // Check if payment type is online or on delivery
    if (values.paymentType === "online") {
      // Store order information in local storage before redirecting
      const order = createOrder(
        orderNumber,
        cartItems,
        subtotal,
        deliveryFee,
        values,
        values.deliveryType
      );
      
      // Get all orders to pass to the payment processor
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      
      // Process the payment
      processPayment(
        values.email,
        orderNumber,
        totalAmount,
        `${values.firstName} ${values.lastName}`,
        orders,
        (reference, orderNum) => {
          clearCart();
          setIsSubmitting(false);
          navigate(`/order-success/${orderNum}`);
        },
        () => {
          setIsSubmitting(false);
        },
        showLoading,
        hideLoading
      );
    } else {
      // For pay on delivery, create the order with pending payment status
      const order = {
        id: orderNumber,
        date: new Date().toISOString(),
        items: cartItems,
        total: (parseFloat(subtotal.replace(/[^\d.]/g, "")) + deliveryFee).toFixed(2),
        shipping: {
          firstName: values.deliveryType === "self" ? values.firstName : values.recipientFirstName,
          lastName: values.deliveryType === "self" ? values.lastName : values.recipientLastName,
          address: values.address,
          city: values.city,
          postalCode: values.postalCode,
          phone: values.deliveryType === "self" ? values.phone : values.recipientPhone || values.phone,
        },
        status: "processing",
        paymentStatus: "pending",
        paymentMethod: "cashOnDelivery",
        estimatedDelivery: calculateEstimatedDelivery(deliverySpeed),
      };
      
      // Save the order to local storage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
      
      // Clear cart and navigate to success page
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success/${orderNumber}`);
    }
  };
  
  // Calculate estimated delivery date based on delivery speed
  const calculateEstimatedDelivery = (speed: "standard" | "express" | "scheduled") => {
    const date = new Date();
    
    if (speed === "express") {
      // Next business day
      date.setDate(date.getDate() + 1);
    } else if (speed === "standard") {
      // 3-5 business days
      date.setDate(date.getDate() + 3);
    } else {
      // Scheduled (default to 5 days if no specific date)
      date.setDate(date.getDate() + 5);
    }
    
    return date.toISOString();
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <Home size={20} />
            Home
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm 
              onSubmit={handleCheckout}
              isSubmitting={isSubmitting}
              deliverySpeed={deliverySpeed}
              setDeliverySpeed={setDeliverySpeed}
            />
          </div>
          
          {/* Order Summary Component */}
          <div className="lg:col-span-1">
            <OrderSummary 
              cartItems={cartItems}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              totalItems={totalItems}
              deliverySpeed={deliverySpeed}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
