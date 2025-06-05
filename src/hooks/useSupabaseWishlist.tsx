
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface WishlistItem {
  id: string;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

export const useSupabaseWishlist = () => {
  const [wishlist, setWishlist] = useState<(number | string)[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      setWishlistItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          id,
          product_id,
          products (
            id,
            name,
            price,
            image_url
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const productIds = (data || []).map(item => item.product_id).filter(Boolean);
      const wishlistItemsData = (data || []).map(item => ({
        id: item.id,
        product: item.products ? {
          id: (item.products as any).id,
          name: (item.products as any).name,
          price: (item.products as any).price,
          image_url: (item.products as any).image_url
        } : undefined
      }));
      
      setWishlist(productIds);
      setWishlistItems(wishlistItemsData);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlist([]);
      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const addToWishlist = async (productId: number | string) => {
    if (!user) return;

    try {
      // Check if already in wishlist
      const { data: existing } = await supabase
        .from('wishlists')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId.toString());

      if (existing && existing.length > 0) {
        console.log('Product already in wishlist');
        return;
      }

      const { error } = await supabase
        .from('wishlists')
        .insert({
          user_id: user.id,
          product_id: productId.toString(),
        });

      if (error) throw error;

      await fetchWishlist();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (productId: number | string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId.toString());

      if (error) throw error;

      await fetchWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  };

  const toggleWishlist = async (productId: number | string) => {
    if (wishlist.includes(productId)) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  };

  return {
    wishlist,
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    refetch: fetchWishlist
  };
};
