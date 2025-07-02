
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search, Heart, User, X, Menu, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageSelector } from "@/components/ui/language-selector";
import AdvancedSearch from "@/components/search/AdvancedSearch";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCartClick: (e: React.MouseEvent) => void;
  cartItemsCount: number;
  onSearchSubmit: (query: string) => void;
}

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  onCartClick,
  cartItemsCount,
  onSearchSubmit
}: MobileMenuProps) => {
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSignOut = async () => {
    await signOut();
    onClose();
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
    setSearchQuery("");
    onClose();
  };

  const handleProductSelect = (id: number) => {
    onClose();
  };

  const handleCartClick = (e: React.MouseEvent) => {
    onCartClick(e);
    onClose();
  };
  
  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.3 }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden fixed top-0 right-0 w-[80vw] max-w-sm h-full bg-background shadow-lg z-50 overflow-auto"
          >
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-accent/50"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <AdvancedSearch 
                onSelect={handleProductSelect} 
                className="mb-6" 
              />
            </div>
            
            <nav className="px-4 py-2">
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/home"
                    className="block py-2 px-3 rounded-md hover:bg-accent"
                    onClick={onClose}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/collections"
                    className="block py-2 px-3 rounded-md hover:bg-accent"
                    onClick={onClose}
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/men"
                    className="block py-2 px-3 rounded-md hover:bg-accent"
                    onClick={onClose}
                  >
                    Men
                  </Link>
                </li>
                <li>
                  <Link
                    to="/women"
                    className="block py-2 px-3 rounded-md hover:bg-accent"
                    onClick={onClose}
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block py-2 px-3 rounded-md hover:bg-accent"
                    onClick={onClose}
                  >
                    About
                  </Link>
                </li>
              </ul>
              
              <div className="border-t my-4"></div>
              
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/cart" 
                    onClick={handleCartClick}
                    className="block py-2 px-3 rounded-md hover:bg-accent flex items-center justify-between"
                  >
                    <span className="flex items-center">
                      <ShoppingBag size={16} className="mr-2" />
                      Cart
                    </span>
                    {cartItemsCount > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className="block py-2 px-3 rounded-md hover:bg-accent"
                    onClick={onClose}
                  >
                    <span className="flex items-center">
                      <Heart size={16} className="mr-2" />
                      Wishlist
                    </span>
                  </Link>
                </li>
                
                {user ? (
                  <>
                    <li>
                      <Link
                        to="/profile"
                        className="block py-2 px-3 rounded-md hover:bg-accent"
                        onClick={onClose}
                      >
                        <span className="flex items-center">
                          <User size={16} className="mr-2" />
                          My Profile
                        </span>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left block py-2 px-3 rounded-md text-red-600 dark:text-red-400 hover:bg-accent"
                      >
                        Sign Out
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      className="block py-2 px-3 rounded-md hover:bg-accent"
                      onClick={onClose}
                    >
                      <span className="flex items-center">
                        <User size={16} className="mr-2" />
                        Login
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
              <div className="flex items-center justify-between">
                <ThemeToggle />
                <LanguageSelector />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
