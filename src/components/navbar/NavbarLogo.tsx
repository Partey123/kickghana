
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface NavbarLogoProps {
  className?: string;
}

const NavbarLogo = ({ className = "" }: NavbarLogoProps) => {
  return (
    <Link to="/home" className={`flex items-center ${className}`}>
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <h1 className="text-2xl font-bold transition-colors duration-300">
          <span className="font-serif font-black">KICK</span>
          <span className="text-primary">GHANA</span>
        </h1>
      </motion.div>
    </Link>
  );
};

export default NavbarLogo;
