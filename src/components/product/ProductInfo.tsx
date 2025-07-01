
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Star, Share, Minus, Plus } from "lucide-react";
import { UnifiedProduct } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";

interface ProductInfoProps {
  product: UnifiedProduct;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const { addToCart, wishlist, addToWishlist } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0] : ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? String(product.sizes[0]) : ""
  );
  const [quantity, setQuantity] = useState<number>(1);

  const displayPrice = typeof product.price === 'number' ? `GHS ${product.price}` : product.price;
  const isInWishlist = wishlist.includes(product.supabaseId || product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.supabaseId || product.id,
      name: product.name,
      price: displayPrice,
      image: product.image_url || product.image,
      quantity: quantity,
      color: selectedColor || undefined,
      size: selectedSize || undefined
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
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
        title: product.name,
        text: `Check out ${product.name}`,
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

  return (
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
          {typeof product.stock === 'number' && product.stock > 0 ? (
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
            disabled={typeof product.stock === 'number' && product.stock === 0}
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
    </div>
  );
};
