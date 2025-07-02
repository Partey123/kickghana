import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import ProductCard from "@/components/home/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

// Mock women's products data
const womensProducts = [
  {
    id: 21,
    name: "Nike Air Max 270 Women's",
    price: "GHS 750",
    originalPrice: "GHS 900",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Running",
    colors: ["White/Pink", "Black/Purple", "Rose Gold"],
    sizes: ["5", "6", "7", "8", "9", "10"]
  },
  {
    id: 22,
    name: "Adidas Stan Smith Women's",
    price: "GHS 580",
    originalPrice: "GHS 720",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Lifestyle",
    colors: ["White/Green", "White/Pink", "All White"],
    sizes: ["5", "6", "7", "8", "9", "10"]
  },
  {
    id: 23,
    name: "Puma Cali Sport Women's",
    price: "GHS 650",
    originalPrice: "GHS 800",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Lifestyle",
    colors: ["White/Black", "Pink", "Beige"],
    sizes: ["5", "6", "7", "8", "9", "10"]
  },
  {
    id: 24,
    name: "New Balance 327 Women's",
    price: "GHS 720",
    originalPrice: "GHS 850",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Lifestyle",
    colors: ["Cream", "Grey/Pink", "White/Blue"],
    sizes: ["5", "6", "7", "8", "9", "10"]
  }
];

const Women = () => {
  const { addToCart, cartItems, addToWishlist, wishlist } = useCart();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("featured");
  const [filterBy, setFilterBy] = useState("all");

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (product: any) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.sizes[0] || "",
      color: product.colors[0] || ""
    };
    addToCart(cartItem);
  };

  const filteredProducts = womensProducts.filter(product => 
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
            Women's Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated selection of women's footwear, combining comfort, style, and quality.
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
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
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

export default Women;
