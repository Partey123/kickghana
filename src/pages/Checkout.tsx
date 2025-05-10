
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
import { initializePayment } from "@/utils/paystack";

// Import the refactored components
import DeliveryInfoForm from "@/components/checkout/DeliveryInfoForm";
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
  recipientFirstName: z.string().optional(),
  recipientLastName: z.string().optional(),
  recipientPhone: z.string().optional(),
  
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
  
  // Delivery type - simplified to only standard delivery
  deliverySpeed: z.enum(["standard"]),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { cartItems, subtotal, clearCart, totalItems } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryType, setDeliveryType] = useState<"self" | "other">("self");
  const [deliverySpeed] = useState<"standard">("standard");
  
  // Calculate delivery fee based on item count and delivery speed
  const deliveryFee = calculateDeliveryFee(totalItems, deliverySpeed);
  
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
    },
  });
  
  // Watch delivery type to update state
  const selectedDeliveryType = form.watch("deliveryType");
  
  // Update the state when form values change
  useEffect(() => {
    setDeliveryType(selectedDeliveryType);
  }, [selectedDeliveryType]);
  
  const handleCheckout = (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    // Generate order number
    const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
    
    // Calculate total amount in pesewas (Ghana Cedis × 100)
    const totalAmount = (parseFloat(subtotal.replace(/[^\d.]/g, "")) + deliveryFee) * 100;
    
    // Store order information in local storage before redirecting
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
        phone: values.deliveryType === "self" ? values.phone : values.recipientPhone,
      },
      status: "pending",
      estimatedDelivery: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      payment_reference: "", // Will be updated after payment
    };
    
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));
    
    // Initialize Paystack payment
    initializePayment({
      email: values.email,
      amount: Math.floor(totalAmount), // Remove decimal places
      metadata: {
        order_id: orderNumber,
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: `${values.firstName} ${values.lastName}`,
          },
        ],
      },
      callback_url: `${window.location.origin}/order-success/${orderNumber}`,
      onSuccess: (reference) => {
        // Update the order with payment reference
        const orders = JSON.parse(localStorage.getItem("orders") || "[]");
        const updatedOrders = orders.map((o: any) => {
          if (o.id === orderNumber) {
            return { ...o, status: "processing", payment_reference: reference };
          }
          return o;
        });
        
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        
        // Clear cart and navigate to success page
        clearCart();
        setIsSubmitting(false);
        
        toast({
          title: "Payment successful",
          description: `Your order #${orderNumber} has been placed successfully.`,
        });
        
        navigate(`/order-success/${orderNumber}`);
      },
      onCancel: () => {
        setIsSubmitting(false);
        
        toast({
          title: "Payment cancelled",
          description: "Your payment was cancelled. Please try again.",
          variant: "destructive",
        });
      },
    });
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
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md text-white">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-6">
                  {/* Delivery Information Component */}
                  <DeliveryInfoForm 
                    form={form} 
                    deliveryType={deliveryType}
                    setDeliveryType={setDeliveryType}
                  />
                  
                  <div className="border-t pt-6 border-white/20">
                    <h2 className="text-xl font-bold mb-4">Delivery & Payment Options</h2>
                    <p className="mb-6">
                      Your order will be delivered via standard shipping (3-5 business days) and payment will be
                      processed securely through Paystack.
                    </p>
                  </div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Proceed to Payment"}
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
