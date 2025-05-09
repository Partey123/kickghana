
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
    // Show logo after initial animation
    const logoTimer = setTimeout(() => setShowLogo(true), 800);
    // Show button after logo animation
    const buttonTimer = setTimeout(() => setShowButton(true), 1600);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="h-screen w-full bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-primary/20 blur-2xl"></div>
        <div className="absolute top-2/3 left-1/2 w-72 h-72 rounded-full bg-primary/30 blur-2xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Sneaker Icons */}
          <motion.div 
            className="mb-8"
            variants={childVariants}
          >
            <div className="flex justify-center gap-6">
              {["👟", "👞", "👢", "🥾", "🥿"].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="text-5xl md:text-7xl"
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    delay: i * 0.2
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Brand Logo */}
          {showLogo && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <div className="relative inline-block">
                <h1 className="text-6xl md:text-8xl font-serif font-black text-white">
                  <span>KICK</span>
                  <span className="text-primary">GHANA</span>
                </h1>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="h-1.5 bg-primary absolute -bottom-2 left-0 rounded-full"
                ></motion.div>
              </div>
              <p className="mt-6 text-lg text-white/70 max-w-md mx-auto">
                Premium footwear with authentic Ghanaian style and quality craftsmanship
              </p>
            </motion.div>
          )}
          
          {/* Call to Action */}
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                onClick={() => navigate("/home")} 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-secondary rounded-full font-medium px-8 py-7 text-lg"
              >
                Explore Collection <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20"></div>
    </div>
  );
};

export default Onboarding;
