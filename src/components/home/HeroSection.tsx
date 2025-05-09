
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative pt-16 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 to-amber-800/70 z-10"></div>
                <div className="absolute z-20 text-white max-w-xl p-10 top-1/2 transform -translate-y-1/2">
                  <h1 className="text-4xl md:text-6xl font-black mb-4">Step into Ghanaian Excellence</h1>
                  <p className="text-lg md:text-xl mb-6">Premium footwear with authentic Ghanaian style and quality craftsmanship.</p>
                  <Button 
                    className="bg-amber-500 hover:bg-amber-600 text-red-900 font-bold"
                    onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Shop Now
                  </Button>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full">
                  <motion.img 
                    src="/hero-sneaker.png" 
                    alt="Premium Sneakers" 
                    className="absolute bottom-0 right-5 md:right-10 w-auto h-4/5 object-contain"
                    initial={{ rotate: 12, y: 20 }}
                    animate={{ 
                      rotate: [12, 15, 12],
                      y: [20, 10, 20]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-green-800/50 z-10"></div>
                <div className="absolute z-20 text-white max-w-xl p-10 top-1/2 transform -translate-y-1/2">
                  <h1 className="text-4xl md:text-6xl font-black mb-4">New Collection Arrived</h1>
                  <p className="text-lg md:text-xl mb-6">Limited edition sneakers inspired by Ghana's rich culture.</p>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-amber-100 font-bold"
                    onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Explore Collection
                  </Button>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full">
                  <motion.div
                    className="absolute bottom-0 right-5 md:right-10 w-auto h-4/5 flex items-end"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-9xl">👟</span>
                    <span className="text-8xl ml-4 mb-6">👞</span>
                    <span className="text-7xl ml-4 mb-12">🥾</span>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
};

export default HeroSection;
