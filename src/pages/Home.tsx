
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "@/components/ui/use-toast";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoSlider from "@/components/home/PromoSlider";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";
import SearchModal from "@/components/home/SearchModal";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { addToCart, totalItems, cartItems, addToWishlist, wishlist } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Searching",
      description: `Searching for "${searchTerm}"`,
    });
    setShowSearchModal(false);
  };
  
  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background/80">
      <Navbar cartItemsCount={totalItems} onCartClick={handleCartClick} />
      
      <HeroSection />
      
      <CategorySection />
      
      {/* Promo Slider - Improved carousel version */}
      <PromoSlider />
      
      <FeaturedProducts 
        cartItems={cartItems.map(item => item.id)}
        addToCart={addToCart}
        wishlist={wishlist}
        addToWishlist={addToWishlist}
      />
      
      <CTASection />
      
      <Footer />
      
      <SearchModal 
        showSearchModal={showSearchModal}
        setShowSearchModal={setShowSearchModal}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default Home;
