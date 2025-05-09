import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Heart, ShoppingBag, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import { featuredSneakers } from "@/data/products";

const Profile = () => {
  const { wishlist } = useCart();
  const navigate = useNavigate();
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: "Samuel Adeku",
    email: "samuel@example.com",
    phone: "+233 50 123 4567",
    address: "123 Independence Ave, Accra, Ghana",
  });

  // Mock order history data
  const orderHistory = [
    {
      id: "ORD-2025-1432",
      date: "May 7, 2025",
      total: "₵1,450",
      status: "Delivered",
    },
    {
      id: "ORD-2025-1398",
      date: "April 23, 2025",
      total: "₵850",
      status: "Processing",
    }
  ];

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C]/5">
      <Navbar 
        cartItemsCount={0} 
        onCartClick={() => navigate("/cart")}
      />
      
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarFallback className="bg-primary text-secondary text-xl">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-secondary">My Account</h1>
            <p className="text-muted-foreground">Manage your profile and preferences</p>
          </div>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="text-sm">
              <User size={16} className="mr-2" /> Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-sm">
              <ShoppingBag size={16} className="mr-2" /> Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="text-sm">
              <Heart size={16} className="mr-2" /> Wishlist
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
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
                      value={userData.name} 
                      onChange={handleInputChange('name')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={userData.email} 
                      onChange={handleInputChange('email')} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={userData.phone} 
                      onChange={handleInputChange('phone')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Default Address</Label>
                    <Input 
                      id="address" 
                      value={userData.address} 
                      onChange={handleInputChange('address')}
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your recent orders</CardDescription>
              </CardHeader>
              <CardContent>
                {orderHistory.length > 0 ? (
                  <div className="divide-y">
                    {orderHistory.map((order) => (
                      <div key={order.id} className="py-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-secondary">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.total}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "Delivered" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-medium text-secondary">No orders yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You haven't placed any orders yet.
                    </p>
                    <div className="mt-6">
                      <Button onClick={() => navigate('/home')}>Start Shopping</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Items you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map(id => {
                      // Find product details from featured products
                      const product = featuredSneakers.find(p => p.id === id);
                      if (!product) return null;
                      
                      return (
                        <div key={id} className="border rounded-lg p-4 flex space-x-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-secondary">{product.name}</h3>
                            <p className="text-primary font-semibold">{product.price}</p>
                            <div className="mt-2 flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/product/${id}`)}
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-medium text-secondary">No items in wishlist</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You haven't added any items to your wishlist yet.
                    </p>
                    <div className="mt-6">
                      <Button onClick={() => navigate('/home')}>Explore Products</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
