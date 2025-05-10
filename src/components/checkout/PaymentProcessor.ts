
import { toast } from "@/components/ui/use-toast";
import { initializePayment } from "@/utils/paystack";

// Function to handle Paystack payment processing
export const processPayment = (
  email: string,
  orderNumber: string, 
  totalAmount: number,
  customerName: string,
  orders: any[],
  onSuccess: (reference: string, orderNumber: string) => void,
  onCancel: () => void
) => {
  // First check if Paystack script is already loaded
  if (!window.PaystackPop) {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    
    script.onload = () => {
      // Once loaded, initialize payment
      initializePaystackPayment();
    };
    
    script.onerror = () => {
      toast({
        title: "Payment Error",
        description: "Failed to load payment system. Please try again.",
        variant: "destructive",
      });
      onCancel();
    };
    
    document.body.appendChild(script);
  } else {
    // If already loaded, initialize payment directly
    initializePaystackPayment();
  }
  
  function initializePaystackPayment() {
    // Convert amount to pesewas (smallest currency unit for Ghana)
    // Multiply by 100 to convert from cedis to pesewas
    const amountInPesewas = Math.round(totalAmount * 100);
    
    // Initialize Paystack payment
    initializePayment({
      email,
      amount: amountInPesewas, // Amount in pesewas
      metadata: {
        order_id: orderNumber,
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: customerName,
          },
        ],
      },
      callback_url: `${window.location.origin}/order-success/${orderNumber}`,
      onSuccess: (reference) => {
        // Update the order with payment reference
        const updatedOrders = orders.map((o: any) => {
          if (o.id === orderNumber) {
            return { ...o, status: "processing", payment_reference: reference };
          }
          return o;
        });
        
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        
        toast({
          title: "Payment successful",
          description: `Your order #${orderNumber} has been placed successfully.`,
        });
        
        onSuccess(reference, orderNumber);
      },
      onCancel: () => {
        toast({
          title: "Payment cancelled",
          description: "Your payment was cancelled. Please try again.",
          variant: "destructive",
        });
        onCancel();
      },
    });
  }
};

// Function to create an order in localStorage
export const createOrder = (
  orderNumber: string,
  cartItems: any[],
  subtotal: string,
  deliveryFee: number,
  values: any,
  deliveryType: "self" | "other"
) => {
  const order = {
    id: orderNumber,
    date: new Date().toISOString(),
    items: cartItems,
    total: (parseFloat(subtotal.replace(/[^\d.]/g, "")) + deliveryFee).toFixed(2),
    shipping: {
      firstName: deliveryType === "self" ? values.firstName : values.recipientFirstName,
      lastName: deliveryType === "self" ? values.lastName : values.recipientLastName,
      address: values.address,
      city: values.city,
      postalCode: values.postalCode,
      phone: deliveryType === "self" ? values.phone : values.recipientPhone,
    },
    status: "pending",
    estimatedDelivery: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    payment_reference: "", // Will be updated after payment
  };
  
  const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
  localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));
  
  return order;
};
