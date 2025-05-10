
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { promotions } from "@/data/promotions";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PromoSlider = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const handleViewPromo = (id: number) => {
    navigate(`/promotions/${id}`);
  };
  
  const handleAddToCart = (promoId: number) => {
    const promo = promotions.find(p => p.id === promoId);
    if (!promo) return;
    
    // Add first product from promotion as a sample
    if (promo.products.length > 0) {
      const product = promo.products[0];
      addToCart({
        id: 1000 + promoId, // Use a unique ID for promo products
        name: product.name,
        price: product.price,
        image: product.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        quantity: 1
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
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
    <section className="py-12 px-4 md:px-8 bg-accent/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Special Offers</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-secondary">Current Promotions</h2>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0"
            onClick={() => navigate("/promotions")}
          >
            View All Promotions
          </Button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent>
            {promotions.map((promo) => (
              <CarouselItem key={promo.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-background rounded-lg overflow-hidden shadow-md h-full">
                  <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                    <img 
                      src={promo.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff"} 
                      alt={promo.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      Save {promo.savings}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">{promo.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{promo.event} • {promo.date}</p>
                    <p className="text-sm line-clamp-2 mb-4">{promo.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-primary">{promo.bundlePrice}</span>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewPromo(promo.id)}
                        >
                          View
                        </Button>
                        
                        <Button 
                          size="sm"
                          onClick={() => handleAddToCart(promo.id)}
                        >
                          <ShoppingBag size={16} className="mr-1" /> Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8">
            <CarouselPrevious className="absolute -left-4 top-1/3" />
            <CarouselNext className="absolute -right-4 top-1/3" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default PromoSlider;
