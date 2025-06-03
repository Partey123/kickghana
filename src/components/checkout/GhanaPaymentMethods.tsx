
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Phone, CreditCard, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface GhanaPaymentMethodsProps {
  onSelect: (method: string, details?: any) => void;
}

export function GhanaPaymentMethods({ onSelect }: GhanaPaymentMethodsProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("momo");
  const [momoProvider, setMomoProvider] = useState<string>("mtn");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    onSelect(value, { provider: value === "momo" ? momoProvider : null, phoneNumber });
  };
  
  const handleMomoProviderChange = (value: string) => {
    setMomoProvider(value);
    onSelect("momo", { provider: value, phoneNumber });
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (paymentMethod === "momo") {
      onSelect("momo", { provider: momoProvider, phoneNumber: value });
    }
  };
  
  return (
    <div className="space-y-6">
      <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange}>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="momo" id="momo" />
            <Label htmlFor="momo" className="flex items-center gap-2">
              <Phone size={18} />
              Mobile Money
            </Label>
          </div>
          
          {paymentMethod === "momo" && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="ml-6 p-3 border rounded-md bg-accent/10"
            >
              <RadioGroup value={momoProvider} onValueChange={handleMomoProviderChange} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mtn" id="mtn" />
                  <Label htmlFor="mtn" className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-400"></div>
                    MTN Mobile Money
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vodafone" id="vodafone" />
                  <Label htmlFor="vodafone" className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-600"></div>
                    Vodafone Cash
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="airteltigo" id="airteltigo" />
                  <Label htmlFor="airteltigo" className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                    AirtelTigo Money
                  </Label>
                </div>
                
                <div className="mt-3">
                  <Label htmlFor="phone-number">Mobile Number</Label>
                  <Input 
                    id="phone-number"
                    type="tel"
                    placeholder="0XX XXX XXXX"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter the phone number linked to your Mobile Money account
                  </p>
                </div>
              </RadioGroup>
            </motion.div>
          )}
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center gap-2">
              <CreditCard size={18} />
              Credit/Debit Card
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="flex items-center gap-2">
              <DollarSign size={18} />
              Cash on Delivery
            </Label>
          </div>
        </div>
      </RadioGroup>
      
      {paymentMethod === "cod" && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-md bg-accent/10 p-3"
        >
          <p className="text-sm">
            <strong>Note:</strong> Cash on delivery is available in select areas within Ghana. 
            Payment will be collected at the time of delivery.
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default GhanaPaymentMethods;
