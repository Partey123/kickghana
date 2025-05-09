
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchModalProps {
  showSearchModal: boolean;
  setShowSearchModal: (show: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchModal = ({ 
  showSearchModal, 
  setShowSearchModal, 
  searchTerm, 
  setSearchTerm, 
  handleSearch 
}: SearchModalProps) => {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSearchModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setShowSearchModal]);

  // Recent searches
  const recentSearches = ["Air Max", "Casual Sneakers", "Gold Accent", "Limited Edition"];
  
  if (!showSearchModal) return null;
  
  return (
    <AnimatePresence>
      {showSearchModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center"
          onClick={() => setShowSearchModal(false)}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mt-24 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-secondary">Search Products</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-500 hover:text-secondary"
                onClick={() => setShowSearchModal(false)}
              >
                <X size={20} />
              </Button>
            </div>
            
            {/* Search Form */}
            <div className="p-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="search"
                  placeholder="Search for sneakers..."
                  className="pl-10 pr-4 py-6 w-full rounded-full border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-secondary hover:bg-primary/90 rounded-full px-6 py-2"
                >
                  Search
                </Button>
              </form>
            </div>
            
            {/* Recent Searches */}
            <div className="px-4 pb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Recent Searches</h4>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm"
                    className="rounded-full text-sm border-gray-200 hover:bg-primary hover:text-secondary hover:border-primary"
                    onClick={() => setSearchTerm(term)}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Popular Categories */}
            <div className="bg-gray-50 px-4 py-4 border-t">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Popular Categories</h4>
              <div className="flex flex-wrap gap-2">
                {["Running", "Basketball", "Casual", "Training", "Limited Edition"].map((category, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm"
                    className="rounded-full text-sm border-gray-200 hover:bg-primary hover:text-secondary hover:border-primary bg-white"
                    onClick={() => {
                      setSearchTerm(category);
                      handleSearch(new Event('submit') as any);
                    }}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
