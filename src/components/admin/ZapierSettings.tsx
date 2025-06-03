
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Zap, Mail, User } from "lucide-react";

const ZapierSettings = () => {
  const [adminWebhookUrl, setAdminWebhookUrl] = useState(
    localStorage.getItem("zapier_admin_webhook_url") || ""
  );
  const [customerWebhookUrl, setCustomerWebhookUrl] = useState(
    localStorage.getItem("zapier_customer_webhook_url") || ""
  );
  const [isTestingAdmin, setIsTestingAdmin] = useState(false);
  const [isTestingCustomer, setIsTestingCustomer] = useState(false);

  const handleSaveWebhooks = () => {
    if (!adminWebhookUrl && !customerWebhookUrl) {
      toast({
        title: "Error",
        description: "Please enter at least one Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    if (adminWebhookUrl) {
      localStorage.setItem("zapier_admin_webhook_url", adminWebhookUrl);
    }
    if (customerWebhookUrl) {
      localStorage.setItem("zapier_customer_webhook_url", customerWebhookUrl);
    }
    
    toast({
      title: "Success",
      description: "Zapier webhook URLs saved successfully",
    });
  };

  const handleTestAdminWebhook = async () => {
    if (!adminWebhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your admin Zapier webhook URL first",
        variant: "destructive",
      });
      return;
    }

    setIsTestingAdmin(true);
    console.log("Testing admin Zapier webhook:", adminWebhookUrl);

    try {
      const testData = {
        type: "admin_notification",
        test: true,
        subject: "🛒 Test Order #TEST-123456 - SneakerHub",
        orderNumber: "TEST-123456",
        timestamp: new Date().toISOString(),
        customer: {
          name: "Test Customer",
          email: "test@example.com",
          phone: "+233 123 456 789",
          address: "Test Address, Test City, 12345",
        },
        orderDetails: {
          items: [
            {
              name: "Test Sneaker",
              quantity: 1,
              price: "₵100",
              color: "Red",
              size: "42",
            },
          ],
          subtotal: "₵100",
          deliveryFee: 15,
          total: "115.00",
        },
        paymentInfo: {
          method: "card",
          type: "online",
          status: "Processing",
        },
        deliveryType: "Self Delivery",
        websiteUrl: window.location.origin,
        adminEmail: "poundsghst@gmail.com",
      };

      await fetch(adminWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(testData),
      });

      toast({
        title: "Admin Test Sent",
        description: "Test admin notification sent successfully. Check your email at poundsghst@gmail.com",
      });
    } catch (error) {
      console.error("Error testing admin webhook:", error);
      toast({
        title: "Error",
        description: "Failed to send test admin webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsTestingAdmin(false);
    }
  };

  const handleTestCustomerWebhook = async () => {
    if (!customerWebhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your customer Zapier webhook URL first",
        variant: "destructive",
      });
      return;
    }

    setIsTestingCustomer(true);
    console.log("Testing customer Zapier webhook:", customerWebhookUrl);

    try {
      const testData = {
        type: "customer_notification",
        test: true,
        subject: "Order Confirmation #TEST-123456 - SneakerHub",
        orderNumber: "TEST-123456",
        timestamp: new Date().toISOString(),
        customerName: "Test Customer",
        customerEmail: "test@example.com",
        orderTotal: "115.00",
        itemCount: 1,
        paymentStatus: "Processing Payment",
        deliveryAddress: "Test Address, Test City, 12345",
        websiteUrl: window.location.origin,
        supportEmail: "support@sneakerhub.com",
      };

      await fetch(customerWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(testData),
      });

      toast({
        title: "Customer Test Sent",
        description: "Test customer notification sent successfully. Check Zapier history for confirmation.",
      });
    } catch (error) {
      console.error("Error testing customer webhook:", error);
      toast({
        title: "Error",
        description: "Failed to send test customer webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsTestingCustomer(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Webhook Card */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Admin Email Notifications
          </CardTitle>
          <CardDescription>
            Configure Zapier to send order notifications to your admin email (poundsghst@gmail.com)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-webhook-url">Admin Zapier Webhook URL</Label>
            <Input
              id="admin-webhook-url"
              type="url"
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              value={adminWebhookUrl}
              onChange={(e) => setAdminWebhookUrl(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              This webhook will send detailed order information to poundsghst@gmail.com
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleTestAdminWebhook}
            disabled={isTestingAdmin}
            className="w-full"
          >
            {isTestingAdmin ? "Testing Admin Webhook..." : "Test Admin Webhook"}
          </Button>
        </CardContent>
      </Card>

      {/* Customer Webhook Card */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Email Notifications
          </CardTitle>
          <CardDescription>
            Configure Zapier to send order confirmations to customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer-webhook-url">Customer Zapier Webhook URL</Label>
            <Input
              id="customer-webhook-url"
              type="url"
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              value={customerWebhookUrl}
              onChange={(e) => setCustomerWebhookUrl(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              This webhook will send order confirmations to customers' email addresses
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleTestCustomerWebhook}
            disabled={isTestingCustomer}
            className="w-full"
          >
            {isTestingCustomer ? "Testing Customer Webhook..." : "Test Customer Webhook"}
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button onClick={handleSaveWebhooks} className="w-full max-w-2xl">
          Save All Webhook URLs
        </Button>
      </div>

      {/* Instructions */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Setup Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">For Admin Notifications:</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Create a Zap with "Webhooks by Zapier" trigger</li>
                <li>Set Gmail action to send to poundsghst@gmail.com</li>
                <li>Use webhook data for detailed order information</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">For Customer Notifications:</h4>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Create another Zap with "Webhooks by Zapier" trigger</li>
                <li>Set Gmail action to send to {{customerEmail}}</li>
                <li>Use webhook data for order confirmation details</li>
              </ol>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm">
                <strong>Pro Tip:</strong> You can use the provided webhook URL for both admin and customer notifications, or create separate webhooks for better organization.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZapierSettings;
