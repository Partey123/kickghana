
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, Award, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Passion for Quality",
      description: "We carefully curate every pair of shoes to ensure the highest quality and comfort for our customers."
    },
    {
      icon: <Award className="h-8 w-8 text-amber-600" />,
      title: "Authentic Products",
      description: "All our products are 100% authentic, sourced directly from authorized distributors and brand partners."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. We strive to provide exceptional service and support."
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: "Ghanaian Heritage",
      description: "Proudly Ghanaian, we celebrate local culture while bringing global fashion trends to our community."
    }
  ];

  return (
    <div className="min-h-screen bg-background/80">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            About KickGhana
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            KickGhana is Ghana's premier destination for authentic, high-quality footwear. 
            Founded with a passion for bringing the world's best sneakers and shoes to Ghana, 
            we combine international style with local values.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          <div>
            <h2 className="text-3xl font-bold text-secondary mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                KickGhana was born from a simple observation: Ghanaians love great shoes, 
                but accessing authentic, high-quality footwear was often challenging and expensive.
              </p>
              <p>
                Our founders, passionate sneakerheads themselves, decided to bridge this gap by 
                creating a platform that brings the world's best footwear brands directly to Ghana, 
                with fair pricing and exceptional customer service.
              </p>
              <p>
                Today, we're proud to serve thousands of customers across Ghana, helping them 
                express their style and personality through premium footwear.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Shoe store interior"
              className="rounded-2xl shadow-lg w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-secondary text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-lg">
                <CardContent className="space-y-4">
                  <div className="flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-secondary">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-secondary mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            To make premium footwear accessible to every Ghanaian, while building a community 
            of style enthusiasts who appreciate quality, authenticity, and exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/collections">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Shop Our Collection
              </Button>
            </Link>
            <Link to="/home">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: "10,000+", label: "Happy Customers" },
            { number: "500+", label: "Products Available" },
            { number: "50+", label: "Partner Brands" },
            { number: "3", label: "Years of Excellence" }
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
