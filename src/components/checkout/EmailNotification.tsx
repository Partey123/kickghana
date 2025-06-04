
import { toast } from "@/components/ui/use-toast";

interface CheckoutDetails {
  orderNumber: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: any[];
  total: string;
  deliveryFee: number;
  paymentMethod: string;
  paymentType: string;
  deliveryType: string;
  recipientInfo?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}

export const sendOrderNotification = async (checkoutDetails: CheckoutDetails) => {
  // Store order data for admin dashboard instead of sending to Zapier
  const orderData = {
    id: checkoutDetails.orderNumber,
    orderNumber: checkoutDetails.orderNumber,
    timestamp: new Date().toISOString(),
    
    // Customer Information
    customerName: `${checkoutDetails.customerInfo.firstName} ${checkoutDetails.customerInfo.lastName}`,
    customerEmail: checkoutDetails.customerInfo.email,
    customerPhone: checkoutDetails.customerInfo.phone,
    customerAddress: `${checkoutDetails.customerInfo.address}, ${checkoutDetails.customerInfo.city}, ${checkoutDetails.customerInfo.postalCode}`,
    
    // Recipient Information (if different from customer)
    recipientName: checkoutDetails.deliveryType === "other" && checkoutDetails.recipientInfo 
      ? `${checkoutDetails.recipientInfo.firstName} ${checkoutDetails.recipientInfo.lastName}`
      : null,
    recipientPhone: checkoutDetails.recipientInfo?.phone || null,
    
    // Order Details
    items: checkoutDetails.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      color: item.color || "N/A",
      size: item.size || "N/A",
    })),
    
    // Financial Information
    subtotal: checkoutDetails.total,
    deliveryFee: checkoutDetails.deliveryFee,
    totalAmount: (parseFloat(checkoutDetails.total.replace(/[^\d.]/g, "")) + checkoutDetails.deliveryFee).toFixed(2),
    
    // Payment Information
    paymentMethod: checkoutDetails.paymentMethod,
    paymentType: checkoutDetails.paymentType,
    paymentStatus: checkoutDetails.paymentType === "onDelivery" ? "Pay on Delivery" : "Processing Payment",
    
    // Delivery Information
    deliveryType: checkoutDetails.deliveryType === "self" ? "Self Delivery" : "Deliver to Someone Else",
    
    // Additional Info
    websiteUrl: window.location.origin,
    itemCount: checkoutDetails.items.reduce((sum, item) => sum + item.quantity, 0),
    status: "processing"
  };

  try {
    // Store in localStorage for admin dashboard
    const existingOrders = JSON.parse(localStorage.getItem("admin_orders") || "[]");
    existingOrders.unshift(orderData); // Add to beginning of array
    localStorage.setItem("admin_orders", JSON.stringify(existingOrders));
    
    console.log("Order data stored for admin dashboard:", orderData);
    
    // Optional: Show toast notification for admin (if admin is logged in)
    toast({
      title: "New Order Received",
      description: `Order #${checkoutDetails.orderNumber} has been added to the dashboard`,
    });
    
  } catch (error) {
    console.error("Error storing order data:", error);
  }
};
