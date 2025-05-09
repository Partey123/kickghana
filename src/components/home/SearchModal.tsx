
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

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
  if (!showSearchModal) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Search Products</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-500"
            onClick={() => setShowSearchModal(false)}
          >
            &times;
          </Button>
        </div>
        
        <form onSubmit={handleSearch}>
          <div className="flex">
            <input
              type="search"
              placeholder="Search for sneakers..."
              className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" className="rounded-l-none bg-amber-500 hover:bg-amber-600">
              <Search size={18} />
            </Button>
          </div>
        </form>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Popular searches</h4>
          <div className="flex flex-wrap gap-2">
            {["Running", "Basketball", "Casual", "Limited Edition"].map((term, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm"
                className="text-xs"
                onClick={() => setSearchTerm(term)}
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchModal;
