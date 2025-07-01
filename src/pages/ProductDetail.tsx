
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingBag, Star, ArrowLeft, Minus, Plus, Share } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useLoading } from "@/contexts/LoadingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import RatingsAndReviews from "@/components/product/RatingsAndReviews";
import { toast } from "@/components/ui/use-toast";
import { featuredSneakers } from "@/data/products";
import { useSupabaseProducts } from "@/hooks/useSupabaseProducts";
import { UnifiedProduct, convertSupabaseProduct, convertLocalProduct } from "@/types/product";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, wishlist, addToWishlist } = useCart();
  const { hideLoading } = useLoading();
  const [product, setProduct] = useState<UnifiedProduct | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { products: supabaseProducts, fetchProductById } = useSupabaseProducts();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      console.log('Loading product with ID:', id);

      try {
        // First try to fetch from Supabase
        const supabaseProduct = await fetchProductById(id);
        if (supabaseProduct) {
          const convertedProduct = convertSupabaseProduct(supabaseProduct);
          setProduct(convertedProduct);
          console.log('Loaded Supabase product:', convertedProduct);
          
          // Set default selections
          if (convertedProduct.colors && convertedProduct.colors.length > 0) {
            setSelectedColor(convertedProduct.colors[0]);
          }
          if (convertedProduct.sizes && convertedProduct.sizes.length > 0) {
            setSelectedSize(convertedProduct.sizes[0]);
          }
          
          setLoading(false);
          hideLoading();
          return;
        }

        // Fallback to local products
        const allLocalProducts = [...featuredSneakers];
        
        // Check for updated products from admin
        const updatedProducts = localStorage.getItem("app_products");
        if (updatedProducts) {
          try {
            const parsedProducts = JSON.parse(updatedProducts);
            allLocalProducts.push(...parsedProducts.filter((p: any) => !featuredSneakers.find(fp => fp.id === p.id)));
          } catch (error) {
            console.error("Error parsing updated products:", error);
          }
        }

        const localProduct = allLocalProducts.find(p => String(p.id) === String(id));
        if (localProduct) {
          const convertedProduct = convertLocalProduct(localProduct);
          setProduct(convertedProduct);
          console.log('Loaded local product:', convertedProduct);
          
          // Set default selections
          if (convertedProduct.colors && convertedProduct.colors.length > 0) {
            setSelectedColor(convertedProduct.colors[0]);
          }
          if (convertedProduct.sizes && convertedProduct.sizes.length > 0) {
            setSelectedSize(convertedProduct.sizes[0]);
          }
        } else {
          console.log('Product not found with ID:', id);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
        hideLoading();
      }
    };

    loadProduct();
  }, [id, fetchProductById, hideLoading]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.supabaseId || product.id,
      name: product.name,
      price: typeof product.price === 'number' ? `GHS ${product.price}` : product.price,
      image: product.image_url || product.image,
      quantity
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    
    const productId = product.supabaseId || product.id;
    addToWishlist(productId);
    
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out ${product?.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Product link has been copied to clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-secondary mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/collections')}>
              Browse All Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = [product.image_url || product.image];
  const displayPrice = typeof product.price === 'number' ? `GHS ${product.price}` : product.price;
  const isInWishlist = wishlist.includes(product.supabaseId || product.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-muted-foreground">{product.category}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div 
              className="aspect-square rounded-2xl overflow-hidden bg-gray-50/80"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={images[activeImageIndex]} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </motion.div>
            
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImageIndex === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                  <h1 className="text-3xl font-bold text-secondary">{product.name}</h1>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={shareProduct}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Share size={20} />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold text-primary">{displayPrice}</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={`${i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({product.reviews || 0} reviews)
                  </span>
                </div>
              </div>
              
              {product.description && (
                <p className="text-muted-foreground">{product.description}</p>
              )}
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>{typeof feature === 'string' ? feature : String(feature)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === String(size) ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(String(size))}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <span className="text-lg font-medium min-w-[3rem] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {/* Stock Info */}
            {product.stock !== undefined && (
              <div>
                {product.stock > 0 ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {product.stock} in stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of stock</Badge>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 gap-2"
                  disabled={product.stock === 0}
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleAddToWishlist}
                >
                  <Heart 
                    size={18} 
                    className={isInWishlist ? "fill-primary text-primary" : ""} 
                  />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Product Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Product Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span>{product.category}</span>
                  </div>
                  {selectedColor && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Color:</span>
                      <span>{selectedColor}</span>
                    </div>
                  )}
                  {selectedSize && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <span>{selectedSize}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <RatingsAndReviews productId={String(product.supabaseId || product.id)} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
