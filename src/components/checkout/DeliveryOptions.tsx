
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck } from "lucide-react";
import { useEffect } from "react";

type DeliveryOptionsProps = {
  form: any;
  deliverySpeed: "standard" | "express" | "scheduled";
  setDeliverySpeed: (speed: "standard" | "express" | "scheduled") => void;
};

const DeliveryOptions = ({ form, deliverySpeed, setDeliverySpeed }: DeliveryOptionsProps) => {
  // Watch for changes in delivery speed and update parent component
  useEffect(() => {
    const subscription = form.watch((value: any) => {
      if (value.deliverySpeed && value.deliverySpeed !== deliverySpeed) {
        setDeliverySpeed(value.deliverySpeed);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, deliverySpeed, setDeliverySpeed]);

  return (
    <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
      <h3 className="text-lg font-semibold text-secondary mb-3">Delivery Options</h3>
      
      <FormField
        control={form.control}
        name="deliverySpeed"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  setDeliverySpeed(value as "standard" | "express" | "scheduled");
                }}
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
  );
};

export default DeliveryOptions;
