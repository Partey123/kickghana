
import React, { createContext, useContext, useState, useEffect } from "react";
import LoadingAnimation from "@/components/ui/loading-animation";

interface LoadingContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading");
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Safety timeout to prevent infinite loading
  useEffect(() => {
    if (isLoading) {
      // Set a max loading time of 8 seconds
      const timeout = setTimeout(() => {
        console.log("Loading safety timeout triggered");
        setIsLoading(false);
      }, 8000);
      
      setLoadingTimeout(timeout);
      
      return () => {
        if (loadingTimeout) clearTimeout(loadingTimeout);
      };
    }
  }, [isLoading]);
  
  const showLoading = (message = "Loading") => {
    setLoadingMessage(message);
    setIsLoading(true);
  };
  
  const hideLoading = () => {
    setIsLoading(false);
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
  };
  
  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, isLoading }}>
      {children}
      {isLoading && <LoadingAnimation message={loadingMessage} />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
