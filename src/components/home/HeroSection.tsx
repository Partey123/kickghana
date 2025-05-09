
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-10 px-4 md:px-8 relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/90 to-secondary/70 z-0">
        <div className="absolute inset-0 opacity-10">
          {/* Abstract patterns */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/30 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-primary/20 blur-2xl"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        {/* Text Content */}
        <div className="text-white space-y-8">
          <motion.span 
            className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            New Collection 2025
          </motion.span>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="block">Step into</span>
            <span className="text-primary">Excellence</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-white/80 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Premium footwear with authentic Ghanaian style and craftsmanship. 
            Elevate your style with our luxurious collection.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              className="bg-primary text-secondary hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-medium"
              onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Shop Collection
            </Button>
            <Button 
              variant="outline" 
              className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-full px-8 py-6 text-lg font-medium"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
        
        {/* Hero Image */}
        <div className="relative flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.7, type: "spring" }}
            className="relative"
          >
            <div className="relative z-10 animate-float">
              <img 
                src="/hero-sneaker.png" 
                alt="Premium Sneakers" 
                className="max-h-[70vh] object-contain drop-shadow-2xl"
              />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/40 to-primary/10 rounded-full blur-3xl z-0 animate-pulse"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <div className="w-0.5 h-8 bg-white/30">
          <motion.div 
            className="w-full h-1/3 bg-primary" 
            animate={{ y: [0, 16, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
