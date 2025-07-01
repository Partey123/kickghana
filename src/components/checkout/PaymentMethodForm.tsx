
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Phone, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";

type PaymentMethodFormProps = {
  form: any;
  paymentMethod: "card" | "mobileMoney" | "cashOnDelivery";
  paymentType: "online" | "onDelivery";
  setPaymentType: (type: "online" | "onDelivery") => void;
};

const PaymentMethodForm = ({ form, paymentMethod, paymentType, setPaymentType }: PaymentMethodFormProps) => {
  return (
    <div className="border-t pt-6 border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Payment Method</h2>
      
      <div className="mb-6">
        <FormField
          control={form.control}
          name="paymentType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-gray-900 font-medium">Payment Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setPaymentType(value as "online" | "onDelivery");
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  <Card className={`cursor-pointer border ${field.value === 'online' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <CardHeader className="flex flex-row items-start space-x-3 p-4">
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="online" id="online" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4 text-primary" />
                          <CardTitle className="text-base text-gray-900">Pay Now</CardTitle>
                        </div>
                        <CardDescription className="text-gray-600">Pay securely online now</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                  
                  <Card className={`cursor-pointer border ${field.value === 'onDelivery' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <CardHeader className="flex flex-row items-start space-x-3 p-4">
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="onDelivery" id="onDelivery" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-primary" />
                          <CardTitle className="text-base text-gray-900">Pay on Delivery</CardTitle>
                        </div>
                        <CardDescription className="text-gray-600">Pay when your order arrives</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      {paymentType === "online" && (
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-gray-900 font-medium">Online Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  <Card className={`cursor-pointer border ${field.value === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <CardHeader className="flex flex-row items-start space-x-3 p-4">
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="card" id="card" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4 text-primary" />
                          <CardTitle className="text-base text-gray-900">Credit/Debit Card</CardTitle>
                        </div>
                        <CardDescription className="text-gray-600">Pay securely with your card</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                  
                  <Card className={`cursor-pointer border ${field.value === 'mobileMoney' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <CardHeader className="flex flex-row items-start space-x-3 p-4">
                      <div className="flex items-center h-5">
                        <RadioGroupItem value="mobileMoney" id="mobileMoney" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-primary" />
                          <CardTitle className="text-base text-gray-900">Mobile Money</CardTitle>
                        </div>
                        <CardDescription className="text-gray-600">Pay with MTN, Vodafone, or AirtelTigo</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      {paymentType === "online" && paymentMethod === "card" && (
        <div className="mt-4 space-y-4 bg-gray-50 p-5 rounded-lg">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-900">Card Number</FormLabel>
                <FormControl>
                  <Input placeholder="XXXX XXXX XXXX XXXX" {...field} className="text-gray-900" />
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
                <FormLabel className="text-gray-900">Cardholder Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} className="text-gray-900" />
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
                  <FormLabel className="text-gray-900">Expiry Date</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} className="text-gray-900" />
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
                  <FormLabel className="text-gray-900">CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} className="text-gray-900" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      )}
      
      {paymentType === "online" && paymentMethod === "mobileMoney" && (
        <div className="mt-4 space-y-4">
          <FormField
            control={form.control}
            name="mobileNetwork"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-gray-900 font-medium">Mobile Network</FormLabel>
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
                <FormLabel className="text-gray-900 font-medium">Mobile Money Number</FormLabel>
                <FormControl>
                  <Input placeholder="0XX XXX XXXX" {...field} className="text-gray-900" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      
      {paymentType === "onDelivery" && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center mb-3">
            <DollarSign className="h-5 w-5 mr-2 text-amber-600" />
            <span className="font-medium text-gray-900">Pay on Delivery Details</span>
          </div>
          <p className="text-sm text-gray-700 mb-4">
            You'll pay for your order when it arrives at your delivery location. Please ensure someone is available to receive the package and make payment.
          </p>
          <div className="text-sm text-gray-700">
            <div className="flex items-center mb-1">
              <span className="font-medium mr-2">Payment options:</span> 
              <span>Cash, Mobile Money</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Delivery time:</span> 
              <span>Same as standard shipping</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodForm;
