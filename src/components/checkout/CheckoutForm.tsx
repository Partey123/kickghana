
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import DeliveryInfoForm from "@/components/checkout/DeliveryInfoForm";
import DeliveryOptions from "@/components/checkout/DeliveryOptions";
import PaymentMethodForm from "@/components/checkout/PaymentMethodForm";
import { checkoutSchema, CheckoutFormValues, defaultFormValues } from "./CheckoutFormSchema";

type CheckoutFormProps = {
  onSubmit: (values: CheckoutFormValues) => void;
  isSubmitting: boolean;
  deliverySpeed: "standard" | "express" | "scheduled";
  setDeliverySpeed: (speed: "standard" | "express" | "scheduled") => void;
};

const CheckoutForm = ({ onSubmit, isSubmitting, deliverySpeed, setDeliverySpeed }: CheckoutFormProps) => {
  const [deliveryType, setDeliveryType] = useState<"self" | "other">("self");
  const [paymentType, setPaymentType] = useState<"online" | "onDelivery">("online");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobileMoney" | "cashOnDelivery">("card");
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      ...defaultFormValues,
      deliverySpeed: deliverySpeed
    },
  });
  
  // Watch changes
  const selectedDeliveryType = form.watch("deliveryType");
  const selectedPaymentMethod = form.watch("paymentMethod");
  const selectedPaymentType = form.watch("paymentType");
  
  // Update states when form values change
  useEffect(() => {
    setDeliveryType(selectedDeliveryType);
  }, [selectedDeliveryType]);
  
  useEffect(() => {
    setPaymentMethod(selectedPaymentMethod);
  }, [selectedPaymentMethod]);
  
  useEffect(() => {
    setPaymentType(selectedPaymentType);
  }, [selectedPaymentType]);
  
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
          
          {/* Delivery Options */}
          <DeliveryOptions
            form={form}
            deliverySpeed={deliverySpeed}
            setDeliverySpeed={setDeliverySpeed}
          />
          
          {/* Payment Method Form */}
          <PaymentMethodForm
            form={form}
            paymentMethod={paymentMethod}
            paymentType={paymentType}
            setPaymentType={setPaymentType}
          />
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : 
                paymentType === "online" ? "Proceed to Payment" : "Complete Order"}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
