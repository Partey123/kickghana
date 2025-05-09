
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock data for featured sneakers
const featuredSneakers = [
  {
    id: 1,
    name: "Air Max Elevate",
    price: "₵850",
    image: "/sneaker1.png",
    category: "Running"
  },
  {
    id: 2,
    name: "Flex Stride Pro",
    price: "₵720",
    image: "/sneaker2.png",
    category: "Casual"
  },
  {
    id: 3,
    name: "Court Vision Elite",
    price: "₵650",
    image: "/sneaker3.png",
    category: "Basketball"
  },
  {
    id: 4,
    name: "React Infinity",
    price: "₵920",
    image: "/sneaker4.png",
    category: "Running"
  }
];

// Mock data for categories
const categories = [
  { id: 1, name: "Running", image: "/category-running.png" },
  { id: 2, name: "Basketball", image: "/category-basketball.png" },
  { id: 3, name: "Casual", image: "/category-casual.png" },
  { id: 4, name: "Training", image: "/category-training.png" }
];

const Home = () => {
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  
  const addToCart = (id: number) => {
    setCartItems([...cartItems, id]);
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
  };
  
  const addToWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist",
      });
    } else {
      setWishlist([...wishlist, id]);
      toast({
        title: "Added to wishlist",
        description: "Item has been added to your wishlist",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Navbar cartItemsCount={cartItems.length} />
      
      {/* Hero Section with Carousel */}
      <section className="relative pt-16 pb-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 to-amber-700/50 z-10"></div>
                  <div className="absolute z-20 text-white max-w-xl p-10 top-1/2 transform -translate-y-1/2">
                    <h1 className="text-4xl md:text-6xl font-black mb-4">Step into Ghanaian Excellence</h1>
                    <p className="text-lg md:text-xl mb-6">Premium footwear with authentic Ghanaian style and quality craftsmanship.</p>
                    <Button className="bg-amber-400 hover:bg-amber-500 text-red-900 font-bold">
                      Shop Now
                    </Button>
                  </div>
                  <div className="absolute right-0 bottom-0 w-1/2 h-full">
                    <img 
                      src="/hero-sneaker.png" 
                      alt="Premium Sneakers" 
                      className="absolute bottom-0 right-5 md:right-10 w-auto h-4/5 object-contain transform rotate-12"
                    />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden bg-gradient-to-r from-green-900 to-green-600">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-amber-600/50 z-10"></div>
                  <div className="absolute z-20 text-white max-w-xl p-10 top-1/2 transform -translate-y-1/2">
                    <h1 className="text-4xl md:text-6xl font-black mb-4">New Collection Arrived</h1>
                    <p className="text-lg md:text-xl mb-6">Limited edition sneakers inspired by Ghana's rich culture.</p>
                    <Button className="bg-amber-400 hover:bg-amber-500 text-green-900 font-bold">
                      Explore Collection
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-red-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              >
                <div className="aspect-square relative overflow-hidden rounded-md bg-white flex items-center justify-center">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-2 text-center font-semibold text-amber-900">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-10 px-4 md:px-8 bg-gradient-to-b from-amber-100 to-amber-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-red-900">Featured Products</h2>
            <Button variant="outline" className="border-amber-600 text-amber-800">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSneakers.map((sneaker) => (
              <Card key={sneaker.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0">
                <div className="bg-gradient-to-b from-amber-50 to-amber-100 p-6 relative">
                  <button 
                    onClick={() => addToWishlist(sneaker.id)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/70 hover:bg-white transition-colors z-10"
                  >
                    <Heart 
                      size={18} 
                      className={wishlist.includes(sneaker.id) ? "fill-red-500 text-red-500" : "text-gray-500"} 
                    />
                  </button>
                  <div className="aspect-square flex items-center justify-center overflow-hidden">
                    <img 
                      src={sneaker.image} 
                      alt={sneaker.name} 
                      className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-3">
                    <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">
                      {sneaker.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">{sneaker.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-lg text-red-900">{sneaker.price}</span>
                    <Button 
                      size="sm" 
                      onClick={() => addToCart(sneaker.id)}
                      className="bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      <ShoppingCart size={16} className="mr-1" /> Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-700 via-amber-700 to-amber-500">
            {/* Milk splatter overlays */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white blur-xl"></div>
              <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-white blur-xl"></div>
            </div>
            
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-white mb-8 md:mb-0">
                <h2 className="text-4xl md:text-5xl font-black mb-4">Join Our Sneaker Community</h2>
                <p className="text-lg mb-6 text-amber-100">Get exclusive access to limited drops, special discounts, and events across Ghana.</p>
                <Button className="bg-white hover:bg-amber-100 text-red-900 font-bold px-8 py-6 text-lg">
                  Sign Up Now
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-end">
                <img 
                  src="/sneakers-group.png" 
                  alt="Sneaker Collection" 
                  className="max-w-full h-auto transform rotate-6"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-red-900 text-amber-200 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4 text-amber-400">KickGhana</h3>
            <p className="mb-4 text-sm text-amber-100">Premium footwear with authentic Ghanaian style and quality craftsmanship.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shopping</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amber-400 transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Sales</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amber-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Phone: +233 20 123 4567</li>
              <li>Email: info@kickghana.com</li>
              <li>Accra Mall, Ghana</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-amber-900/50 text-center text-sm">
          <p>© 2025 KickGhana. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
