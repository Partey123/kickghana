
import { Link, useLocation } from "react-router-dom";
import { Gift } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { promotions } from "@/data/promotions";
import { motion } from "framer-motion";

const DesktopNavLinks = () => {
  const location = useLocation();
  
  const navItems = [
    { to: "/home", label: "Home" },
    { to: "/collections", label: "Collections" },
    { to: "/men", label: "Men" },
    { to: "/women", label: "Women" },
    { to: "/accessories", label: "Accessories" },
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
      
      {/* Promotions Menu */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="font-medium bg-transparent hover:bg-primary/10 hover:text-primary rounded-full px-4 py-2 h-auto">
              <motion.span 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Gift className="mr-1 h-4 w-4" />
                Promotions
              </motion.span>
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
    </div>
  );
};

export default DesktopNavLinks;
