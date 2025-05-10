
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { accessories } from "@/data/promotions";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, Heart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Accessories = () => {
  const navigate = useNavigate();
  const { addToCart, wishlist, addToWishlist, cartItems } = useCart();
  
  // Create a unique ID for accessories for tracking in cart/wishlist
  const getAccessoryId = (name: string, index: number) => {
    return 2000 + index; // Accessories have IDs starting from 2000
  };
  
  const handleAddToCart = (product: any, index: number) => {
    const productId = getAccessoryId(product.name, index);
    
    addToCart({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image || "https://images.unsplash.com/photo-1585241645927-c7a8e5840c42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  const isInWishlist = (id: number) => {
    return wishlist.includes(id);
  };
  
  const isInCart = (id: number) => {
    return cartItems.some(item => item.id === id);
  };
  
  const handleAddToWishlist = (product: any, index: number) => {
    const productId = getAccessoryId(product.name, index);
    addToWishlist(productId);
    
    if (!isInWishlist(productId)) {
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    } else {
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-36 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">Accessories</h1>
        <p className="text-muted-foreground mb-8">Enhance your style with our collection of accessories</p>
        
        {accessories.length === 0 ? (
          <div className="text-center py-20">
            <p>No accessories available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {accessories.map((accessory, i) => {
              const accessoryId = getAccessoryId(accessory.name, i);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden group"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={accessory.image || "https://images.unsplash.com/photo-1585241645927-c7a8e5840c42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
                      alt={accessory.name}
                      className="w-full h-full object-contain transition-transform group-hover:scale-105 duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex flex-col gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-white text-secondary hover:bg-primary hover:text-secondary h-10 w-10"
                          onClick={() => handleAddToWishlist(accessory, i)}
                        >
                          <Heart 
                            size={18} 
                            className={isInWishlist(accessoryId) ? "fill-primary text-primary" : ""} 
                          />
                        </Button>
                        
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-white text-secondary hover:bg-primary hover:text-secondary h-10 w-10"
                          onClick={() => handleAddToCart(accessory, i)}
                          disabled={isInCart(accessoryId)}
                        >
                          <ShoppingBag size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-base mb-1">{accessory.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{accessory.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">{accessory.price}</span>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(accessory, i)}
                        disabled={isInCart(accessoryId)}
                        variant={isInCart(accessoryId) ? "outline" : "default"}
                      >
                        <ShoppingBag size={14} className="mr-1" /> 
                        {isInCart(accessoryId) ? "In Cart" : "Add"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Accessories;
