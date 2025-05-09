
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

type DeliveryInfoFormProps = {
  form: any;
  deliveryType: "self" | "other";
  setDeliveryType: (type: "self" | "other") => void;
};

const DeliveryInfoForm = ({ form, deliveryType, setDeliveryType }: DeliveryInfoFormProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
      
      {/* Delivery Type Selection */}
      <FormField
        control={form.control}
        name="deliveryType"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                checked={field.value === "other"}
                onCheckedChange={(checked) => {
                  field.onChange(checked ? "other" : "self");
                  setDeliveryType(checked ? "other" : "self");
                }}
                id="delivery-type"
              />
              <FormLabel htmlFor="delivery-type" className="cursor-pointer">
                Deliver to someone else
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      
      {/* Self Delivery Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{deliveryType === "self" ? "First Name" : "Your First Name"}</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{deliveryType === "self" ? "Last Name" : "Your Last Name"}</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{deliveryType === "self" ? "Phone" : "Your Phone"}</FormLabel>
                <FormControl>
                  <Input placeholder="+233 XX XXX XXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      
      {/* Alternative Recipient Fields */}
      {deliveryType === "other" && (
        <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
          <h3 className="text-lg font-semibold text-secondary mb-3">Recipient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="recipientFirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipientLastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <FormField
              control={form.control}
              name="recipientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+233 XX XXX XXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      )}
      
      {/* Common Address Fields */}
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
        <h3 className="text-lg font-semibold text-secondary mb-3">Delivery Address</h3>
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Accra" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="00233" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="deliveryNote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Instructions (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Add any special instructions for delivery..." 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DeliveryInfoForm;
