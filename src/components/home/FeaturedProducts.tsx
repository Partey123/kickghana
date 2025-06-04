
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard, { Product } from "./ProductCard";
import { motion } from "framer-motion";
import { useCart, CartItem } from "@/contexts/CartContext";
import { featuredSneakers } from "@/data/products";
import { useLoading } from "@/contexts/LoadingContext";
import { useSupabaseProducts } from "@/hooks/useSupabaseProducts";

interface FeaturedProductsProps {
  cartItems: number[];
  wishlist: number[];
  addToCart: (item: CartItem) => void;
  addToWishlist: (id: number) => void;
}

const FeaturedProducts = ({ cartItems, wishlist, addToCart, addToWishlist }: FeaturedProductsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>(featuredSneakers);
  const categories = ["All", "Running", "Basketball", "Casual", "Traditional", "Training"];
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { products: supabaseProducts, loading: supabaseLoading } = useSupabaseProducts();
  
  useEffect(() => {
    loadProducts();
    
    // Listen for product updates from admin dashboard
    const handleProductsUpdate = (event: CustomEvent) => {
      setProducts(event.detail);
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
      }, 1500); // Reduced timeout to 1.5 seconds
      
      return () => {
        clearTimeout(timer);
        hideLoading(); // Ensure hideLoading is called when component unmounts
      };
    }
  }, [dataLoaded, showLoading, hideLoading]);

  useEffect(() => {
    // Convert Supabase products to local format when available
    if (supabaseProducts.length > 0) {
      const convertedProducts: Product[] = supabaseProducts.map(product => ({
        id: parseInt(product.id),
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
      setDataLoaded(true);
    }
  }, [supabaseProducts]);

  const loadProducts = () => {
    // Check for updated products from admin dashboard
    const updatedProducts = localStorage.getItem("app_products");
    if (updatedProducts) {
      try {
        const parsedProducts = JSON.parse(updatedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error("Error parsing updated products:", error);
        setProducts(featuredSneakers);
      }
    } else {
      // Load custom products and combine with featured sneakers
      const customProducts = JSON.parse(localStorage.getItem("admin_products") || "[]");
      const allProducts = [...featuredSneakers, ...customProducts];
      setProducts(allProducts);
    }
  };
  
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };
  
  const handleProductClick = (id: number) => {
    // Show loading animation before navigating
    showLoading("Loading product details...");
    navigate(`/product/${id}`);
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
                onAddToCart={() => handleAddToCart(sneaker)}
                onAddToWishlist={() => addToWishlist(sneaker.id)}
                isInWishlist={wishlist.includes(sneaker.id)}
                onProductClick={() => handleProductClick(sneaker.id)}
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
