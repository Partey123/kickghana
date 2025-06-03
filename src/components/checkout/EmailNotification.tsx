
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

export const sendOrderNotification = async (
  checkoutDetails: CheckoutDetails,
  webhookUrl?: string
) => {
  // Get webhook URL from localStorage or use provided one
  const zapierWebhookUrl = webhookUrl || localStorage.getItem("zapier_webhook_url") || "";
  
  if (!zapierWebhookUrl) {
    console.log("No Zapier webhook URL configured - skipping email notification");
    return;
  }

  const emailData = {
    subject: `New Order #${checkoutDetails.orderNumber} - SneakerHub`,
    orderNumber: checkoutDetails.orderNumber,
    timestamp: new Date().toISOString(),
    customer: {
      name: `${checkoutDetails.customerInfo.firstName} ${checkoutDetails.customerInfo.lastName}`,
      email: checkoutDetails.customerInfo.email,
      phone: checkoutDetails.customerInfo.phone,
      address: `${checkoutDetails.customerInfo.address}, ${checkoutDetails.customerInfo.city}, ${checkoutDetails.customerInfo.postalCode}`,
    },
    recipient: checkoutDetails.deliveryType === "other" && checkoutDetails.recipientInfo ? {
      name: `${checkoutDetails.recipientInfo.firstName} ${checkoutDetails.recipientInfo.lastName}`,
      phone: checkoutDetails.recipientInfo.phone,
    } : null,
    orderDetails: {
      items: checkoutDetails.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        color: item.color || "N/A",
        size: item.size || "N/A",
      })),
      subtotal: checkoutDetails.total,
      deliveryFee: checkoutDetails.deliveryFee,
      total: (parseFloat(checkoutDetails.total.replace(/[^\d.]/g, "")) + checkoutDetails.deliveryFee).toFixed(2),
    },
    paymentInfo: {
      method: checkoutDetails.paymentMethod,
      type: checkoutDetails.paymentType,
      status: checkoutDetails.paymentType === "onDelivery" ? "Pending (Pay on Delivery)" : "Processing",
    },
    deliveryType: checkoutDetails.deliveryType === "self" ? "Self Delivery" : "Deliver to Someone Else",
    websiteUrl: window.location.origin,
  };

  try {
    console.log("Sending order notification to Zapier:", emailData);
    
    await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors", // Handle CORS issues
      body: JSON.stringify(emailData),
    });

    console.log("Order notification sent successfully to Zapier");
    
  } catch (error) {
    console.error("Error sending order notification:", error);
    // Don't show error to user as this is a background process
  }
};
