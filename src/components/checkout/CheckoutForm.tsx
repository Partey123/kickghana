
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import DeliveryInfoForm from "@/components/checkout/DeliveryInfoForm";
import { checkoutSchema, CheckoutFormValues, defaultFormValues } from "./CheckoutFormSchema";

type CheckoutFormProps = {
  onSubmit: (values: CheckoutFormValues) => void;
  isSubmitting: boolean;
};

const CheckoutForm = ({ onSubmit, isSubmitting }: CheckoutFormProps) => {
  const [deliveryType, setDeliveryType] = useState<"self" | "other">("self");
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: defaultFormValues,
  });
  
  // Watch delivery type to update state
  const selectedDeliveryType = form.watch("deliveryType");
  
  // Update the state when form values change
  useEffect(() => {
    setDeliveryType(selectedDeliveryType);
  }, [selectedDeliveryType]);
  
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-md text-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Delivery Information Component */}
          <DeliveryInfoForm 
            form={form} 
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
          />
          
          <div className="border-t pt-6 border-white/20">
            <h2 className="text-xl font-bold mb-4">Delivery & Payment Options</h2>
            <p className="mb-6">
              Your order will be delivered via standard shipping (3-5 business days) and payment will be
              processed securely through Paystack.
            </p>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Proceed to Payment"}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
