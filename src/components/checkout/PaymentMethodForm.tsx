
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";

type PaymentMethodFormProps = {
  form: any;
  paymentMethod: "card" | "mobileMoney";
};

const PaymentMethodForm = ({ form, paymentMethod }: PaymentMethodFormProps) => {
  return (
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
      
      {paymentMethod === "card" && (
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
      
      {paymentMethod === "mobileMoney" && (
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
  );
};

export default PaymentMethodForm;
