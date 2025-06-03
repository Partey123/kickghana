
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import ZapierSettings from "@/components/admin/ZapierSettings";

const ZapierConfig = () => {
  return (
    <div className="min-h-screen bg-background/80">
      <Navbar cartItemsCount={0} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Email Notifications Setup
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Configure Zapier to automatically send order notifications to your email when customers place orders.
          </p>
        </div>
        
        <ZapierSettings />
      </div>
      
      <Footer />
    </div>
  );
};

export default ZapierConfig;
