
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "@/components/ui/use-toast";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import HotDealsSlider from "@/components/home/HotDealsSlider";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";
import FunctionalSearchModal from "@/components/home/FunctionalSearchModal";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const Home = () => {
  const { addToCart, cartItems, addToWishlist, wishlist } = useCart();
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

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background/80"
    >
      <Navbar />
      
      <HeroSection />
      
      <motion.div
        key="category-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <CategorySection />
      </motion.div>
      
      <motion.div
        key="hot-deals-slider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <HotDealsSlider />
      </motion.div>
      
      <motion.div
        key="featured-products"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <FeaturedProducts 
          cartItems={cartItems.map(item => item.id)}
          addToCart={addToCart}
          wishlist={wishlist}
          addToWishlist={addToWishlist}
        />
      </motion.div>
      
      <motion.div
        key="cta-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <CTASection />
      </motion.div>
      
      <Footer />
      
      <FunctionalSearchModal 
        showSearchModal={showSearchModal}
        setShowSearchModal={setShowSearchModal}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
    </motion.div>
  );
};

export default Home;
