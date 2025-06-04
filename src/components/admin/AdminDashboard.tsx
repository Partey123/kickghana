
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Eye, Users, DollarSign, TrendingUp, Bell, Plus, Edit, Settings } from "lucide-react";
import { motion } from "framer-motion";
import OrdersManagement from "./OrdersManagement";
import ProductsManagement from "./ProductsManagement";
import DashboardOverview from "./DashboardOverview";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Dashboard Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders Management</TabsTrigger>
          <TabsTrigger value="products">Products & Inventory</TabsTrigger>
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
