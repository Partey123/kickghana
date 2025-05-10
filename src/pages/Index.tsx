
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Welcome to <span className="text-primary">KickGhana</span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Premium footwear with authentic Ghanaian style and craftsmanship.
            Discover our exclusive collection today.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link to="/home">
              <Button 
                className="bg-primary text-secondary hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-medium"
              >
                Explore Collection
              </Button>
            </Link>
            <Link to="/onboarding">
              <Button 
                variant="outline" 
                className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full px-8 py-6 text-lg font-medium"
              >
                Get Started
              </Button>
            </Link>
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
