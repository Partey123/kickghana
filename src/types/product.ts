
export interface UnifiedProduct {
  id: string | number;
  name: string;
  price: string | number;
  image: string;
  category: string;
  colors?: string[];
  sizes?: string[];
  description?: string;
  features?: string[];
  rating?: number;
  reviews?: number;
  stock?: number;
  isNew?: boolean;
  // Supabase specific fields
  supabaseId?: string;
  image_url?: string;
  category_id?: string;
  is_active?: boolean;
}

export const convertSupabaseProduct = (product: any): UnifiedProduct => {
  return {
    id: product.id,
    supabaseId: product.id,
    name: product.name,
    price: `GHS ${product.price}`,
    image: product.image_url || '/sneaker1.png',
    category: product.category?.name || 'General',
    colors: product.colors || ['Default'],
    sizes: product.sizes || ['One Size'],
    description: product.description,
    features: product.features || [],
    rating: product.rating || 4.5,
    reviews: product.reviews_count || 0,
    stock: product.stock,
    isNew: false,
    image_url: product.image_url,
    category_id: product.category_id,
    is_active: product.is_active
  };
};

export const convertLocalProduct = (product: any): UnifiedProduct => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
    colors: product.colors || ['Default'],
    sizes: product.sizes || ['One Size'],
    description: product.description,
    features: product.features || [],
    rating: product.rating || 4.5,
    reviews: product.reviews || 0,
    stock: product.stock,
    isNew: product.isNew || false
  };
};
