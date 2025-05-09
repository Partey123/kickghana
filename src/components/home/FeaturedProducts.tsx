
import { useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

// Mock data for featured sneakers
const featuredSneakers = [
  {
    id: 1,
    name: "Air Max Elevate",
    price: "₵850",
    image: "/sneaker1.png",
    category: "Running",
    isNew: true
  },
  {
    id: 2,
    name: "Flex Stride Pro",
    price: "₵720",
    image: "/sneaker2.png",
    category: "Casual",
    isNew: false
  },
  {
    id: 3,
    name: "Court Vision Elite",
    price: "₵650",
    image: "/sneaker3.png",
    category: "Basketball",
    isNew: true
  },
  {
    id: 4,
    name: "React Infinity",
    price: "₵920",
    image: "/sneaker4.png",
    category: "Running",
    isNew: false
  }
];

interface FeaturedProductsProps {
  cartItems: number[];
  setCartItems: React.Dispatch<React.SetStateAction<number[]>>;
  wishlist: number[];
  setWishlist: React.Dispatch<React.SetStateAction<number[]>>;
}

const FeaturedProducts = ({ cartItems, setCartItems, wishlist, setWishlist }: FeaturedProductsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", "Running", "Basketball", "Casual", "Training"];
  
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
  
  const filteredProducts = activeCategory === "All" 
    ? featuredSneakers 
    : featuredSneakers.filter(product => product.category === activeCategory);

  return (
    <section id="featured-products" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Featured</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-secondary">New Arrivals</h2>
        </div>
        
        {/* Category Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap gap-2 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-secondary"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((sneaker, i) => (
            <motion.div
              key={sneaker.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard 
                product={sneaker} 
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                isInWishlist={wishlist.includes(sneaker.id)}
              />
            </motion.div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="mt-12 text-center">
          <a href="/collections" className="inline-block px-8 py-3 rounded-full border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-colors duration-300 font-medium">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
