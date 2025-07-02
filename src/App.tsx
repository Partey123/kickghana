
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";
import RouteGuard from "./components/RouteGuard";
import AdminGuard from "./components/admin/AdminGuard";
import "./App.css";

const queryClient = new QueryClient();

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Home = lazy(() => import("./pages/Home"));
const Collections = lazy(() => import("./pages/Collections"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const OrderTracking = lazy(() => import("./pages/OrderTracking"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Men = lazy(() => import("./pages/Men"));
const Women = lazy(() => import("./pages/Women"));
const About = lazy(() => import("./pages/About"));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="kickghana-ui-theme">
        <AuthProvider>
          <CartProvider>
            <LoadingProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                      {/* Public routes */}
                      <Route path="/" element={<Index />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/collections" element={<Collections />} />
                      <Route path="/men" element={<Men />} />
                      <Route path="/women" element={<Women />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/onboarding" element={<Onboarding />} />
                      
                      {/* Protected routes */}
                      <Route path="/cart" element={
                        <RouteGuard>
                          <Cart />
                        </RouteGuard>
                      } />
                      <Route path="/profile" element={
                        <RouteGuard>
                          <Profile />
                        </RouteGuard>
                      } />
                      <Route path="/checkout" element={
                        <RouteGuard>
                          <Checkout />
                        </RouteGuard>
                      } />
                      <Route path="/order-success/:orderId" element={
                        <RouteGuard>
                          <OrderSuccess />
                        </RouteGuard>
                      } />
                      <Route path="/order-tracking/:orderId" element={
                        <RouteGuard>
                          <OrderTracking />
                        </RouteGuard>
                      } />
                      <Route path="/wishlist" element={
                        <RouteGuard>
                          <Wishlist />
                        </RouteGuard>
                      } />
                      <Route path="/admin" element={
                        <AdminGuard>
                          <AdminDashboard />
                        </AdminGuard>
                      } />
                      
                      {/* 404 route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </TooltipProvider>
            </LoadingProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
