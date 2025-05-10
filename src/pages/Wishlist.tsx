
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { useCart } from "@/contexts/CartContext";
import { featuredSneakers } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, addToWishlist, addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  
  useEffect(() => {
    // Get wishlist items from featured sneakers
    const items = wishlist
      .map(id => featuredSneakers.find(sneaker => sneaker.id === id))
      .filter(item => item !== undefined);
      
    setWishlistItems(items as any[]);
  }, [wishlist]);
  
  const handleRemoveFromWishlist = (id: number) => {
    addToWishlist(id);
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist",
    });
  };
  
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };
  
  return (
    <div className="min-h-screen bg-background/80">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-8 text-center">My Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Heart size={32} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Add items to your wishlist to save them for later</p>
            <Button variant="default" asChild className="mt-2">
              <Link to="/collections">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform group-hover:scale-105 duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full bg-white/80 text-gray-600"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-medium text-base mb-1 hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{item.price}</span>
                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingBag size={14} className="mr-1" /> Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;

// Import Heart icon
import { Heart } from "lucide-react";
