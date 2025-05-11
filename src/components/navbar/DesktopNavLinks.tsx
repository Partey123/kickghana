
import { Link } from "react-router-dom";
import { Gift } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { promotions } from "@/data/promotions";
import { motion } from "framer-motion";

const DesktopNavLinks = () => {
  return (
    <div className="hidden md:flex items-center space-x-2">
      <Link to="/home" className="px-3 font-medium transition-colors duration-300 hover:text-primary">Home</Link>
      <Link to="/collections" className="px-3 font-medium transition-colors duration-300 hover:text-primary">Collections</Link>
      
      {/* Promotions Menu */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-medium bg-transparent hover:bg-transparent hover:text-primary">
              <span className="flex items-center">
                <Gift className="mr-1 h-4 w-4" />
                Promotions
              </span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {promotions.slice(0, 4).map((promo) => (
                  <motion.li 
                    key={promo.id}
                    whileHover={{ scale: 1.02 }}
                  >
                    <NavigationMenuLink asChild>
                      <Link
                        to={`/promotions/${promo.id}`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{promo.title}</div>
                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                          {promo.description.substring(0, 80)}...
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </motion.li>
                ))}
                <li className="col-span-2">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/promotions"
                      className="block select-none rounded-md p-3 text-center text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      View All Promotions
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <Link to="/men" className="px-3 font-medium transition-colors duration-300 hover:text-primary">Men</Link>
      <Link to="/women" className="px-3 font-medium transition-colors duration-300 hover:text-primary">Women</Link>
      <Link to="/accessories" className="px-3 font-medium transition-colors duration-300 hover:text-primary">Accessories</Link>
      <Link to="/about" className="px-3 font-medium transition-colors duration-300 hover:text-primary">About</Link>
    </div>
  );
};

export default DesktopNavLinks;
