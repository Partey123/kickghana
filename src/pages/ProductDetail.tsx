import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart, ArrowLeft, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { featuredSneakers } from "@/data/products";

// Define the Product interface to match our data structure
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  colors?: string[];
  sizes?: (string | number)[];
  description?: string;
  features?: string[] | string;
  rating?: number;
  reviews?: number;
  stock?: number;
  isNew?: boolean;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, wishlist, totalItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadProducts();
  }, [id]);

  const loadProducts = () => {
    try {
      // Load products from admin dashboard
      const updatedProducts = localStorage.getItem("app_products");
      let products: Product[] = [];
      
      if (updatedProducts) {
        products = JSON.parse(updatedProducts);
      } else {
        // Fallback to custom products + featured sneakers
        const customProducts = JSON.parse(localStorage.getItem("admin_products") || "[]");
        products = [...featuredSneakers, ...customProducts];
      }
      
      setAllProducts(products);
      
      // Find the specific product by ID
      const foundProduct = products.find(p => p.id.toString() === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        // Check if product is in wishlist
        setIsInWishlist(wishlist.includes(foundProduct.id));
        // Set default selections if available
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(String(foundProduct.sizes[0]));
        }
      } else {
        // If product not found, fallback to first product or show error
        console.warn(`Product with ID ${id} not found`);
        if (products.length > 0) {
          setProduct(products[0]);
        }
      }
    } catch (error) {
      console.error("Error loading products:", error);
      // Fallback to featured sneakers
      setAllProducts(featuredSneakers);
      const fallbackProduct = featuredSneakers.find(p => p.id.toString() === id) || featuredSneakers[0];
      setProduct(fallbackProduct);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "You need to select both size and color before adding to cart",
        variant: "destructive"
      });
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize
    });
  };
  
  const handleToggleWishlist = () => {
    if (!product) return;
    setIsInWishlist(!isInWishlist);
    addToWishlist(product.id);
  };
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  
  const handleCartClick = () => {
    navigate("/cart");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/80 to-amber-100/80">
        <Navbar cartItemsCount={totalItems} onCartClick={handleCartClick} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading product details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if no product found
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/80 to-amber-100/80">
        <Navbar cartItemsCount={totalItems} onCartClick={handleCartClick} />
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mb-6 text-amber-800"
          >
            <ArrowLeft className="mr-2" /> Back to products
          </Button>
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
              <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
              <Button onClick={() => navigate("/home")}>Back to Home</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normalize product data for display
  const displayProduct = {
    ...product,
    colors: Array.isArray(product.colors) ? product.colors : (product.colors ? [product.colors] : ["Default"]),
    sizes: Array.isArray(product.sizes) ? product.sizes.map(s => String(s)) : (product.sizes ? [String(product.sizes)] : ["One Size"]),
    features: Array.isArray(product.features) ? product.features : (product.features ? product.features.split(',').map(f => f.trim()) : ["Premium quality", "Comfortable fit", "Durable construction"]),
    rating: product.rating || 4.5,
    reviews: product.reviews || 0,
    description: product.description || "High-quality footwear designed for comfort and style."
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 to-amber-100/80">
      <Navbar cartItemsCount={totalItems} onCartClick={handleCartClick} />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 text-amber-800"
        >
          <ArrowLeft className="mr-2" /> Back to products
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="bg-gradient-to-b from-amber-100/80 to-amber-200/80 rounded-xl p-6 shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="aspect-square flex items-center justify-center overflow-hidden relative"
            >
              <motion.img 
                src={product.image} 
                alt={product.name} 
                className="max-h-[400px] object-contain"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleToggleWishlist}
                className={`absolute top-4 right-4 rounded-full ${isInWishlist ? 'bg-red-100 text-red-500' : 'bg-white/70 text-gray-500'}`}
              >
                <Heart className={isInWishlist ? "fill-red-500" : ""} />
              </Button>
            </motion.div>
          </div>
          
          {/* Product Info Section */}
          <div>
            <div className="bg-white/90 rounded-xl p-6 shadow-lg">
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
                {product.category}
              </span>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(displayProduct.rating) ? 'text-amber-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{displayProduct.rating} ({displayProduct.reviews} reviews)</span>
              </div>
              
              <p className="text-4xl font-bold text-red-900 mb-6">{product.price}</p>
              
              <p className="text-gray-600 mb-6">{displayProduct.description}</p>
              
              {/* Stock Information */}
              {product.stock !== undefined && (
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    product.stock > 10 ? 'bg-green-100 text-green-800' : 
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              )}
              
              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-2">Color</h3>
                <div className="flex space-x-3">
                  {displayProduct.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full border ${selectedColor === color ? 'border-amber-600 bg-amber-50' : 'border-gray-300'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {displayProduct.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`w-16 h-12 flex items-center justify-center rounded-md border ${selectedSize === size ? 'border-amber-600 bg-amber-50 font-medium' : 'border-gray-300'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity Selection */}
              <div className="flex items-center mb-8">
                <h3 className="text-gray-700 font-medium mr-4">Quantity</h3>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-gradient-to-r from-red-700 to-amber-500 hover:from-red-800 hover:to-amber-600 text-white py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="mr-2" /> 
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                <Button 
                  onClick={handleToggleWishlist}
                  variant="outline"
                  className="border-amber-600 text-amber-800"
                >
                  <Heart className={isInWishlist ? "fill-red-500 text-red-500" : ""} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12 bg-white/90 rounded-xl shadow-lg overflow-hidden">
          <Tabs defaultValue="features">
            <TabsList className="w-full justify-start bg-amber-50/90 border-b border-amber-200 p-0">
              <TabsTrigger value="features" className="py-4 px-6">Features</TabsTrigger>
              <TabsTrigger value="details" className="py-4 px-6">Details</TabsTrigger>
              <TabsTrigger value="reviews" className="py-4 px-6">Reviews</TabsTrigger>
            </TabsList>
            <div className="p-6">
              <TabsContent value="features" className="mt-0">
                <ul className="space-y-2">
                  {displayProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Plus size={16} className="text-green-600 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="details" className="mt-0">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-800">Material</h3>
                    <p className="text-gray-600">Premium synthetic leather, mesh and rubber</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Origin</h3>
                    <p className="text-gray-600">Made in Ghana with imported materials</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Care Instructions</h3>
                    <p className="text-gray-600">Clean with a damp cloth. Air dry only. Do not machine wash.</p>
                  </div>
                  {product.stock !== undefined && (
                    <div>
                      <h3 className="font-medium text-gray-800">Availability</h3>
                      <p className="text-gray-600">
                        {product.stock > 0 ? `${product.stock} units available` : 'Currently out of stock'}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-0">
                <div className="space-y-6">
                  {displayProduct.reviews > 0 ? (
                    <>
                      <div className="border-b border-gray-200 pb-4">
                        <div className="flex items-center mb-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-4 h-4 text-amber-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <h4 className="ml-2 font-medium">Amazing quality and comfort</h4>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">By Kofi A. on April 12, 2025</p>
                        <p className="text-gray-600">These are the most comfortable shoes I've owned. Perfect for my daily runs and stylish enough for casual wear.</p>
                      </div>
                      <div className="border-b border-gray-200 pb-4">
                        <div className="flex items-center mb-1">
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-4 h-4 text-amber-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            <svg
                              className="w-4 h-4 text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <h4 className="ml-2 font-medium">Great design but runs small</h4>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">By Ama B. on March 23, 2025</p>
                        <p className="text-gray-600">I love the design and quality but consider ordering one size up as they run a bit small.</p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No reviews yet for this product.</p>
                      <p className="text-sm mt-2">Be the first to leave a review!</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts
              .filter(p => p.id.toString() !== id && p.category === product.category)
              .slice(0, 3)
              .map(relatedProduct => (
                <motion.div
                  key={relatedProduct.id}
                  whileHover={{ y: -5 }}
                  className="bg-white/90 rounded-lg overflow-hidden shadow-md cursor-pointer"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <div className="bg-gradient-to-b from-amber-50/80 to-amber-100/80 p-4">
                    <div className="aspect-square flex items-center justify-center">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name} 
                        className="h-40 object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded">
                      {relatedProduct.category}
                    </span>
                    <h3 className="mt-2 font-semibold text-gray-800">{relatedProduct.name}</h3>
                    <p className="font-bold text-red-900">{relatedProduct.price}</p>
                    {relatedProduct.stock !== undefined && (
                      <p className="text-xs text-gray-500 mt-1">
                        {relatedProduct.stock > 0 ? `${relatedProduct.stock} in stock` : 'Out of stock'}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-red-900/90 text-amber-200 py-10 px-4 md:px-8 mt-16">
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

export default ProductDetail;
