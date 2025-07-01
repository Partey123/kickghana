
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import AdminDashboard from "@/components/admin/AdminDashboard";

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-background/80">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Admin Dashboard
          </h1>
          <p className="text-black/80 max-w-2xl mx-auto">
            Monitor and manage all orders, customer information, and store analytics in real-time.
          </p>
        </div>
        
        <AdminDashboard />
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
