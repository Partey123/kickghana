
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already authenticated, redirect them to home page
    if (!loading && user) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          {/* Absolute positioned theme toggle for landing page */}
          <div className="absolute top-8 right-8">
            <ThemeToggle />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold">
            Welcome to <span className="text-primary">KickGhana</span>
          </h1>
          
          <p className="text-xl max-w-2xl mx-auto">
            Premium footwear with authentic Ghanaian style and craftsmanship.
            Discover our exclusive collection today.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link to="/home">
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-medium"
              >
                Explore Collection
              </Button>
            </Link>
            
            <div className="w-full mt-4"></div>
            
            {!user && (
              <>
                <Link to="/auth/signup">
                  <Button 
                    variant="outline" 
                    className="border-border bg-background/20 backdrop-blur-sm hover:bg-background/30 rounded-full px-8 py-6 text-lg font-medium"
                  >
                    Sign Up
                  </Button>
                </Link>
                
                <Link to="/auth/login">
                  <Button 
                    variant="secondary" 
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full px-8 py-6 text-lg font-medium"
                  >
                    Log In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
        
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
