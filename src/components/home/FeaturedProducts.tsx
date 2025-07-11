
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { useCart, CartItem } from "@/contexts/CartContext";
import { featuredSneakers } from "@/data/products";
import { useLoading } from "@/contexts/LoadingContext";
import { useSupabaseProducts } from "@/hooks/useSupabaseProducts";
import { toast } from "@/components/ui/use-toast";
import { UnifiedProduct, convertSupabaseProduct, convertLocalProduct } from "@/types/product";

interface FeaturedProductsProps {
  cartItems: (number | string)[];
  wishlist: (number | string)[];
  addToCart: (item: CartItem) => void;
  addToWishlist: (id: number | string) => void;
}

const FeaturedProducts = ({ cartItems, wishlist, addToCart, addToWishlist }: FeaturedProductsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [products, setProducts] = useState<UnifiedProduct[]>([]);
  const categories = ["All", "Running", "Basketball", "Casual", "Traditional", "Training"];
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { products: supabaseProducts, loading: supabaseLoading } = useSupabaseProducts();
  
  useEffect(() => {
    loadProducts();
    
    // Listen for product updates from admin dashboard
    const handleProductsUpdate = (event: CustomEvent) => {
      const updatedProducts = event.detail.map(convertLocalProduct);
      setProducts(updatedProducts);
    };
    
    window.addEventListener('productsUpdated', handleProductsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('productsUpdated', handleProductsUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    // Only show loading if data isn't loaded yet
    if (!dataLoaded) {
      showLoading("Loading products...");
      
      // Simulate data loading with a timeout
      const timer = setTimeout(() => {
        hideLoading();
        setDataLoaded(true);
      }, 1500);
      
      return () => {
        clearTimeout(timer);
        hideLoading();
      };
    }
  }, [dataLoaded, showLoading, hideLoading]);

  useEffect(() => {
    // Convert Supabase products to unified format when available
    if (supabaseProducts.length > 0) {
      const convertedProducts = supabaseProducts.map(convertSupabaseProduct);
      console.log('Converted Supabase products:', convertedProducts);
      setProducts(convertedProducts);
      setDataLoaded(true);
    }
  }, [supabaseProducts]);

  const loadProducts = () => {
    // Check for updated products from admin dashboard
    const updatedProducts = localStorage.getItem("app_products");
    if (updatedProducts) {
      try {
        const parsedProducts = JSON.parse(updatedProducts);
        const convertedProducts = parsedProducts.map(convertLocalProduct);
        setProducts(convertedProducts);
      } catch (error) {
        console.error("Error parsing updated products:", error);
        const fallbackProducts = featuredSneakers.map(convertLocalProduct);
        setProducts(fallbackProducts);
      }
    } else {
      // Load custom products and combine with featured sneakers
      const customProducts = JSON.parse(localStorage.getItem("admin_products") || "[]");
      const allLocalProducts = [...featuredSneakers, ...customProducts];
      const convertedProducts = allLocalProducts.map(convertLocalProduct);
      setProducts(convertedProducts);
    }
  };
  
  const handleAddToCart = (product: UnifiedProduct) => {
    console.log('Adding product to cart:', product);
    addToCart({
      id: product.supabaseId || product.id,
      name: product.name,
      price: typeof product.price === 'number' ? `GHS ${product.price}` : product.price,
      image: product.image_url || product.image,
      quantity: 1
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleProductClick = (id: string | number) => {
    // Show loading animation before navigating
    showLoading("Loading product details...");
    navigate(`/product/${id}`);
  };
  
  const handleAddToWishlist = (id: string | number) => {
    console.log('Adding to wishlist:', id);
    addToWishlist(id);
    
    const product = products.find(p => (p.supabaseId || p.id) === id);
    toast({
      title: "Added to Wishlist",
      description: `${product?.name || 'Product'} has been added to your wishlist.`,
    });
  };
  
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(product => product.category === activeCategory);

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
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.supabaseId || product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard 
                product={product} 
                onAddToCart={() => handleAddToCart(product)}
                onAddToWishlist={() => handleAddToWishlist(product.supabaseId || product.id)}
                isInWishlist={wishlist.includes(product.supabaseId || product.id)}
                onProductClick={() => handleProductClick(product.supabaseId || product.id)}
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
