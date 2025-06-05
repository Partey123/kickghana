
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useSupabaseCart } from '@/hooks/useSupabaseCart';
import { useSupabaseWishlist } from '@/hooks/useSupabaseWishlist';
import { toast } from '@/components/ui/use-toast';

export interface CartItem {
  id: number | string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlist: (number | string)[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (id: number | string) => void;
  removeFromWishlist: (id: number | string) => void;
  subtotal: string;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Local state for when user is not authenticated
  const [localCartItems, setLocalCartItems] = useState<CartItem[]>([]);
  const [localWishlist, setLocalWishlist] = useState<(number | string)[]>([]);
  
  const { user } = useAuth();
  
  // Supabase hooks for authenticated users
  const { 
    cartItems: supabaseCartItems, 
    addToCart: addToSupabaseCart,
    removeFromCart: removeFromSupabaseCart,
    updateQuantity: updateSupabaseQuantity,
    clearCart: clearSupabaseCart,
    loading: cartLoading 
  } = useSupabaseCart();
  
  const { 
    wishlist: supabaseWishlist,
    addToWishlist: addToSupabaseWishlist,
    removeFromWishlist: removeFromSupabaseWishlist,
    loading: wishlistLoading 
  } = useSupabaseWishlist();

  // Load local data on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) {
      try {
        setLocalCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    
    if (savedWishlist) {
      try {
        setLocalWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save local data to localStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(localCartItems));
    }
  }, [localCartItems, user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('wishlist', JSON.stringify(localWishlist));
    }
  }, [localWishlist, user]);

  // Determine which data to use based on authentication status
  const cartItems = user ? supabaseCartItems : localCartItems;
  const wishlist = user ? supabaseWishlist : localWishlist;

  const addToCart = async (item: CartItem) => {
    console.log('Adding to cart:', item, 'User:', user);
    
    if (user) {
      try {
        await addToSupabaseCart(item);
      } catch (error) {
        console.error('Error adding to Supabase cart:', error);
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Local storage logic
      setLocalCartItems(prev => {
        const existingItem = prev.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
          return prev.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          );
        } else {
          return [...prev, item];
        }
      });
    }
  };

  const removeFromCart = async (id: number | string) => {
    if (user) {
      try {
        await removeFromSupabaseCart(id);
      } catch (error) {
        console.error('Error removing from Supabase cart:', error);
        toast({
          title: "Error",
          description: "Failed to remove item from cart. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setLocalCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateQuantity = async (id: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    if (user) {
      try {
        await updateSupabaseQuantity(id, quantity);
      } catch (error) {
        console.error('Error updating Supabase cart quantity:', error);
        toast({
          title: "Error",
          description: "Failed to update quantity. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setLocalCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await clearSupabaseCart();
      } catch (error) {
        console.error('Error clearing Supabase cart:', error);
        toast({
          title: "Error",
          description: "Failed to clear cart. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setLocalCartItems([]);
    }
  };

  const addToWishlist = async (id: number | string) => {
    console.log('Adding to wishlist:', id, 'User:', user);
    
    if (user) {
      try {
        await addToSupabaseWishlist(id);
      } catch (error) {
        console.error('Error adding to Supabase wishlist:', error);
        toast({
          title: "Error",
          description: "Failed to add item to wishlist. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setLocalWishlist(prev => 
        prev.includes(id) ? prev : [...prev, id]
      );
    }
  };

  const removeFromWishlist = async (id: number | string) => {
    if (user) {
      try {
        await removeFromSupabaseWishlist(id);
      } catch (error) {
        console.error('Error removing from Supabase wishlist:', error);
        toast({
          title: "Error",
          description: "Failed to remove item from wishlist. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setLocalWishlist(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const subtotal = cartItems
    .reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
      return total + (price * item.quantity);
    }, 0)
    .toFixed(2);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value: CartContextType = {
    cartItems,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    subtotal: `GHS ${subtotal}`,
    totalItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
