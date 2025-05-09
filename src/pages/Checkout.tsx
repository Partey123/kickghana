
import { useState, useEffect } from "react";
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
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { CreditCard, WalletCards, Phone, Truck, Package } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

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
  const [deliveryType, setDeliveryType] = useState<"self" | "other">("self");
  const [deliverySpeed, setDeliverySpeed] = useState<"standard" | "express" | "scheduled">("standard");
  
  // Calculate delivery fee based on item count
  const calculateDeliveryFee = () => {
    const itemCount = totalItems;
    
    let baseFee = 0;
    if (itemCount >= 20) {
      baseFee = 0; // Free for 20+ items
    } else if (itemCount >= 10) {
      baseFee = 100; // 100 cedis for 10+ items
    } else if (itemCount >= 4) {
      baseFee = 80; // 80 cedis for 4-8 items
    } else if (itemCount >= 1) {
      baseFee = 40; // 40 cedis for 1-3 items
    }
    
    // Add additional fee based on delivery speed
    let speedFee = 0;
    if (deliverySpeed === "express") {
      speedFee = 20; // +20 cedis for express
    } else if (deliverySpeed === "scheduled") {
      speedFee = 10; // +10 cedis for scheduled
    }
    
    return baseFee + speedFee;
  };
  
  const deliveryFee = calculateDeliveryFee();
  
  // Update delivery fee when cart items or delivery speed changes
  useEffect(() => {
    calculateDeliveryFee();
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
  
  // Watch payment method to conditionally render fields
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
                  <div>
                    <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
                    
                    {/* Delivery Type Selection */}
                    <FormField
                      control={form.control}
                      name="deliveryType"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center space-x-2 mb-4">
                            <Switch
                              checked={field.value === "other"}
                              onCheckedChange={(checked) => 
                                field.onChange(checked ? "other" : "self")
                              }
                              id="delivery-type"
                            />
                            <FormLabel htmlFor="delivery-type" className="cursor-pointer">
                              Deliver to someone else
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    {/* Self Delivery Fields */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{deliveryType === "self" ? "First Name" : "Your First Name"}</FormLabel>
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
                              <FormLabel>{deliveryType === "self" ? "Last Name" : "Your Last Name"}</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              <FormLabel>{deliveryType === "self" ? "Phone" : "Your Phone"}</FormLabel>
                              <FormControl>
                                <Input placeholder="+233 XX XXX XXXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Alternative Recipient Fields */}
                    {deliveryType === "other" && (
                      <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                        <h3 className="text-lg font-semibold text-secondary mb-3">Recipient Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="recipientFirstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Recipient First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Jane" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="recipientLastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Recipient Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Smith" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div>
                          <FormField
                            control={form.control}
                            name="recipientPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Recipient Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="+233 XX XXX XXXX" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Common Address Fields */}
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                      <h3 className="text-lg font-semibold text-secondary mb-3">Delivery Address</h3>
                      
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      
                      <FormField
                        control={form.control}
                        name="deliveryNote"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Instructions (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Add any special instructions for delivery..." 
                                className="resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Delivery Speed Selection */}
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                      <h3 className="text-lg font-semibold text-secondary mb-3">Delivery Options</h3>
                      
                      <FormField
                        control={form.control}
                        name="deliverySpeed"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-3"
                              >
                                <Card className={`cursor-pointer border ${field.value === 'standard' ? 'border-primary bg-muted/20' : 'border-gray-200'}`}>
                                  <CardHeader className="flex flex-row items-start space-x-3 p-4">
                                    <div className="flex items-center h-5">
                                      <RadioGroupItem value="standard" id="standard" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center">
                                        <Truck className="mr-2 h-4 w-4 text-secondary" />
                                        <CardTitle className="text-base">Standard Delivery</CardTitle>
                                      </div>
                                      <CardDescription>Delivery within 2-3 days</CardDescription>
                                    </div>
                                  </CardHeader>
                                </Card>
                                
                                <Card className={`cursor-pointer border ${field.value === 'express' ? 'border-primary bg-muted/20' : 'border-gray-200'}`}>
                                  <CardHeader className="flex flex-row items-start space-x-3 p-4">
                                    <div className="flex items-center h-5">
                                      <RadioGroupItem value="express" id="express" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center">
                                        <Package className="mr-2 h-4 w-4 text-primary" />
                                        <CardTitle className="text-base">Express Delivery</CardTitle>
                                      </div>
                                      <CardDescription>Next day delivery (+₵20.00)</CardDescription>
                                    </div>
                                  </CardHeader>
                                </Card>
                                
                                <Card className={`cursor-pointer border ${field.value === 'scheduled' ? 'border-primary bg-muted/20' : 'border-gray-200'}`}>
                                  <CardHeader className="flex flex-row items-start space-x-3 p-4">
                                    <div className="flex items-center h-5">
                                      <RadioGroupItem value="scheduled" id="scheduled" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center">
                                        <Package className="mr-2 h-4 w-4 text-secondary" />
                                        <CardTitle className="text-base">Scheduled Delivery</CardTitle>
                                      </div>
                                      <CardDescription>Choose your delivery date (+₵10.00)</CardDescription>
                                    </div>
                                  </CardHeader>
                                </Card>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Scheduled Delivery Date Field */}
                      {deliverySpeed === "scheduled" && (
                        <FormField
                          control={form.control}
                          name="deliveryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Choose Delivery Date</FormLabel>
                              <FormControl>
                                <Input 
                                  type="date" 
                                  {...field}
                                  min={new Date().toISOString().split('T')[0]}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                    
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              <Card className={`cursor-pointer border ${field.value === 'card' ? 'border-primary bg-muted/20' : 'border-gray-200'}`}>
                                <CardHeader className="flex flex-row items-start space-x-3 p-4">
                                  <div className="flex items-center h-5">
                                    <RadioGroupItem value="card" id="card" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center">
                                      <CreditCard className="mr-2 h-4 w-4 text-secondary" />
                                      <CardTitle className="text-base">Credit/Debit Card</CardTitle>
                                    </div>
                                    <CardDescription>Pay securely with your card</CardDescription>
                                  </div>
                                </CardHeader>
                              </Card>
                              
                              <Card className={`cursor-pointer border ${field.value === 'mobileMoney' ? 'border-primary bg-muted/20' : 'border-gray-200'}`}>
                                <CardHeader className="flex flex-row items-start space-x-3 p-4">
                                  <div className="flex items-center h-5">
                                    <RadioGroupItem value="mobileMoney" id="mobileMoney" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center">
                                      <Phone className="mr-2 h-4 w-4 text-secondary" />
                                      <CardTitle className="text-base">Mobile Money</CardTitle>
                                    </div>
                                    <CardDescription>Pay with MTN, Vodafone, or AirtelTigo</CardDescription>
                                  </div>
                                </CardHeader>
                              </Card>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {selectedPaymentMethod === "card" && (
                      <div className="mt-4 space-y-4 bg-gray-50 p-5 rounded-lg">
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
                                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                >
                                  <Card className={`cursor-pointer border ${field.value === 'mtn' ? 'border-primary' : 'border-gray-200'}`}>
                                    <CardHeader className="flex flex-row items-start space-x-3 p-4 bg-[#FFCC00]/10">
                                      <RadioGroupItem value="mtn" id="mtn" />
                                      <CardTitle className="text-sm font-medium text-[#004f9f]">
                                        MTN Mobile Money
                                      </CardTitle>
                                    </CardHeader>
                                  </Card>
                                  
                                  <Card className={`cursor-pointer border ${field.value === 'vodafone' ? 'border-primary' : 'border-gray-200'}`}>
                                    <CardHeader className="flex flex-row items-start space-x-3 p-4 bg-[#e60000]/10">
                                      <RadioGroupItem value="vodafone" id="vodafone" />
                                      <CardTitle className="text-sm font-medium text-[#e60000]">
                                        Vodafone Cash
                                      </CardTitle>
                                    </CardHeader>
                                  </Card>
                                  
                                  <Card className={`cursor-pointer border ${field.value === 'airtelTigo' ? 'border-primary' : 'border-gray-200'}`}>
                                    <CardHeader className="flex flex-row items-start space-x-3 p-4 bg-[#0066b3]/10">
                                      <RadioGroupItem value="airtelTigo" id="airtelTigo" />
                                      <CardTitle className="text-sm font-medium text-[#0066b3]">
                                        AirtelTigo Money
                                      </CardTitle>
                                    </CardHeader>
                                  </Card>
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
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 rounded-xl p-6 shadow-md sticky top-24">
              <h2 className="text-xl font-bold mb-4 text-secondary">Order Summary</h2>
              
              <div className="space-y-4 mb-4 max-h-80 overflow-y-auto pr-2">
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
                  <span className="font-medium">₵{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">₵0.00</span>
                </div>
              </div>
              
              <div className="flex justify-between py-4">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold text-primary">
                  ₵{(parseFloat(subtotal.replace(/[^\d.]/g, "")) + deliveryFee).toFixed(2)}
                </span>
              </div>
              
              <div className="mt-4 p-3 bg-accent rounded-lg">
                <h3 className="font-semibold text-sm mb-1">Delivery Information</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <Truck className="h-3 w-3 mr-1" />
                    <span>Standard: 2-3 business days</span>
                  </li>
                  <li className="flex items-center">
                    <Package className="h-3 w-3 mr-1" />
                    <span>Express: Next business day (+₵20)</span>
                  </li>
                  <li className="flex items-center">
                    <Package className="h-3 w-3 mr-1" />
                    <span>Scheduled: Choose your day (+₵10)</span>
                  </li>
                  {totalItems >= 20 && (
                    <li className="font-semibold text-primary mt-2">
                      You qualify for FREE delivery!
                    </li>
                  )}
                </ul>
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
