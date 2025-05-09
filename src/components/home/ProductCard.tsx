
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { motion } from "framer-motion";

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
  onAddToWishlist: (id: number) => void;
  onProductClick: (id: number) => void;
  isInWishlist: boolean;
}

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onProductClick, isInWishlist }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-gray-50/80 aspect-square">
        {/* Product Image */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain transition-transform duration-700 transform group-hover:scale-110"
        />
        
        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-primary text-secondary text-xs font-bold px-3 py-1 rounded-full">
            NEW
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
                onAddToWishlist(product.id);
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
              onClick={() => onProductClick(product.id)}
            >
              <Eye size={18} />
            </Button>
            
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white text-secondary hover:bg-primary hover:text-secondary h-10 w-10"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product.id);
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
              onAddToCart(product.id);
            }}
            className="w-full bg-primary text-secondary hover:bg-primary/90 rounded-full"
          >
            <ShoppingBag size={16} className="mr-2" /> Quick Add
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
          onClick={() => onProductClick(product.id)}
        >
          {product.name}
        </h3>
        <span className="block mt-1 font-semibold text-primary">
          {product.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
