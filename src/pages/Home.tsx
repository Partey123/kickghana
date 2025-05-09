
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Heart, ShoppingCart, Search } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  
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

  const goToProductDetail = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Searching",
      description: `Searching for "${searchTerm}"`,
    });
    setShowSearchModal(false);
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
                  <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 to-amber-800/70 z-10"></div>
                  <div className="absolute z-20 text-white max-w-xl p-10 top-1/2 transform -translate-y-1/2">
                    <h1 className="text-4xl md:text-6xl font-black mb-4">Step into Ghanaian Excellence</h1>
                    <p className="text-lg md:text-xl mb-6">Premium footwear with authentic Ghanaian style and quality craftsmanship.</p>
                    <Button 
                      className="bg-amber-500 hover:bg-amber-600 text-red-900 font-bold"
                      onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Shop Now
                    </Button>
                  </div>
                  <div className="absolute right-0 bottom-0 w-1/2 h-full">
                    <motion.img 
                      src="/hero-sneaker.png" 
                      alt="Premium Sneakers" 
                      className="absolute bottom-0 right-5 md:right-10 w-auto h-4/5 object-contain"
                      initial={{ rotate: 12, y: 20 }}
                      animate={{ 
                        rotate: [12, 15, 12],
                        y: [20, 10, 20]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-green-800/50 z-10"></div>
                  <div className="absolute z-20 text-white max-w-xl p-10 top-1/2 transform -translate-y-1/2">
                    <h1 className="text-4xl md:text-6xl font-black mb-4">New Collection Arrived</h1>
                    <p className="text-lg md:text-xl mb-6">Limited edition sneakers inspired by Ghana's rich culture.</p>
                    <Button 
                      className="bg-green-600 hover:bg-green-700 text-amber-100 font-bold"
                      onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Explore Collection
                    </Button>
                  </div>
                  <div className="absolute right-0 bottom-0 w-1/2 h-full">
                    <motion.div
                      className="absolute bottom-0 right-5 md:right-10 w-auto h-4/5 flex items-end"
                      initial={{ y: 0 }}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="text-9xl">👟</span>
                      <span className="text-8xl ml-4 mb-6">👞</span>
                      <span className="text-7xl ml-4 mb-12">🥾</span>
                    </motion.div>
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
      <section id="categories" className="py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-red-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <motion.div 
                key={category.id} 
                className="bg-gradient-to-b from-red-900/5 to-amber-200/30 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
                whileHover={{ y: -5 }}
              >
                <div className="aspect-square relative overflow-hidden rounded-md bg-white flex items-center justify-center">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="w-full p-4">
                      <a href="#" className="block w-full text-center text-white font-semibold hover:underline">
                        View All
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="mt-2 text-center font-semibold text-amber-900">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section id="featured-products" className="py-10 px-4 md:px-8 bg-gradient-to-b from-amber-100 to-amber-50/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-red-900">Featured Products</h2>
            <a href="#" className="text-amber-800 hover:text-red-800 font-medium hover:underline">
              View All
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSneakers.map((sneaker) => (
              <motion.div
                key={sneaker.id}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0">
                  <div className="bg-gradient-to-b from-amber-50 to-amber-100 p-6 relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToWishlist(sneaker.id);
                      }}
                      className="absolute top-2 right-2 p-2 rounded-full bg-white/70 hover:bg-white transition-colors z-10"
                    >
                      <Heart 
                        size={18} 
                        className={wishlist.includes(sneaker.id) ? "fill-red-600 text-red-600" : "text-gray-500"} 
                      />
                    </button>
                    <div 
                      className="aspect-square flex items-center justify-center overflow-hidden cursor-pointer"
                      onClick={() => goToProductDetail(sneaker.id)} 
                    >
                      <motion.img 
                        src={sneaker.image} 
                        alt={sneaker.name} 
                        className="h-full w-auto object-contain"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <span className="text-xs font-medium text-red-700 bg-amber-100 px-2 py-1 rounded">
                        {sneaker.category}
                      </span>
                    </div>
                    <h3 
                      className="font-semibold text-lg text-gray-800 cursor-pointer hover:text-red-800"
                      onClick={() => goToProductDetail(sneaker.id)}
                    >
                      {sneaker.name}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-lg text-red-900">{sneaker.price}</span>
                      <Button 
                        size="sm" 
                        onClick={() => addToCart(sneaker.id)}
                        className="bg-red-800 hover:bg-red-900 text-amber-100"
                      >
                        <ShoppingCart size={16} className="mr-1" /> Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-800 via-red-700 to-amber-600">
            {/* Enhanced milk splatter overlays */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white blur-xl"></div>
              <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-white blur-xl"></div>
              <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-white blur-lg"></div>
              <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-white blur-xl"></div>
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
                <motion.img 
                  src="/sneakers-group.png" 
                  alt="Sneaker Collection" 
                  className="max-w-full h-auto"
                  initial={{ rotate: 6 }}
                  animate={{ 
                    rotate: [6, 8, 6],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
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
              <li><a href="#" className="nav-link text-amber-200 hover:text-amber-400">All Products</a></li>
              <li><a href="#" className="nav-link text-amber-200 hover:text-amber-400">New Arrivals</a></li>
              <li><a href="#" className="nav-link text-amber-200 hover:text-amber-400">Sales</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="nav-link text-amber-200 hover:text-amber-400">FAQ</a></li>
              <li><a href="#" className="nav-link text-amber-200 hover:text-amber-400">Shipping</a></li>
              <li><a href="#" className="nav-link text-amber-200 hover:text-amber-400">Returns</a></li>
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
      
      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Search Products</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500"
                onClick={() => setShowSearchModal(false)}
              >
                &times;
              </Button>
            </div>
            
            <form onSubmit={handleSearch}>
              <div className="flex">
                <input
                  type="search"
                  placeholder="Search for sneakers..."
                  className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" className="rounded-l-none bg-amber-500 hover:bg-amber-600">
                  <Search size={18} />
                </Button>
              </div>
            </form>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Popular searches</h4>
              <div className="flex flex-wrap gap-2">
                {["Running", "Basketball", "Casual", "Limited Edition"].map((term, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm"
                    className="text-xs"
                    onClick={() => setSearchTerm(term)}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;
