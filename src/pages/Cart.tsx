
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const navigate = useNavigate();
  
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background/80">
        <Navbar cartItemsCount={0} />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="bg-white/90 rounded-xl p-12 shadow-md">
            <ShoppingBag size={64} className="mx-auto text-primary mb-4" />
            <h1 className="text-3xl font-bold text-secondary mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Button 
              onClick={() => navigate("/home")}
              className="bg-primary text-secondary px-8 py-6 rounded-full text-lg"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/80">
      <Navbar cartItemsCount={totalItems} />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 rounded-xl p-6 shadow-md">
              <div className="hidden md:grid md:grid-cols-12 gap-4 border-b pb-4 text-sm font-medium text-gray-500">
                <div className="md:col-span-6">Product</div>
                <div className="md:col-span-2 text-center">Price</div>
                <div className="md:col-span-2 text-center">Quantity</div>
                <div className="md:col-span-2 text-center">Total</div>
              </div>
              
              <div className="space-y-4 mt-4">
                {cartItems.map((item, index) => {
                  const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ""));
                  const totalPrice = priceValue * item.quantity;
                  
                  return (
                    <motion.div 
                      key={`${item.id}-${item.color}-${item.size}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 border-b"
                    >
                      {/* Product */}
                      <div className="md:col-span-6 flex gap-3">
                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h3 className="font-medium text-secondary">{item.name}</h3>
                          {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                          {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 text-sm flex items-center mt-1 md:hidden"
                          >
                            <Trash2 size={14} className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:col-span-2 flex md:justify-center items-center">
                        <span className="text-sm md:text-base font-medium">{item.price}</span>
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 flex md:justify-center items-center">
                        <div className="flex items-center border border-gray-200 rounded">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)} 
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100" 
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="font-medium md:hidden">Total:</span>
                        <span className="font-medium text-primary">₵{totalPrice.toFixed(2)}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hidden md:flex items-center ml-4"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4 text-secondary">Order Summary</h2>
              
              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">₵30.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">₵0.00</span>
                </div>
              </div>
              
              <div className="flex justify-between py-4">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold text-primary">
                  ₵{(parseFloat(subtotal.replace(/[^\d.]/g, "")) + 30).toFixed(2)}
                </span>
              </div>
              
              <Button 
                onClick={() => navigate("/checkout")}
                className="w-full bg-primary text-secondary hover:bg-primary/90 flex items-center justify-center gap-2 py-6"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Button>
              
              <button 
                onClick={() => navigate("/home")}
                className="w-full mt-4 text-secondary hover:text-primary flex items-center justify-center"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
