
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  // In a real app, we would check for authentication here
  // For now, we'll simulate this by checking if there's at least one item in the cart
  const { totalItems } = useCart();
  
  // This is a simplified logic for demonstration
  // In a real app with auth, we would use something like: const isLoggedIn = useAuth().isAuthenticated;
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  if (!isLoggedIn) {
    toast({
      title: "Access Denied",
      description: "Please log in to access your profile",
      variant: "destructive",
    });
    
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default RouteGuard;
