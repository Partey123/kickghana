
import { Truck, Package } from "lucide-react";
import { CartItem } from "@/contexts/CartContext";

type OrderSummaryProps = {
  cartItems: CartItem[];
  subtotal: string;
  deliveryFee: number;
  totalItems: number;
  deliverySpeed: "standard" | "express" | "scheduled";
};

const OrderSummary = ({ cartItems, subtotal, deliveryFee, totalItems, deliverySpeed }: OrderSummaryProps) => {
  return (
    <div className="bg-white/90 rounded-xl p-6 shadow-md sticky top-24">
      <h2 className="text-xl font-bold mb-4 text-secondary">Order Summary</h2>
      
      <div className="space-y-4 mb-4 max-h-80 overflow-y-auto pr-2">
        {cartItems.map((item) => {
          const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ""));
          const totalPrice = priceValue * item.quantity;
          
          return (
            <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3 py-2 border-b">
              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-secondary text-sm">{item.name}</h3>
                {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                  <span className="font-medium text-sm">₵{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="space-y-3 border-b pb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee:</span>
          <span className="font-medium">₵{deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax:</span>
          <span className="font-medium">₵0.00</span>
        </div>
      </div>
      
      <div className="flex justify-between py-4">
        <span className="text-lg font-bold">Total:</span>
        <span className="text-lg font-bold text-primary">
          ₵{(parseFloat(subtotal.replace(/[^\d.]/g, "")) + deliveryFee).toFixed(2)}
        </span>
      </div>
      
      <div className="mt-4 p-3 bg-accent rounded-lg">
        <h3 className="font-semibold text-sm mb-1">Delivery Information</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center">
            {deliverySpeed === "standard" ? (
              <><Truck className="h-3 w-3 mr-1 text-gray-600" />
              <span className="font-medium">Standard Delivery (Selected)</span></>
            ) : (
              <><Truck className="h-3 w-3 mr-1" />
              <span>Standard: 2-3 business days</span></>
            )}
          </div>
          <div className="flex items-center">
            {deliverySpeed === "express" ? (
              <><Package className="h-3 w-3 mr-1 text-primary" />
              <span className="font-medium">Express Delivery (Selected)</span></>
            ) : (
              <><Package className="h-3 w-3 mr-1" />
              <span>Express: Next business day (+₵20)</span></>
            )}
          </div>
          <div className="flex items-center">
            {deliverySpeed === "scheduled" ? (
              <><Package className="h-3 w-3 mr-1 text-secondary" />
              <span className="font-medium">Scheduled Delivery (Selected)</span></>
            ) : (
              <><Package className="h-3 w-3 mr-1" />
              <span>Scheduled: Choose your day (+₵10)</span></>
            )}
          </div>
          {totalItems >= 20 && (
            <div className="font-semibold text-primary mt-2">
              You qualify for FREE delivery!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
