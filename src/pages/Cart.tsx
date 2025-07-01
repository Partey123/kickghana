import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const [isRemoving, setIsRemoving] = useState<number | string | null>(null);
  const navigate = useNavigate();

  const handleRemoveItem = async (id: number | string) => {
    setIsRemoving(id);
    setTimeout(() => {
      removeFromCart(id);
      setIsRemoving(null);
    }, 300);
  };

  const handleUpdateQuantity = (id: number | string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  const calculateItemTotal = (price: string, quantity: number) => {
    const numericPrice = parseFloat(price.replace(/[^\d.]/g, ""));
    return (numericPrice * quantity).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background/80">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag size={80} className="mx-auto text-gray-400 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some items to your cart to get started</p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate("/home")}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Home size={20} />
                Home
              </Button>
              <Button 
                onClick={() => navigate("/collections")}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Shop Now
              </Button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/80">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/collections")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate("/home")}
            className="flex items-center gap-2"
          >
            <Home size={20} />
            Home
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <motion.div
                  key={`${item.id}-${item.color}-${item.size}`}
                  layout
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ 
                    opacity: isRemoving === item.id ? 0 : 1,
                    scale: isRemoving === item.id ? 0.9 : 1 
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white/95 backdrop-blur-sm shadow-md">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                          
                          <div className="flex gap-2 mb-3">
                            {item.color && (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                {item.color}
                              </Badge>
                            )}
                            {item.size && (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                Size {item.size}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus size={14} />
                              </Button>
                              <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                GHS {calculateItemTotal(item.price, item.quantity)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {item.price} each
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="bg-white/95 backdrop-blur-sm shadow-md sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({totalItems})</span>
                    <span>{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>Total</span>
                      <span>{subtotal}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3"
                >
                  Proceed to Checkout
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/collections")}
                  className="w-full mt-3"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
