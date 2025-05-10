
import React, { createContext, useContext, useState } from "react";
import LoadingAnimation from "@/components/ui/loading-animation";

interface LoadingContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading");
  
  const showLoading = (message = "Loading") => {
    setLoadingMessage(message);
    setIsLoading(true);
  };
  
  const hideLoading = () => {
    setIsLoading(false);
  };
  
  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
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
