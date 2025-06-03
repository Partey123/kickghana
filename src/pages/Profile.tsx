
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingBag, User, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import ProfileHeader from "@/components/profile/ProfileHeader";
import PersonalInformation from "@/components/profile/PersonalInformation";
import OrderHistory from "@/components/profile/OrderHistory";
import WishlistTab from "@/components/profile/WishlistTab";
import { toast } from "@/components/ui/use-toast";

const Profile = () => {
  const { wishlist, addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // User data state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Mock order history data (this would be replaced with real orders from a database)
  const orderHistory = [
    {
      id: "ORD-2025-1432",
      date: "May 7, 2025",
      total: "₵1,450",
      status: "Delivered" as const,
    },
    {
      id: "ORD-2025-1398",
      date: "April 23, 2025",
      total: "₵850",
      status: "Processing" as const,
    }
  ];

  useEffect(() => {
    if (user) {
      // Load user data from Supabase
      const loadUserData = async () => {
        setLoading(true);
        try {
          // Try to get the user's profile data
          const { data: profile, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error("Error loading user profile:", error);
            // If no profile found, use data from the auth user
            setUserData({
              name: user.user_metadata?.full_name || "",
              email: user.email || "",
              phone: user.user_metadata?.phone || "",
              address: user.user_metadata?.address || "",
            });
          } else if (profile) {
            // Use profile data if found
            setUserData({
              name: profile.full_name || "",
              email: profile.email || "",
              phone: profile.phone || "",
              address: "", // This would come from an addresses table in a real app
            });
          }
        } catch (error) {
          console.error("Error loading user data:", error);
        } finally {
          setLoading(false);
        }
      };

      loadUserData();
    } else {
      // Not logged in, redirect to login page
      navigate("/auth/login");
    }
  }, [user, navigate]);

  const handleAddToCart = (productId: number) => {
    const product = wishlist.find(id => id === productId);
    if (product) {
      addToCart({
        id: productId,
        name: "Product Name", // In a real app, this would come from the database
        price: "₵100",
        image: "/placeholder.svg",
        quantity: 1
      });
      
      toast({
        title: "Added to Cart",
        description: "Item has been added to your cart",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1F2C]/5">
      <Navbar 
        cartItemsCount={0} 
        onCartClick={() => navigate("/cart")}
      />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <ProfileHeader name={userData.name} />
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="text-sm">
              <User size={16} className="mr-2" /> Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-sm">
              <ShoppingBag size={16} className="mr-2" /> Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="text-sm">
              <Heart size={16} className="mr-2" /> Wishlist
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <PersonalInformation 
              userData={userData}
              userId={user?.id || ""}
            />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrderHistory orders={orderHistory} />
          </TabsContent>
          
          <TabsContent value="wishlist">
            <WishlistTab 
              wishlistIds={wishlist}
              onAddToCart={handleAddToCart}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
