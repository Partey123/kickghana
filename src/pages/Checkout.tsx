
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

// Import the refactored components
import DeliveryInfoForm from "@/components/checkout/DeliveryInfoForm";
import DeliveryOptions from "@/components/checkout/DeliveryOptions";
import PaymentMethodForm from "@/components/checkout/PaymentMethodForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { calculateDeliveryFee } from "@/components/checkout/DeliveryFeeCalculator";

const checkoutSchema = z.object({
  // Recipient type fields
  deliveryType: z.enum(["self", "other"]),
  
  // Self fields
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  
  // Alternative recipient fields (conditional)
  recipientFirstName: z.string().optional().refine(val => {
    if (z.string()._type === "other") {
      return !!val && val.length >= 2;
    }
    return true;
  }, { message: "Recipient first name must be at least 2 characters." }),
  recipientLastName: z.string().optional().refine(val => {
    if (z.string()._type === "other") {
      return !!val && val.length >= 2;
    }
    return true;
  }, { message: "Recipient last name must be at least 2 characters." }),
  recipientPhone: z.string().optional().refine(val => {
    if (z.string()._type === "other") {
      return !!val && val.length >= 10;
    }
    return true;
  }, { message: "Recipient phone must be at least 10 digits." }),
  
  // Common address fields
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  postalCode: z.string().min(4, {
    message: "Postal code must be at least 4 digits.",
  }),
  deliveryNote: z.string().optional(),
  
  // Delivery type
  deliverySpeed: z.enum(["standard", "express", "scheduled"]),
  deliveryDate: z.string().optional().refine(val => {
    if (z.string()._type === "scheduled") {
      return !!val;
    }
    return true;
  }, { message: "Please select a delivery date." }),
  
  // Payment fields
  paymentMethod: z.enum(["card", "mobileMoney"]),
  
  // Card fields - conditional validation based on payment method
  cardNumber: z.string().optional().refine(val => {
    if (z.string()._type === "card") {
      return !!val && val.length >= 16;
    }
    return true;
  }, { message: "Card number must be at least 16 digits." }),
  cardName: z.string().optional().refine(val => {
    if (z.string()._type === "card") {
      return !!val && val.length >= 2;
    }
    return true;
  }, { message: "Card holder name is required." }),
  cardExpiry: z.string().optional().refine(val => {
    if (z.string()._type === "card") {
      return !!val && /^(0[1-9]|1[0-2])\/\d{2}$/.test(val);
    }
    return true;
  }, { message: "Expiry date must be in MM/YY format." }),
  cardCvv: z.string().optional().refine(val => {
    if (z.string()._type === "card") {
      return !!val && val.length === 3;
    }
    return true;
  }, { message: "CVV must be 3 digits." }),
  // Mobile Money fields - conditional validation
  mobileNumber: z.string().optional().refine(val => {
    if (z.string()._type === "mobileMoney") {
      return !!val && val.length >= 10;
    }
    return true;
  }, { message: "Mobile money number must be at least 10 digits." }),
  mobileNetwork: z.enum(["mtn", "vodafone", "airtelTigo"]).optional().refine(val => {
    if (z.string()._type === "mobileMoney") {
      return !!val;
    }
    return true;
  }, { message: "Please select a mobile network." }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { cartItems, subtotal, clearCart, totalItems } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobileMoney">("card");
  const [deliveryType, setDeliveryType] = useState<"self" | "other">("self");
  const [deliverySpeed, setDeliverySpeed] = useState<"standard" | "express" | "scheduled">("standard");
  
  // Calculate delivery fee based on item count and delivery speed
  const deliveryFee = calculateDeliveryFee(totalItems, deliverySpeed);
  
  // Update delivery fee when cart items or delivery speed changes
  useEffect(() => {
    calculateDeliveryFee(totalItems, deliverySpeed);
  }, [totalItems, deliverySpeed]);
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryType: "self",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      recipientFirstName: "",
      recipientLastName: "",
      recipientPhone: "",
      address: "",
      city: "",
      postalCode: "",
      deliveryNote: "",
      deliverySpeed: "standard",
      deliveryDate: "",
      paymentMethod: "card",
      cardNumber: "",
      cardName: "",
      cardExpiry: "",
      cardCvv: "",
      mobileNumber: "",
      mobileNetwork: undefined,
    },
  });
  
  // Watch payment method and delivery type to update state
  const selectedPaymentMethod = form.watch("paymentMethod");
  const selectedDeliveryType = form.watch("deliveryType");
  const selectedDeliverySpeed = form.watch("deliverySpeed");
  
  // Update the state when form values change
  useEffect(() => {
    setPaymentMethod(selectedPaymentMethod);
    setDeliveryType(selectedDeliveryType);
    setDeliverySpeed(selectedDeliverySpeed);
  }, [selectedPaymentMethod, selectedDeliveryType, selectedDeliverySpeed]);
  
  const handleCheckout = (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    // Simulate checkout process
    setTimeout(() => {
      // Generate order number
      const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
      
      // Calculate estimated delivery date based on delivery speed
      let estimatedDelivery = new Date();
      if (values.deliverySpeed === "express") {
        estimatedDelivery.setDate(estimatedDelivery.getDate() + 1); // Next day for express
      } else if (values.deliverySpeed === "scheduled") {
        estimatedDelivery = new Date(values.deliveryDate || "");
      } else {
        estimatedDelivery.setDate(estimatedDelivery.getDate() + 3); // 2-3 days for standard
      }
      
      // Store order in local storage for tracking
      const order = {
        id: orderNumber,
        date: new Date().toISOString(),
        items: cartItems,
        total: (parseFloat(subtotal.replace(/[^\d.]/g, "")) + deliveryFee).toFixed(2),
        delivery: {
          type: values.deliveryType,
          recipient: values.deliveryType === "self" 
            ? {
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
              }
            : {
                firstName: values.recipientFirstName,
                lastName: values.recipientLastName,
                phone: values.recipientPhone,
              },
          address: values.address,
          city: values.city,
          postalCode: values.postalCode,
          note: values.deliveryNote,
          speed: values.deliverySpeed,
          fee: deliveryFee,
        },
        paymentMethod: values.paymentMethod,
        status: "processing",
        estimatedDelivery: estimatedDelivery.toISOString(),
      };
      
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));
      
      // Clear cart and navigate to success page
      clearCart();
      setIsSubmitting(false);
      
      toast({
        title: "Order placed successfully",
        description: `Your order #${orderNumber} has been placed successfully.`,
      });
      
      navigate(`/order-success/${orderNumber}`);
    }, 2000);
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-background/80">
      <Navbar cartItemsCount={totalItems} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 rounded-xl p-6 shadow-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-6">
                  {/* Delivery Information Component */}
                  <DeliveryInfoForm 
                    form={form} 
                    deliveryType={deliveryType}
                    setDeliveryType={setDeliveryType}
                  />
                  
                  {/* Delivery Options Component */}
                  <DeliveryOptions 
                    form={form}
                    deliverySpeed={deliverySpeed} 
                  />
                  
                  {/* Payment Method Component */}
                  <PaymentMethodForm 
                    form={form}
                    paymentMethod={paymentMethod} 
                  />
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-secondary hover:bg-primary/90 py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Place Order"}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </div>
          </div>
          
          {/* Order Summary Component */}
          <div className="lg:col-span-1">
            <OrderSummary 
              cartItems={cartItems}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              totalItems={totalItems}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
