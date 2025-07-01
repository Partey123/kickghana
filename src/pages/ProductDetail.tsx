
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useLoading } from "@/contexts/LoadingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import RatingsAndReviews from "@/components/product/RatingsAndReviews";
import { ProductDetailHeader } from "@/components/product/ProductDetailHeader";
import { ProductImages } from "@/components/product/ProductImages";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductSpecifications } from "@/components/product/ProductSpecifications";
import { featuredSneakers } from "@/data/products";
import { useSupabaseProducts } from "@/hooks/useSupabaseProducts";
import { UnifiedProduct, convertSupabaseProduct, convertLocalProduct } from "@/types/product";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hideLoading } = useLoading();
  const [product, setProduct] = useState<UnifiedProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { fetchProductById } = useSupabaseProducts();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      console.log('Loading product with ID:', id);

      try {
        // First try to fetch from Supabase
        const supabaseProduct = await fetchProductById(id);
        if (supabaseProduct) {
          const convertedProduct = convertSupabaseProduct(supabaseProduct);
          console.log('Loaded Supabase product:', convertedProduct);
          setProduct(convertedProduct);
          setLoading(false);
          hideLoading();
          return;
        }

        // Fallback to local products
        const allLocalProducts = [...featuredSneakers];
        
        // Check for updated products from admin
        const updatedProducts = localStorage.getItem("app_products");
        if (updatedProducts) {
          try {
            const parsedProducts = JSON.parse(updatedProducts);
            allLocalProducts.push(...parsedProducts.filter((p: any) => !featuredSneakers.find(fp => fp.id === p.id)));
          } catch (error) {
            console.error("Error parsing updated products:", error);
          }
        }

        const localProduct = allLocalProducts.find(p => String(p.id) === String(id));
        if (localProduct) {
          const convertedProduct = convertLocalProduct(localProduct);
          console.log('Loaded local product:', convertedProduct);
          setProduct(convertedProduct);
        } else {
          console.log('Product not found with ID:', id);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
        hideLoading();
      }
    };

    loadProduct();
  }, [id]); // Remove fetchProductById and hideLoading from dependencies to prevent infinite loop

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-secondary mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/collections')}>
              Browse All Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = [product.image_url || product.image];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <ProductDetailHeader 
          productName={product.name}
          category={product.category}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImages 
            images={images}
            productName={product.name}
          />

          <div className="space-y-6">
            <ProductInfo product={product} />
            
            <Separator />

            <ProductSpecifications 
              product={product}
              selectedColor={product.colors?.[0]}
              selectedSize={product.sizes?.[0] ? String(product.sizes[0]) : undefined}
            />
          </div>
        </div>

        <div className="mt-16">
          <RatingsAndReviews productId={product.supabaseId || product.id} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
