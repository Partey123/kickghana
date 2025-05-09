
import { motion } from "framer-motion";

// Mock data for categories
const categories = [
  { id: 1, name: "Running", image: "/category-running.png" },
  { id: 2, name: "Basketball", image: "/category-basketball.png" },
  { id: 3, name: "Casual", image: "/category-casual.png" },
  { id: 4, name: "Training", image: "/category-training.png" }
];

const CategorySection = () => {
  return (
    <section id="categories" className="py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-red-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <motion.div 
              key={category.id} 
              className="bg-gradient-to-b from-red-900/5 to-amber-200/30 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              whileHover={{ y: -5 }}
            >
              <div className="aspect-square relative overflow-hidden rounded-md bg-white flex items-center justify-center">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="w-full p-4">
                    <a href="#" className="block w-full text-center text-white font-semibold hover:underline">
                      View All
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="mt-2 text-center font-semibold text-amber-900">{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
