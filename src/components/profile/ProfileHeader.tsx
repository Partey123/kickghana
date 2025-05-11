
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
  name: string;
  avatarUrl?: string;
}

const ProfileHeader = ({ name, avatarUrl }: ProfileHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 flex items-center space-x-4"
    >
      <Avatar className="h-16 w-16 border-2 border-primary">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt={name} />
        ) : (
          <AvatarFallback className="bg-primary text-secondary text-xl">
            {name ? name.split(' ').map(n => n[0]).join('') : "U"}
          </AvatarFallback>
        )}
      </Avatar>
      <div>
        <h1 className="text-3xl font-bold text-secondary">My Account</h1>
        <p className="text-muted-foreground">Manage your profile and preferences</p>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
