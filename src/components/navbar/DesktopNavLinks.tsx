
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const DesktopNavLinks = () => {
  const location = useLocation();
  
  const navItems = [
    { to: "/home", label: "Home" },
    { to: "/collections", label: "Collections" },
    { to: "/men", label: "Men" },
    { to: "/women", label: "Women" },
    { to: "/about", label: "About" },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="hidden md:flex items-center space-x-1">
      {navItems.map((item) => (
        <Link key={item.to} to={item.to}>
          <Button
            variant="ghost"
            className={`
              px-4 py-2 h-auto font-medium transition-all duration-300 
              hover:bg-primary/10 hover:text-primary rounded-full
              ${isActive(item.to) 
                ? 'bg-primary/20 text-primary shadow-sm' 
                : 'text-foreground hover:text-primary'
              }
            `}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.span>
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default DesktopNavLinks;
