
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

// Hot deals data
const hotDeals = [
  {
    id: 1,
    name: "Nike Air Max 270",
    originalPrice: "GHS 800",
    salePrice: "GHS 600",
    discount: "25% OFF",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Running",
    description: "Premium running shoes with Air Max technology"
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    originalPrice: "GHS 750",
    salePrice: "GHS 525",
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1556048219-bb6978360b84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Lifestyle",
    description: "Boost technology for ultimate comfort"
  },
  {
    id: 3,
    name: "Puma RS-X",
    originalPrice: "GHS 650",
    salePrice: "GHS 455",
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Casual",
    description: "Retro-inspired sneakers with modern comfort"
  },
  {
    id: 4,
    name: "Jordan Air 1 Mid",
    originalPrice: "GHS 900",
    salePrice: "GHS 720",
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Basketball",
    description: "Classic basketball shoes with premium materials"
  },
  {
    id: 5,
    name: "New Balance 990v5",
    originalPrice: "GHS 700",
    salePrice: "GHS 490",
    discount: "30% OFF",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Running",
    description: "Made in USA with premium suede and mesh"
  }
];

const HotDealsSlider = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % hotDeals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  const handleAddToCart = (deal: typeof hotDeals[0]) => {
    addToCart({
      id: deal.id,
      name: deal.name,
      price: deal.salePrice,
      image: deal.image,
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${deal.name} has been added to your cart`,
    });
  };

  const handleViewProduct = (dealId: number) => {
    navigate(`/product/${dealId}`);
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <span className="text-red-600 text-sm font-medium uppercase tracking-wider">🔥 Limited Time</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-secondary">Hot Deals</h2>
            <p className="text-muted-foreground mt-2">Don't miss out on these amazing offers!</p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0 border-red-200 text-red-600 hover:bg-red-50"
            onClick={() => navigate("/collections")}
          >
            View All Deals <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent>
            {hotDeals.map((deal) => (
              <CarouselItem key={deal.id} className="md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                    <img 
                      src={deal.image} 
                      alt={deal.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white font-bold px-3 py-1">
                        {deal.discount}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-700">
                        {deal.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-secondary">{deal.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{deal.description}</p>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-bold text-2xl text-red-600">{deal.salePrice}</span>
                      <span className="text-sm text-muted-foreground line-through">{deal.originalPrice}</span>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleViewProduct(deal.id)}
                      >
                        View Details
                      </Button>
                      
                      <Button 
                        onClick={() => handleAddToCart(deal)}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                      >
                        <ShoppingBag size={16} className="mr-2" /> Add to Cart
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="absolute -left-4 top-1/2" />
            <CarouselNext className="absolute -right-4 top-1/2" />
          </div>
        </Carousel>
        
        {/* Slide indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {hotDeals.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-8 rounded-full transition-colors ${
                index === currentSlide ? 'bg-red-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotDealsSlider;
