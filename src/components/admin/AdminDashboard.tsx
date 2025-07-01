
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersManagement from "./OrdersManagement";
import ProductsManagement from "./ProductsManagement";
import DashboardOverview from "./DashboardOverview";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white">
          <TabsTrigger value="overview" className="text-black data-[state=active]:text-black data-[state=active]:bg-gray-100">Dashboard Overview</TabsTrigger>
          <TabsTrigger value="orders" className="text-black data-[state=active]:text-black data-[state=active]:bg-gray-100">Orders Management</TabsTrigger>
          <TabsTrigger value="products" className="text-black data-[state=active]:text-black data-[state=active]:bg-gray-100">Products & Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <DashboardOverview />
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-6">
          <OrdersManagement />
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6">
          <ProductsManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
