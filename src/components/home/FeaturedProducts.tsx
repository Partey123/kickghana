
import { useState } from "react";
import ProductCard, { Product } from "./ProductCard";
import { toast } from "@/components/ui/use-toast";

// Mock data for featured sneakers
const featuredSneakers = [
  {
    id: 1,
    name: "Air Max Elevate",
    price: "₵850",
    image: "/sneaker1.png",
    category: "Running"
  },
  {
    id: 2,
    name: "Flex Stride Pro",
    price: "₵720",
    image: "/sneaker2.png",
    category: "Casual"
  },
  {
    id: 3,
    name: "Court Vision Elite",
    price: "₵650",
    image: "/sneaker3.png",
    category: "Basketball"
  },
  {
    id: 4,
    name: "React Infinity",
    price: "₵920",
    image: "/sneaker4.png",
    category: "Running"
  }
];

interface FeaturedProductsProps {
  cartItems: number[];
  setCartItems: React.Dispatch<React.SetStateAction<number[]>>;
  wishlist: number[];
  setWishlist: React.Dispatch<React.SetStateAction<number[]>>;
}

const FeaturedProducts = ({ cartItems, setCartItems, wishlist, setWishlist }: FeaturedProductsProps) => {
  const addToCart = (id: number) => {
    setCartItems([...cartItems, id]);
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
  };
  
  const addToWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist",
      });
    } else {
      setWishlist([...wishlist, id]);
      toast({
        title: "Added to wishlist",
        description: "Item has been added to your wishlist",
      });
    }
  };

  return (
    <section id="featured-products" className="py-10 px-4 md:px-8 bg-gradient-to-b from-amber-100 to-amber-50/80">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-red-900">Featured Products</h2>
          <a href="#" className="text-amber-800 hover:text-red-800 font-medium hover:underline">
            View All
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSneakers.map((sneaker) => (
            <ProductCard 
              key={sneaker.id} 
              product={sneaker} 
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
              isInWishlist={wishlist.includes(sneaker.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
