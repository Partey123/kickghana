
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/ui/language-selector";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

interface DesktopActionIconsProps {
  cartItemsCount: number;
  onCartClick: (e: React.MouseEvent) => void;
  onSearchClick: () => void;
  showCurrencySelector?: boolean;
}

const DesktopActionIcons = ({
  cartItemsCount = 0,
  onCartClick,
  onSearchClick,
  showCurrencySelector = true
}: DesktopActionIconsProps) => {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ThemeToggle />
      
      {showCurrencySelector && <LanguageSelector />}
      
      <button 
        onClick={onSearchClick}
        className="transition-colors duration-300 hover:text-primary"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Search size={20} strokeWidth={1.5} />
        </motion.div>
      </button>
      
      <Link to="/wishlist" className="transition-colors duration-300 hover:text-primary">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Heart size={20} strokeWidth={1.5} />
        </motion.div>
      </Link>
      
      <Link 
        to="/cart" 
        onClick={onCartClick}
        className="transition-colors duration-300 relative hover:text-primary"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <ShoppingBag size={20} strokeWidth={1.5} />
          <AnimatePresence>
            {cartItemsCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
              >
                {cartItemsCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>
      
      <div className="relative group"
        onMouseEnter={() => setShowUserMenu(true)}
        onMouseLeave={() => setShowUserMenu(false)}
      >
        {user ? (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="transition-colors duration-300 hover:text-primary cursor-pointer"
          >
            <User size={20} strokeWidth={1.5} />
          </motion.div>
        ) : (
          <Link to="/auth/login" className="transition-colors duration-300 hover:text-primary">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <User size={20} strokeWidth={1.5} />
            </motion.div>
          </Link>
        )}
        
        <AnimatePresence>
          {user && showUserMenu && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1 z-40"
            >
              <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                My Profile
              </Link>
              <Link to="/wishlist" className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                My Wishlist
              </Link>
              <Link to="/order-tracking" className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                Order Tracking
              </Link>
              <button 
                onClick={signOut}
                className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-accent hover:text-accent-foreground"
              >
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DesktopActionIcons;
