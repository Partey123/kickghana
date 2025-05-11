
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface UserData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface PersonalInformationProps {
  userData: UserData;
  userId: string;
}

const PersonalInformation = ({ userData, userId }: PersonalInformationProps) => {
  const [localUserData, setLocalUserData] = useState<UserData>(userData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalUserData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Update user profile in Supabase
      const { error } = await supabase
        .from('users')
        .update({
          full_name: localUserData.name,
          phone: localUserData.phone,
        })
        .eq('id', userId);

      if (error) throw error;

      // Also update the auth metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          full_name: localUserData.name,
          phone: localUserData.phone
        }
      });

      if (updateError) throw updateError;

      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Update Failed",
        description: "There was a problem updating your profile.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your account details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={localUserData.name} 
                onChange={handleInputChange('name')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={localUserData.email}
                disabled
                className="bg-gray-50" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={localUserData.phone} 
                onChange={handleInputChange('phone')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Default Address</Label>
              <Input 
                id="address" 
                value={localUserData.address} 
                onChange={handleInputChange('address')}
              />
            </div>
          </div>
          <div className="pt-4">
            <Button onClick={handleSaveProfile} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PersonalInformation;
