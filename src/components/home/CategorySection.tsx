
import { motion } from "framer-motion";

// Categories with real images
const categories = [
  { 
    id: 1, 
    name: "Running", 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    count: 24 
  },
  { 
    id: 2, 
    name: "Basketball", 
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    count: 18 
  },
  { 
    id: 3, 
    name: "Casual", 
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    count: 32 
  },
  { 
    id: 4, 
    name: "Training", 
    image: "https://images.unsplash.com/photo-1606890658317-7d14490b76fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    count: 16 
  }
];

const CategorySection = () => {
  return (
    <section id="categories" className="py-20 px-4 md:px-8 bg-accent/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Categories</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-secondary">Shop by Category</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <motion.div 
              key={category.id} 
              className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Category Image */}
              <div className="absolute inset-0">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold">{category.name}</h3>
                <p className="text-white/70 mt-1">{category.count} Products</p>
                <div className="mt-4 overflow-hidden h-8">
                  <span className="inline-flex items-center rounded-full bg-primary/20 px-4 py-1 text-sm text-primary transition-transform duration-300 translate-y-8 group-hover:translate-y-0">
                    Shop Now
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
