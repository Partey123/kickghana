
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
import { Button } from "@/components/ui/button";

const Home = () => {
  const { addToCart, totalItems, cartItems, addToWishlist, wishlist } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const navigate = useNavigate();
  
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

  // Simple login/logout functionality for demonstration
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    toast({
      title: "Logged In",
      description: "You are now logged in",
    });
    // Force component re-render
    window.location.reload();
  };
  
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    toast({
      title: "Logged Out",
      description: "You have been logged out",
    });
    // Force component re-render
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background/80">
      <Navbar cartItemsCount={totalItems} onCartClick={handleCartClick} />
      
      {/* Login/Logout Button (temporary for demonstration) */}
      <div className="fixed top-20 right-4 z-50">
        {isLoggedIn ? (
          <Button 
            variant="outline" 
            className="bg-red-600/20 text-white border-red-600/50 hover:bg-red-600/30"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button 
            variant="outline"
            className="bg-green-600/20 text-white border-green-600/50 hover:bg-green-600/30"
            onClick={handleLogin}
          >
            Login
          </Button>
        )}
      </div>
      
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
