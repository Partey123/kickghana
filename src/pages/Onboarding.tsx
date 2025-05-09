
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Onboarding = () => {
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show logo after sneakers animation
    const logoTimer = setTimeout(() => setShowLogo(true), 1800);
    // Show button after logo animation
    const buttonTimer = setTimeout(() => setShowButton(true), 2500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  // Sneaker emojis array
  const sneakerEmojis = ["👟", "👞", "👠", "👡", "👢", "🥾", "🥿"];

  return (
    <div className="h-screen w-full bg-gradient-to-r from-red-900 via-amber-700 to-amber-500 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Enhanced milk splatters with more dynamic positioning */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-white blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-white blur-xl"></div>
        <div className="absolute top-2/3 left-1/2 w-48 h-48 rounded-full bg-white blur-lg"></div>
        <div className="absolute top-1/5 right-1/4 w-64 h-64 rounded-full bg-white blur-lg"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-white blur-xl"></div>
      </div>
      
      {/* Enhanced green bubbles with more variations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-10 w-20 h-20 rounded-full bg-green-600/20 blur-sm"></div>
        <div className="absolute top-1/4 right-20 w-16 h-16 rounded-full bg-green-700/20 blur-sm"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 rounded-full bg-green-500/20 blur-sm"></div>
        <div className="absolute top-3/4 right-1/4 w-28 h-28 rounded-full bg-green-800/20 blur-sm"></div>
        <div className="absolute top-1/3 left-2/3 w-32 h-32 rounded-full bg-green-400/30 blur-md"></div>
      </div>
      
      {/* Sneaker emoji animation container with enhanced animation */}
      <div className="h-32 w-full relative mb-12">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: window.innerWidth + 100, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute top-0"
        >
          <div className="flex space-x-6">
            {sneakerEmojis.map((emoji, index) => (
              <motion.div 
                key={index}
                className="text-7xl"
                initial={{ rotate: 0, y: 0 }}
                animate={{ 
                  rotate: index % 2 === 0 ? [0, 15, 0, 15, 0] : [0, -15, 0, -15, 0],
                  y: [0, -10, 0, -5, 0]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  delay: index * 0.1 
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Enhanced logo with swoosh animation */}
      {showLogo && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="mb-12"
        >
          <div className="relative">
            <h1 className="text-7xl font-black tracking-tighter z-10 relative drop-shadow-lg">
              <span className="text-red-600">Kick</span>
              <span className="text-amber-400">Ghana</span>
              <span className="ml-2 text-5xl">👟</span>
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-0 h-3 bg-green-600 rounded-full shadow-lg"
            ></motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Enhanced CTA button with improved breathing animation */}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                "0px 0px 0px rgba(0,0,0,0.2)", 
                "0px 15px 25px rgba(0,0,0,0.4)", 
                "0px 0px 0px rgba(0,0,0,0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Button 
              onClick={() => navigate("/home")} 
              className="text-lg font-semibold px-8 py-6 bg-gradient-to-r from-red-800 to-amber-600 hover:from-red-900 hover:to-amber-700 text-white rounded-full shadow-lg"
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Onboarding;
