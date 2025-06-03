
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Zap } from "lucide-react";

const ZapierSettings = () => {
  const [webhookUrl, setWebhookUrl] = useState(
    localStorage.getItem("zapier_webhook_url") || ""
  );
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);

  const handleSaveWebhook = () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a valid Zapier webhook URL",
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

    setIsTestingWebhook(true);
    console.log("Testing Zapier webhook:", webhookUrl);

    try {
      const testData = {
        test: true,
        subject: "Test Order Email - SneakerHub",
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
        title: "Test Sent",
        description: "Test webhook sent successfully. Check your Zapier history and email to confirm it was received.",
      });
    } catch (error) {
      console.error("Error testing webhook:", error);
      toast({
        title: "Error",
        description: "Failed to send test webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Zapier Email Integration
        </CardTitle>
        <CardDescription>
          Configure Zapier to send order notifications to your email (poundsghst@gmail.com)
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
            Enter your Zapier webhook URL here. This will receive order notifications.
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSaveWebhook} className="flex-1">
            Save Webhook URL
          </Button>
          <Button
            variant="outline"
            onClick={handleTestWebhook}
            disabled={isTestingWebhook}
            className="flex-1"
          >
            {isTestingWebhook ? "Testing..." : "Test Webhook"}
          </Button>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Setup Instructions:</h4>
          <ol className="text-sm space-y-2 list-decimal list-inside">
            <li>Go to <a href="https://zapier.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">Zapier.com <ExternalLink className="h-3 w-3" /></a> and create an account</li>
            <li>Create a new Zap with "Webhooks by Zapier" as the trigger</li>
            <li>Choose "Catch Hook" as the trigger event</li>
            <li>Copy the webhook URL and paste it above</li>
            <li>Set up Gmail as the action to send emails to poundsghst@gmail.com</li>
            <li>Use the webhook data to format your email template</li>
            <li>Test the webhook using the button above</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZapierSettings;
