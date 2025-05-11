
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { featuredSneakers } from "@/data/products";

interface WishlistTabProps {
  wishlistIds: number[];
  onAddToCart: (productId: number) => void;
}

const WishlistTab = ({ wishlistIds, onAddToCart }: WishlistTabProps) => {
  const navigate = useNavigate();
  const wishlistItems = wishlistIds.map(id => featuredSneakers.find(p => p.id === id)).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>My Wishlist</CardTitle>
          <CardDescription>Items you've saved for later</CardDescription>
        </CardHeader>
        <CardContent>
          {wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((product, index) => (
                <motion.div 
                  key={`${product?.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border rounded-lg p-4 flex space-x-4"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={product?.image} 
                      alt={product?.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-secondary">{product?.name}</h3>
                    <p className="text-primary font-semibold">{product?.price}</p>
                    <div className="mt-2 flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => product && navigate(`/product/${product.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => product && onAddToCart(product.id)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium text-secondary">No items in wishlist</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You haven't added any items to your wishlist yet.
              </p>
              <div className="mt-6">
                <Button onClick={() => navigate('/home')}>Explore Products</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WishlistTab;
