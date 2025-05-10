
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { useCart } from "@/contexts/CartContext";
import { useLoading } from "@/contexts/LoadingContext";
import OrderSummary from "@/components/checkout/OrderSummary";
import { calculateDeliveryFee } from "@/components/checkout/DeliveryFeeCalculator";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { CheckoutFormValues } from "@/components/checkout/CheckoutFormSchema";
import { createOrder, processPayment } from "@/components/checkout/PaymentProcessor";

const Checkout = () => {
  const { cartItems, subtotal, clearCart, totalItems } = useCart();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliverySpeed, setDeliverySpeed] = useState<"standard" | "express" | "scheduled">("standard");
  
  // Calculate delivery fee based on item count and delivery speed
  const deliveryFee = calculateDeliveryFee(totalItems, deliverySpeed);
  
  const handleCheckout = (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    // Generate order number
    const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    
    // Calculate total amount in pesewas (Ghana Cedis × 100)
    const totalAmount = (parseFloat(subtotal.replace(/[^\d.]/g, "")) + deliveryFee);
    
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
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-background/80">
      <Navbar cartItemsCount={totalItems} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Checkout</h1>
        
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
