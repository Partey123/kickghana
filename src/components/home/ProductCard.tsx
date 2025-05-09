
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
  onAddToWishlist: (id: number) => void;
  isInWishlist: boolean;
}

const ProductCard = ({ product, onAddToCart, onAddToWishlist, isInWishlist }: ProductCardProps) => {
  const navigate = useNavigate();
  
  const goToProductDetail = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0">
        <div className="bg-gradient-to-b from-amber-50 to-amber-100 p-6 relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToWishlist(product.id);
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/70 hover:bg-white transition-colors z-10"
          >
            <Heart 
              size={18} 
              className={isInWishlist ? "fill-red-600 text-red-600" : "text-gray-500"} 
            />
          </button>
          <div 
            className="aspect-square flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => goToProductDetail(product.id)} 
          >
            <motion.img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-auto object-contain"
              whileHover={{ scale: 1.1, rotate: 5 }}
            />
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-3">
            <span className="text-xs font-medium text-red-700 bg-amber-100 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
          <h3 
            className="font-semibold text-lg text-gray-800 cursor-pointer hover:text-red-800"
            onClick={() => goToProductDetail(product.id)}
          >
            {product.name}
          </h3>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-lg text-red-900">{product.price}</span>
            <Button 
              size="sm" 
              onClick={() => onAddToCart(product.id)}
              className="bg-red-800 hover:bg-red-900 text-amber-100"
            >
              <ShoppingCart size={16} className="mr-1" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
