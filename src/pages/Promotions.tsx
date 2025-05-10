
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { promotions } from "@/data/promotions";
import { Button } from "@/components/ui/button";
import { Gift, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const Promotions = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const handleAddBundleToCart = (promo: any) => {
    // Add first product from the promotion as a sample
    if (promo.products.length > 0) {
      const product = promo.products[0];
      addToCart({
        id: 1000 + promo.id,
        name: `${promo.title} (Bundle)`,
        price: promo.bundlePrice,
        image: product.image || promo.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        quantity: 1
      });
      
      toast({
        title: "Bundle added to cart",
        description: `${promo.title} has been added to your cart`,
      });
    } else {
      toast({
        title: "Cannot add to cart",
        description: "This promotion doesn't have any products yet",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-36 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-3">Current Promotions</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out our special offers and bundles to save big on your favorite products!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotions.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                <img 
                  src={promo.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff"} 
                  alt={promo.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
                <div className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  Save {promo.savings}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Gift className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-1">{promo.title}</h2>
                    <p className="text-sm text-muted-foreground">{promo.event} • {promo.date}</p>
                  </div>
                </div>
                
                <p className="text-sm mb-4 line-clamp-3">{promo.description}</p>
                
                {promo.products.length > 0 && (
                  <div className="mb-5">
                    <h3 className="text-sm font-semibold mb-2">Products in this bundle:</h3>
                    <ul className="text-sm space-y-1">
                      {promo.products.slice(0, 3).map((product, i) => (
                        <li key={i} className="line-clamp-1">• {product.name} - {product.price}</li>
                      ))}
                      {promo.products.length > 3 && (
                        <li className="text-muted-foreground">+ {promo.products.length - 3} more items</li>
                      )}
                    </ul>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <div className="text-sm text-muted-foreground">Bundle price:</div>
                    <div className="font-bold text-lg text-primary">{promo.bundlePrice}</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => navigate(`/promotions/${promo.id}`)}
                    >
                      View Details
                    </Button>
                    
                    <Button 
                      onClick={() => handleAddBundleToCart(promo)}
                    >
                      <ShoppingBag size={16} className="mr-2" /> Add Bundle
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Promotions;
