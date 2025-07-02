
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import ProductCard from "@/components/home/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

// Mock men's products data
const mensProducts = [
  {
    id: 11,
    name: "Nike Air Jordan 1 Mid",
    price: "GHS 890",
    originalPrice: "GHS 1200",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Basketball",
    colors: ["Black/White", "Red/Black", "Blue/White"],
    sizes: ["8", "9", "10", "11", "12"]
  },
  {
    id: 12,
    name: "Adidas Ultraboost 22",
    price: "GHS 750",
    originalPrice: "GHS 950",
    image: "https://images.unsplash.com/photo-1556048219-bb6978360b84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Running",
    colors: ["White", "Black", "Navy"],
    sizes: ["8", "9", "10", "11", "12"]
  },
  {
    id: 13,
    name: "Puma RS-X Reinvention",
    price: "GHS 620",
    originalPrice: "GHS 800",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Lifestyle",
    colors: ["Multi", "Black", "White"],
    sizes: ["8", "9", "10", "11", "12"]
  },
  {
    id: 14,
    name: "New Balance 990v5",
    price: "GHS 980",
    originalPrice: "GHS 1100",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Running",
    colors: ["Grey", "Navy", "Black"],
    sizes: ["8", "9", "10", "11", "12"]
  }
];

const Men = () => {
  const { addToCart, cartItems, addToWishlist, wishlist } = useCart();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("featured");
  const [filterBy, setFilterBy] = useState("all");

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async (product: any) => {
    console.log('Adding product to cart:', product);
    
    try {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        size: product.sizes?.[0] || "",
        color: product.colors?.[0] || ""
      };
      
      console.log('Cart item prepared:', cartItem);
      await addToCart(cartItem);
      
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
      
      console.log('Item successfully added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = mensProducts.filter(product => 
    filterBy === "all" || product.category.toLowerCase() === filterBy
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.price.replace("GHS ", "")) - parseInt(b.price.replace("GHS ", ""));
      case "price-high":
        return parseInt(b.price.replace("GHS ", "")) - parseInt(a.price.replace("GHS ", ""));
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background/80">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Men's Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our premium collection of men's footwear, from athletic performance to everyday style.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="basketball">Basketball</SelectItem>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInCart={cartItems.some(item => item.id === product.id)}
              isInWishlist={wishlist.includes(product.id)}
              onAddToCart={() => handleAddToCart(product)}
              onAddToWishlist={() => addToWishlist(product.id)}
              onProductClick={() => handleProductClick(product.id)}
            />
          ))}
        </motion.div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => setFilterBy("all")}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Men;
