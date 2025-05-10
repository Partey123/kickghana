
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { promotions } from "@/data/promotions";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, Gift, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const PromotionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [promotion, setPromotion] = useState<any>(null);
  
  useEffect(() => {
    const promoId = parseInt(id || "0", 10);
    const foundPromo = promotions.find(p => p.id === promoId);
    
    if (foundPromo) {
      setPromotion(foundPromo);
    } else {
      navigate("/promotions");
      toast({
        title: "Promotion not found",
        description: "The promotion you're looking for doesn't exist.",
        variant: "destructive"
      });
    }
  }, [id, navigate]);
  
  const handleAddProductToCart = (product: any) => {
    addToCart({
      id: 3000 + Math.floor(Math.random() * 1000), // Generate random ID for promo products
      name: product.name,
      price: product.price,
      image: product.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  const handleAddBundleToCart = () => {
    if (!promotion) return;
    
    addToCart({
      id: 1000 + promotion.id,
      name: `${promotion.title} (Bundle)`,
      price: promotion.bundlePrice,
      image: promotion.products[0]?.image || promotion.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      quantity: 1
    });
    
    toast({
      title: "Bundle added to cart",
      description: `${promotion.title} has been added to your cart`,
    });
  };
  
  if (!promotion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading promotion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-36 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Image */}
            <div className="md:w-1/2">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
                <img 
                  src={promotion.image || promotion.products[0]?.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff"} 
                  alt={promotion.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full">
                  Save {promotion.savings}
                </div>
              </div>
            </div>
            
            {/* Right Column - Details */}
            <div className="md:w-1/2">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {promotion.event}
                </span>
                <span className="text-muted-foreground text-sm">{promotion.date}</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-3">{promotion.title}</h1>
              <p className="text-muted-foreground mb-6">{promotion.description}</p>
              
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Bundle Price</p>
                    <p className="text-2xl font-bold text-primary">{promotion.bundlePrice}</p>
                  </div>
                  <div className="bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm font-medium">
                    Save {promotion.savings}
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full mb-4"
                size="lg" 
                onClick={handleAddBundleToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Add Bundle to Cart
              </Button>
              
              <div className="bg-muted/40 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-2 flex items-center">
                  <Gift className="mr-2 h-4 w-4 text-primary" /> Significance
                </h3>
                <p className="text-sm">{promotion.significance}</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-10" />
          
          {/* Bundle Products */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Bundle Products</h2>
            
            {promotion.products.length === 0 ? (
              <p>No products available in this bundle yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {promotion.products.map((product: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <img 
                        src={product.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff"} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium mb-1">{product.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                      
                      <div className="mb-3">
                        {product.colors.length > 0 && (
                          <div className="flex items-center gap-1 mb-2">
                            <span className="text-xs text-muted-foreground">Colors:</span>
                            <span className="text-xs">{product.colors.join(", ")}</span>
                          </div>
                        )}
                        
                        {product.sizes.length > 0 && (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">Sizes:</span>
                            <span className="text-xs">{product.sizes.join(", ")}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">{product.price}</span>
                        <Button 
                          size="sm"
                          onClick={() => handleAddProductToCart(product)}
                        >
                          <ShoppingBag size={14} className="mr-1" /> Add
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-10 text-center">
            <Button variant="outline" onClick={() => navigate("/promotions")}>
              Back to All Promotions
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PromotionDetail;
