
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "./AuthContext";
import { useSupabaseCart } from "@/hooks/useSupabaseCart";
import { useSupabaseWishlist } from "@/hooks/useSupabaseWishlist";

export interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: string;
  wishlist: number[];
  addToWishlist: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
  const [localWishlist, setLocalWishlist] = useState<number[]>([]);

  // Supabase hooks
  const { 
    cartItems: supabaseCartItems, 
    addToCart: addToSupabaseCart, 
    removeFromCart: removeFromSupabaseCart,
    updateQuantity: updateSupabaseQuantity,
    clearCart: clearSupabaseCart,
    loading: cartLoading 
  } = useSupabaseCart();

  const { 
    wishlistItems: supabaseWishlistItems,
    toggleWishlist: toggleSupabaseWishlist,
    isInWishlist: isInSupabaseWishlist,
    loading: wishlistLoading 
  } = useSupabaseWishlist();

  // Convert Supabase cart items to local format
  const convertSupabaseCartItems = (): CartItem[] => {
    return supabaseCartItems.map(item => ({
      id: parseInt(item.product?.id || '0'),
      name: item.product?.name || '',
      price: `₵${item.product?.price || 0}`,
      image: item.product?.image_url || '/sneaker1.png',
      quantity: item.quantity,
      color: item.color || undefined,
      size: item.size || undefined
    }));
  };

  // Convert Supabase wishlist items to local format
  const convertSupabaseWishlist = (): number[] => {
    return supabaseWishlistItems.map(item => parseInt(item.product?.id || '0'));
  };

  // Get current cart items (Supabase if logged in, local if not)
  const cartItems = user ? convertSupabaseCartItems() : localCartItems;
  const wishlist = user ? convertSupabaseWishlist() : localWishlist;

  // Calculate total items
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate subtotal
  const subtotal = (() => {
    const total = cartItems.reduce((sum, item) => {
      const priceNumeric = parseFloat(item.price.replace(/[^\d.]/g, ""));
      return sum + (priceNumeric * item.quantity);
    }, 0);
    return `₵${total.toFixed(2)}`;
  })();

  useEffect(() => {
    // Load local cart and wishlist from localStorage on initial load
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");
    
    if (savedCart) {
      try {
        setLocalCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
    
    if (savedWishlist) {
      try {
        setLocalWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e);
      }
    }
  }, []);
  
  useEffect(() => {
    // Save local cart to localStorage whenever it changes (only if not logged in)
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(localCartItems));
    }
  }, [localCartItems, user]);
  
  useEffect(() => {
    // Save local wishlist to localStorage whenever it changes (only if not logged in)
    if (!user) {
      localStorage.setItem("wishlist", JSON.stringify(localWishlist));
    }
  }, [localWishlist, user]);

  const addToCart = async (item: CartItem) => {
    if (user) {
      // Use Supabase for logged-in users
      await addToSupabaseCart(
        item.id.toString(), 
        item.quantity, 
        item.color, 
        item.size
      );
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart`,
      });
    } else {
      // Use local storage for guest users
      setLocalCartItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(i => 
          i.id === item.id && 
          ((!i.color && !item.color) || i.color === item.color) && 
          ((!i.size && !item.size) || i.size === item.size)
        );
        
        if (existingItemIndex > -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += item.quantity;
          toast({
            title: "Cart updated",
            description: `${item.name} quantity updated in your cart`,
          });
          return updatedItems;
        } else {
          toast({
            title: "Added to cart",
            description: `${item.name} has been added to your cart`,
          });
          return [...prevItems, item];
        }
      });
    }
  };

  const removeFromCart = async (id: number) => {
    if (user) {
      // Find the Supabase cart item ID
      const supabaseItem = supabaseCartItems.find(item => 
        parseInt(item.product?.id || '0') === id
      );
      if (supabaseItem) {
        await removeFromSupabaseCart(supabaseItem.id);
      }
    } else {
      setLocalCartItems(prevItems => {
        const updatedItems = prevItems.filter(item => item.id !== id);
        return updatedItems;
      });
    }
    
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
    });
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (user) {
      const supabaseItem = supabaseCartItems.find(item => 
        parseInt(item.product?.id || '0') === id
      );
      if (supabaseItem) {
        await updateSupabaseQuantity(supabaseItem.id, quantity);
      }
    } else {
      setLocalCartItems(prevItems => 
        prevItems.map(item => 
          item.id === id ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  const clearCart = async () => {
    if (user) {
      await clearSupabaseCart();
    } else {
      setLocalCartItems([]);
    }
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };
  
  const addToWishlist = async (id: number) => {
    if (user) {
      await toggleSupabaseWishlist(id.toString());
      const isCurrentlyInWishlist = isInSupabaseWishlist(id.toString());
      toast({
        title: isCurrentlyInWishlist ? "Removed from wishlist" : "Added to wishlist",
        description: isCurrentlyInWishlist ? "Item has been removed from your wishlist" : "Item has been added to your wishlist",
      });
    } else {
      setLocalWishlist(prevWishlist => {
        if (prevWishlist.includes(id)) {
          toast({
            title: "Removed from wishlist",
            description: "Item has been removed from your wishlist",
          });
          return prevWishlist.filter(itemId => itemId !== id);
        } else {
          toast({
            title: "Added to wishlist",
            description: "Item has been added to your wishlist",
          });
          return [...prevWishlist, id];
        }
      });
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      wishlist,
      addToWishlist
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
