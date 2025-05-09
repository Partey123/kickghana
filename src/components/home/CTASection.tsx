
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-800 via-red-700 to-amber-600">
          {/* Enhanced milk splatter overlays */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white blur-xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-white blur-xl"></div>
            <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-white blur-lg"></div>
            <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-white blur-xl"></div>
          </div>
          
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Join Our Sneaker Community</h2>
              <p className="text-lg mb-6 text-amber-100">Get exclusive access to limited drops, special discounts, and events across Ghana.</p>
              <Button className="bg-white hover:bg-amber-100 text-red-900 font-bold px-8 py-6 text-lg">
                Sign Up Now
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-end">
              <motion.img 
                src="/sneakers-group.png" 
                alt="Sneaker Collection" 
                className="max-w-full h-auto"
                initial={{ rotate: 6 }}
                animate={{ 
                  rotate: [6, 8, 6],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
