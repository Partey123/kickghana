
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNavLinks from "./navbar/DesktopNavLinks";
import DesktopActionIcons from "./navbar/DesktopActionIcons";
import MobileMenu from "./navbar/MobileMenu";
import AdvancedSearch from "./search/AdvancedSearch";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
}

const Navbar = ({ cartItemsCount = 0, onCartClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle cart click
  const handleCartClick = (e: React.MouseEvent) => {
    if (onCartClick) {
      e.preventDefault();
      onCartClick();
    }
  };

  const handleSearchSubmit = (query: string) => {
    toast({
      title: "Searching",
      description: `Searching for "${query}"`,
    });
    navigate(`/collections?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  };

  const handleProductSelect = (id: number) => {
    navigate(`/product/${id}`);
    setSearchOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavbarLogo />
          
          {/* Desktop Navigation */}
          <DesktopNavLinks />
          
          {/* Desktop Icons */}
          <DesktopActionIcons 
            cartItemsCount={cartItemsCount}
            onCartClick={handleCartClick}
            onSearchClick={() => setSearchOpen(!searchOpen)}
          />
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)} 
              className="p-2"
            >
              <Search size={20} />
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="transition-colors duration-300 hover:text-primary"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-background shadow-md py-4 px-6 transform origin-top"
          >
            <div className="max-w-2xl mx-auto">
              <AdvancedSearch onSelect={handleProductSelect} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onCartClick={() => {
          if (onCartClick) {
            onCartClick();
          } else {
            navigate("/cart");
          }
        }}
        cartItemsCount={cartItemsCount}
        onSearchSubmit={handleSearchSubmit}
      />
    </header>
  );
};

export default Navbar;
