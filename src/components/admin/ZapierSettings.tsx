
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Mail } from "lucide-react";

const ZapierSettings = () => {
  const [webhookUrl, setWebhookUrl] = useState(
    localStorage.getItem("zapier_webhook_url") || ""
  );
  const [isTesting, setIsTesting] = useState(false);

  const handleSaveWebhook = () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("zapier_webhook_url", webhookUrl);
    
    toast({
      title: "Success",
      description: "Zapier webhook URL saved successfully",
    });
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your Zapier webhook URL first",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    console.log("Testing Zapier webhook:", webhookUrl);

    try {
      const testData = {
        orderNumber: "TEST-123456",
        timestamp: new Date().toISOString(),
        customerName: "John Doe",
        customerEmail: "john.doe@example.com",
        customerPhone: "+233 123 456 789",
        customerAddress: "123 Test Street, Accra, 12345",
        recipientName: null,
        recipientPhone: null,
        items: [
          {
            name: "Air Jordan 1 Retro",
            quantity: 1,
            price: "₵250",
            color: "Red/Black",
            size: "42",
          },
          {
            name: "Nike Air Max 90",
            quantity: 2,
            price: "₵180",
            color: "White/Blue",
            size: "41",
          },
        ],
        subtotal: "₵610",
        deliveryFee: 15,
        totalAmount: "625.00",
        paymentMethod: "card",
        paymentType: "online",
        paymentStatus: "Processing Payment",
        deliveryType: "Self Delivery",
        websiteUrl: window.location.origin,
        itemCount: 3,
        testOrder: true,
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(testData),
      });

      toast({
        title: "Test Sent Successfully",
        description: "Test order data sent to Zapier. Check your Zap's history to confirm it was received.",
      });
    } catch (error) {
      console.error("Error testing webhook:", error);
      toast({
        title: "Error",
        description: "Failed to send test webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Webhook Configuration */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Order Notifications
          </CardTitle>
          <CardDescription>
            Configure Zapier to receive detailed order information when customers place orders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Zapier Webhook URL</Label>
            <Input
              id="webhook-url"
              type="url"
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              This webhook will receive comprehensive order details including customer info, items, payment details, and delivery information
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleTestWebhook}
            disabled={isTesting}
            className="w-full"
          >
            {isTesting ? "Testing Webhook..." : "Test Webhook"}
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button onClick={handleSaveWebhook} className="w-full max-w-2xl">
          Save Webhook URL
        </Button>
      </div>

      {/* Setup Instructions */}
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
              <h4 className="font-medium mb-2">How to Set Up Your Zap:</h4>
              <ol className="text-sm space-y-2 list-decimal list-inside">
                <li>Go to Zapier and create a new Zap</li>
                <li>Choose "Webhooks by Zapier" as your trigger</li>
                <li>Select "Catch Hook" as the trigger event</li>
                <li>Copy the webhook URL and paste it above</li>
                <li>Choose your action (Email, Slack, Google Sheets, etc.)</li>
                <li>Map the webhook data to your action fields</li>
                <li>Test your Zap to make sure it works</li>
              </ol>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm">
                <strong>Available Data Fields:</strong> orderNumber, customerName, customerEmail, customerPhone, customerAddress, items, subtotal, deliveryFee, totalAmount, paymentMethod, paymentStatus, deliveryType, itemCount, and more.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZapierSettings;
