
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { featuredSneakers } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import ProductCard, { Product } from "@/components/home/ProductCard";
import { ArrowDown, Filter } from "lucide-react";
import { useSupabaseProducts } from "@/hooks/useSupabaseProducts";
import { toast } from "@/components/ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Collections = () => {
  const navigate = useNavigate();
  const { addToCart, wishlist, addToWishlist } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("none");
  const [products, setProducts] = useState<Product[]>(featuredSneakers);
  const { products: supabaseProducts, loading: supabaseLoading } = useSupabaseProducts();
  
  const categories = ["All", "Running", "Basketball", "Casual", "Traditional", "Training"];
  
  useEffect(() => {
    // Convert Supabase products to local format when available
    if (supabaseProducts.length > 0) {
      const convertedProducts: Product[] = supabaseProducts.map(product => ({
        id: product.id,
        name: product.name,
        price: `GHS ${product.price}`,
        image: product.image_url || '/sneaker1.png',
        category: product.category?.name || 'General',
        colors: product.colors || ['Default'],
        sizes: product.sizes || ['One Size'],
        description: product.description,
        features: product.features || [],
        rating: product.rating || 4.5,
        reviews: product.reviews_count || 0,
        stock: product.stock,
        isNew: false
      }));
      
      setProducts(convertedProducts);
    }
  }, [supabaseProducts]);
  
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleProductClick = (id: number | string) => {
    navigate(`/product/${id}`);
  };

  const handleAddToWishlist = (id: number | string) => {
    addToWishlist(id);
    
    const product = products.find(p => p.id === id);
    toast({
      title: "Added to Wishlist",
      description: `${product?.name || 'Product'} has been added to your wishlist.`,
    });
  };
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "price-asc") {
      // Extract numeric price from price string and compare
      const aPrice = parseFloat(a.price.replace(/[^\d.]/g, ""));
      const bPrice = parseFloat(b.price.replace(/[^\d.]/g, ""));
      return aPrice - bPrice;
    } else if (sort === "price-desc") {
      const aPrice = parseFloat(a.price.replace(/[^\d.]/g, ""));
      const bPrice = parseFloat(b.price.replace(/[^\d.]/g, ""));
      return bPrice - aPrice;
    } else if (sort === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sort === "name-desc") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-36 pb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">Our Collection</h1>
        <p className="text-muted-foreground mb-8">Browse through our extensive sneaker catalog</p>
        
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          {/* Mobile Filter Sheet */}
          <div className="md:hidden w-full">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter size={16} className="mr-2" /> Filter & Sort
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                  <SheetDescription>
                    Apply filters to find exactly what you want
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category, index) => (
                        <Button
                          key={index}
                          variant={activeCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveCategory(category)}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Sort By</h3>
                    <Select value={sort} onValueChange={(value) => setSort(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Featured</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="name-asc">Name: A to Z</SelectItem>
                        <SelectItem value="name-desc">Name: Z to A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Desktop Filter */}
          <div className="hidden md:block">
            <h3 className="font-medium mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Desktop Sort */}
          <div className="hidden md:block">
            <Select value={sort} onValueChange={(value) => setSort(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Product Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Showing {sortedProducts.length} products</p>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {sortedProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <ProductCard 
                product={product} 
                onAddToCart={() => handleAddToCart(product)}
                onAddToWishlist={() => handleAddToWishlist(product.id)}
                isInWishlist={wishlist.includes(product.id)}
                onProductClick={() => handleProductClick(product.id)}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Load More Button */}
        {filteredProducts.length > 12 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="gap-2">
              Load More <ArrowDown size={16} />
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Collections;
