
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

const checkoutSchema = z.object({
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
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  postalCode: z.string().min(4, {
    message: "Postal code must be at least 4 digits.",
  }),
  paymentMethod: z.enum(["card", "mobileMoney"]),
  // Card fields - conditional validation based on payment method
  cardNumber: z.string().optional().refine(val => {
    // If payment method is card, validate card number
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
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      paymentMethod: "card",
      cardNumber: "",
      cardName: "",
      cardExpiry: "",
      cardCvv: "",
      mobileNumber: "",
      mobileNetwork: undefined,
    },
  });
  
  // Watch payment method to conditionally render fields
  const selectedPaymentMethod = form.watch("paymentMethod");
  
  const handleCheckout = (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    // Simulate checkout process
    setTimeout(() => {
      // Generate order number
      const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
      
      // Store order in local storage for tracking
      const order = {
        id: orderNumber,
        date: new Date().toISOString(),
        items: cartItems,
        total: (parseFloat(subtotal.replace(/[^\d.]/g, "")) + 30).toFixed(2),
        delivery: {
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
          city: values.city,
          postalCode: values.postalCode,
        },
        paymentMethod: values.paymentMethod,
        status: "processing",
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
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
                  <div>
                    <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+233 XX XXX XXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Accra" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="00233" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                    
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Select Payment Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card" />
                                <FormLabel htmlFor="card" className="font-normal cursor-pointer">
                                  Credit/Debit Card
                                </FormLabel>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="mobileMoney" id="mobileMoney" />
                                <FormLabel htmlFor="mobileMoney" className="font-normal cursor-pointer">
                                  Mobile Money
                                </FormLabel>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {selectedPaymentMethod === "card" && (
                      <div className="mt-4 space-y-4">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input placeholder="XXXX XXXX XXXX XXXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cardholder Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="cardExpiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cardCvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    
                    {selectedPaymentMethod === "mobileMoney" && (
                      <div className="mt-4 space-y-4">
                        <FormField
                          control={form.control}
                          name="mobileNetwork"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Mobile Network</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-wrap gap-4"
                                >
                                  <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                                    <RadioGroupItem value="mtn" id="mtn" />
                                    <FormLabel htmlFor="mtn" className="font-normal cursor-pointer">
                                      MTN Mobile Money
                                    </FormLabel>
                                  </div>
                                  <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                                    <RadioGroupItem value="vodafone" id="vodafone" />
                                    <FormLabel htmlFor="vodafone" className="font-normal cursor-pointer">
                                      Vodafone Cash
                                    </FormLabel>
                                  </div>
                                  <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
                                    <RadioGroupItem value="airtelTigo" id="airtelTigo" />
                                    <FormLabel htmlFor="airtelTigo" className="font-normal cursor-pointer">
                                      AirtelTigo Money
                                    </FormLabel>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="mobileNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile Money Number</FormLabel>
                              <FormControl>
                                <Input placeholder="0XX XXX XXXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-secondary hover:bg-primary/90 py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4 text-secondary">Order Summary</h2>
              
              <div className="space-y-4 mb-4">
                {cartItems.map((item) => {
                  const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ""));
                  const totalPrice = priceValue * item.quantity;
                  
                  return (
                    <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3 py-2 border-b">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-secondary text-sm">{item.name}</h3>
                        {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                        {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                          <span className="font-medium text-sm">₵{totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className="font-medium">₵30.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">₵0.00</span>
                </div>
              </div>
              
              <div className="flex justify-between py-4">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold text-primary">
                  ₵{(parseFloat(subtotal.replace(/[^\d.]/g, "")) + 30).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
