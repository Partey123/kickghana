
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
  adminWebhookUrl?: string,
  customerWebhookUrl?: string
) => {
  // Get webhook URLs from localStorage or use provided ones
  const zapierAdminWebhookUrl = adminWebhookUrl || localStorage.getItem("zapier_admin_webhook_url") || "";
  const zapierCustomerWebhookUrl = customerWebhookUrl || localStorage.getItem("zapier_customer_webhook_url") || "";
  
  // Prepare admin email data (detailed order info for you)
  const adminEmailData = {
    type: "admin_notification",
    subject: `🛒 New Order #${checkoutDetails.orderNumber} - SneakerHub`,
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
    adminEmail: "poundsghst@gmail.com",
  };

  // Prepare customer email data (confirmation for customer)
  const customerEmailData = {
    type: "customer_notification",
    subject: `Order Confirmation #${checkoutDetails.orderNumber} - SneakerHub`,
    orderNumber: checkoutDetails.orderNumber,
    timestamp: new Date().toISOString(),
    customerName: `${checkoutDetails.customerInfo.firstName} ${checkoutDetails.customerInfo.lastName}`,
    customerEmail: checkoutDetails.customerInfo.email,
    orderTotal: (parseFloat(checkoutDetails.total.replace(/[^\d.]/g, "")) + checkoutDetails.deliveryFee).toFixed(2),
    itemCount: checkoutDetails.items.reduce((sum, item) => sum + item.quantity, 0),
    paymentStatus: checkoutDetails.paymentType === "onDelivery" ? "Pay on Delivery" : "Processing Payment",
    deliveryAddress: `${checkoutDetails.customerInfo.address}, ${checkoutDetails.customerInfo.city}, ${checkoutDetails.customerInfo.postalCode}`,
    websiteUrl: window.location.origin,
    supportEmail: "support@sneakerhub.com",
  };

  // Send admin notification
  if (zapierAdminWebhookUrl) {
    try {
      console.log("Sending admin notification to Zapier:", adminEmailData);
      
      await fetch(zapierAdminWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(adminEmailData),
      });

      console.log("Admin notification sent successfully to Zapier");
      
    } catch (error) {
      console.error("Error sending admin notification:", error);
    }
  } else {
    console.log("No admin Zapier webhook URL configured - skipping admin notification");
  }

  // Send customer notification
  if (zapierCustomerWebhookUrl) {
    try {
      console.log("Sending customer notification to Zapier:", customerEmailData);
      
      await fetch(zapierCustomerWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(customerEmailData),
      });

      console.log("Customer notification sent successfully to Zapier");
      
    } catch (error) {
      console.error("Error sending customer notification:", error);
    }
  } else {
    console.log("No customer Zapier webhook URL configured - skipping customer notification");
  }
};
