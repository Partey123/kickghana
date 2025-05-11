
import { ReactNode, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Access Denied",
        description: "Please log in to access your profile",
        variant: "destructive",
      });
      navigate("/auth/login", { replace: true });
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return null;
  }
  
  return <>{children}</>;
};

export default RouteGuard;
