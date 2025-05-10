
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

interface LoadingAnimationProps {
  message?: string;
}

const LoadingAnimation = ({ message = "Loading" }: LoadingAnimationProps) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        return prev.length >= 3 ? "" : prev + ".";
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-secondary/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      {/* Background pattern elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-primary/20 blur-2xl"></div>
        <div className="absolute top-2/3 left-1/2 w-72 h-72 rounded-full bg-primary/30 blur-2xl"></div>
      </div>
      
      {/* Main content */}
      <div className="z-10 flex flex-col items-center">
        {/* Sneaker Icons */}
        <div className="mb-8">
          <div className="flex justify-center gap-6">
            {["👟", "👞", "👢"].map((emoji, i) => (
              <motion.div
                key={i}
                className="text-4xl md:text-6xl"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  delay: i * 0.2
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Brand Logo */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white">
            <span>KICK</span>
            <span className="text-primary">GHANA</span>
          </h2>
        </motion.div>
        
        {/* Loading Indicator */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <RefreshCcw className="text-primary w-6 h-6" />
          </motion.div>
          
          <p className="text-white/80 text-lg font-medium">
            {message}{dots}
          </p>
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20"></div>
    </div>
  );
};

export default LoadingAnimation;
