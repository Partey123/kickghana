
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { toast } from "@/components/ui/use-toast";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";
import SearchModal from "@/components/home/SearchModal";

const Home = () => {
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Searching",
      description: `Searching for "${searchTerm}"`,
    });
    setShowSearchModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Navbar cartItemsCount={cartItems.length} />
      
      <HeroSection />
      
      <CategorySection />
      
      <FeaturedProducts 
        cartItems={cartItems}
        setCartItems={setCartItems}
        wishlist={wishlist}
        setWishlist={setWishlist}
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
