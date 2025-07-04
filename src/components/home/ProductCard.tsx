
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { UnifiedProduct } from "@/types/product";

interface ProductCardProps {
  product: UnifiedProduct;
  onAddToCart: (id: string | number) => void;
  onAddToWishlist: (id: string | number) => void;
  onProductClick: (id: string | number) => void;
  isInWishlist: boolean;
  isInCart?: boolean;
}

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onProductClick, isInWishlist, isInCart = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleProductClick = () => {
    // Use supabaseId if available (for Supabase products), otherwise use regular id
    const productId = product.supabaseId || product.id;
    console.log('ProductCard: Navigating to product with ID:', productId);
    onProductClick(productId);
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const productId = product.supabaseId || product.id;
    console.log('ProductCard: View button clicked for product ID:', productId);
    onProductClick(productId);
  };

  // Ensure price is displayed correctly
  const displayPrice = typeof product.price === 'number' ? `GHS ${product.price}` : product.price;

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      <div className="relative rounded-2xl overflow-hidden bg-gray-50/80 aspect-square">
        {/* Product Image */}
        <img 
          src={product.image_url || product.image} 
          alt={product.name} 
          className="w-full h-full object-contain transition-transform duration-700 transform group-hover:scale-110"
        />
        
        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-primary text-secondary text-xs font-bold px-3 py-1 rounded-full">
            NEW
          </div>
        )}

        {/* In Cart Badge */}
        {isInCart && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            IN CART
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex flex-col gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white text-secondary hover:bg-primary hover:text-secondary h-10 w-10"
              onClick={(e) => {
                e.stopPropagation();
                onAddToWishlist(product.supabaseId || product.id);
              }}
            >
              <Heart 
                size={18} 
                className={isInWishlist ? "fill-primary text-primary" : ""} 
              />
            </Button>
            
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white text-secondary hover:bg-primary hover:text-secondary h-10 w-10"
              onClick={handleViewClick}
            >
              <Eye size={18} />
            </Button>
            
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white text-secondary hover:bg-primary hover:text-secondary h-10 w-10"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product.supabaseId || product.id);
              }}
            >
              <ShoppingBag size={18} />
            </Button>
          </div>
        </div>
        
        {/* Quick Add Button */}
        <div className="absolute -bottom-10 left-0 right-0 group-hover:bottom-0 transition-all duration-300 px-4 py-3">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product.supabaseId || product.id);
            }}
            className={`w-full rounded-full ${
              isInCart 
                ? "bg-green-500 text-white hover:bg-green-600" 
                : "bg-primary text-secondary hover:bg-primary/90"
            }`}
            disabled={isInCart}
          >
            <ShoppingBag size={16} className="mr-2" /> 
            {isInCart ? "Added to Cart" : "Quick Add"}
          </Button>
        </div>
        
        {/* Category Tag */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 text-secondary text-xs px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="mt-4 text-center">
        <h3 
          className="font-medium text-secondary truncate cursor-pointer hover:text-primary transition-colors"
          onClick={handleProductClick}
        >
          {product.name}
        </h3>
        <span className="block mt-1 font-semibold text-primary">
          {displayPrice}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
