
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/90">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-0 right-0 h-96 w-96 bg-primary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 h-96 w-96 bg-primary/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center">
            {/* Content */}
            <div className="md:w-1/2 p-10 md:p-16 text-white">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Join Our <span className="text-primary">Sneaker</span> Community
              </motion.h2>
              
              <motion.p 
                className="text-white/80 text-lg mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Get exclusive access to limited drops, special discounts, and events across Ghana. 
                Be the first to know about our latest collections and offers.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-6 py-3 rounded-full text-secondary outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="bg-primary hover:bg-primary/90 text-secondary font-medium rounded-full px-8">
                  Sign Up
                </Button>
              </motion.div>
            </div>
            
            {/* Image */}
            <div className="md:w-1/2 p-8 flex justify-center">
              <motion.img 
                src="/sneakers-group.png" 
                alt="Sneaker Collection" 
                className="max-w-full h-auto drop-shadow-xl"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
