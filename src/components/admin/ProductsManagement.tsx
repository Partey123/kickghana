
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Package, AlertTriangle, Search, Upload, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { featuredSneakers } from "@/data/products";
import { useCurrency } from "@/hooks/useCurrency";

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  isNew?: boolean;
  description?: string;
  features?: string;
  colors?: string[];
  sizes?: number[];
  stock?: number;
}

interface NewProductForm {
  name: string;
  price: string;
  category: string;
  description: string;
  features: string;
  colors: string;
  sizes: string;
  stock: number;
  image: string;
}

const ProductsManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [newProduct, setNewProduct] = useState<NewProductForm>({
    name: "",
    price: "₵",
    category: "",
    description: "",
    features: "",
    colors: "",
    sizes: "",
    stock: 0,
    image: ""
  });

  const { formatPrice } = useCurrency();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    // Load custom products from localStorage
    const customProducts = JSON.parse(localStorage.getItem("admin_products") || "[]");
    
    // Combine with featured sneakers and ensure all have stock property
    const allProducts = [...featuredSneakers, ...customProducts].map(product => ({
      ...product,
      stock: product.stock || Math.floor(Math.random() * 50) + 10
    }));
    
    setProducts(allProducts);
    
    // Update the main products data that the app uses
    updateMainProductsData(allProducts);
  };

  const updateMainProductsData = (updatedProducts: Product[]) => {
    // Update the products data that the main app uses
    localStorage.setItem("app_products", JSON.stringify(updatedProducts));
    
    // Trigger a custom event to notify other parts of the app about product updates
    window.dispatchEvent(new CustomEvent('productsUpdated', { detail: updatedProducts }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setImagePreview(imageDataUrl);
        setNewProduct(prev => ({ ...prev, image: imageDataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview("");
    setNewProduct(prev => ({ ...prev, image: "" }));
  };

  const saveProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const productToSave: Product = {
      ...newProduct,
      id: isEditingProduct && selectedProduct ? selectedProduct.id : Date.now(),
      colors: newProduct.colors ? newProduct.colors.split(',').map(c => c.trim()) : [],
      sizes: newProduct.sizes ? newProduct.sizes.split(',').map(s => parseInt(s.trim())).filter(s => !isNaN(s)) : [],
    };

    let updatedProducts: Product[];

    if (isEditingProduct && selectedProduct) {
      // Update existing product
      updatedProducts = products.map(p => 
        p.id === selectedProduct.id ? productToSave : p
      );
      
      toast({
        title: "Product Updated",
        description: "Product has been successfully updated and will reflect across the app",
      });
    } else {
      // Add new product
      updatedProducts = [...products, productToSave];
      
      toast({
        title: "Product Added",
        description: "New product has been added and is now available in the app",
      });
    }

    setProducts(updatedProducts);
    
    // Save custom products (excluding original featured sneakers)
    const customProducts = updatedProducts.filter(p => !featuredSneakers.find(fp => fp.id === p.id));
    localStorage.setItem("admin_products", JSON.stringify(customProducts));
    
    // Update main app products data
    updateMainProductsData(updatedProducts);

    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      price: "₵",
      category: "",
      description: "",
      features: "",
      colors: "",
      sizes: "",
      stock: 0,
      image: ""
    });
    setImagePreview("");
    setIsAddingProduct(false);
    setIsEditingProduct(false);
    setSelectedProduct(null);
  };

  const deleteProduct = (productId: number) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    
    // Save custom products
    const customProducts = updatedProducts.filter(p => !featuredSneakers.find(fp => fp.id === p.id));
    localStorage.setItem("admin_products", JSON.stringify(customProducts));
    
    // Update main app products data
    updateMainProductsData(updatedProducts);
    
    toast({
      title: "Product Deleted",
      description: "Product has been removed from the app",
    });
    
    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
    }
  };

  const updateStock = (productId: number, newStock: number) => {
    const updatedProducts = products.map(p => 
      p.id === productId ? { ...p, stock: newStock } : p
    );
    setProducts(updatedProducts);
    
    // Save custom products
    const customProducts = updatedProducts.filter(p => !featuredSneakers.find(fp => fp.id === p.id));
    localStorage.setItem("admin_products", JSON.stringify(customProducts));
    
    // Update main app products data
    updateMainProductsData(updatedProducts);
    
    toast({
      title: "Stock Updated",
      description: `Stock updated for ${products.find(p => p.id === productId)?.name}`,
    });
  };

  const editProduct = (product: Product) => {
    setNewProduct({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || "",
      features: product.features || "",
      colors: Array.isArray(product.colors) ? product.colors.join(', ') : '',
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
      stock: product.stock || 0,
      image: product.image
    });
    setImagePreview(product.image);
    setSelectedProduct(product);
    setIsEditingProduct(true);
    setIsAddingProduct(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = products.filter(p => (p.stock || 0) < 10);
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="space-y-6">
      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-red-500">{lowStockProducts.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <Package className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Stock</p>
                <p className="text-2xl font-bold">{products.reduce((sum, p) => sum + (p.stock || 0), 0)}</p>
              </div>
              <Package className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products List */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Products Inventory</CardTitle>
                <CardDescription>Manage your product catalog and stock levels</CardDescription>
              </div>
              <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setIsEditingProduct(false);
                    resetForm();
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{isEditingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                    <DialogDescription>
                      {isEditingProduct ? "Update product information" : "Add a new product to your inventory"}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Product Info */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Product Name *</Label>
                          <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter product name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">Price (Ghana Cedis) *</Label>
                          <Input
                            id="price"
                            value={newProduct.price}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (!value.startsWith('₵')) {
                                setNewProduct(prev => ({ ...prev, price: '₵' + value.replace('₵', '') }));
                              } else {
                                setNewProduct(prev => ({ ...prev, price: value }));
                              }
                            }}
                            placeholder="₵100"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category *</Label>
                          <Select 
                            value={newProduct.category} 
                            onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Running">Running</SelectItem>
                              <SelectItem value="Basketball">Basketball</SelectItem>
                              <SelectItem value="Casual">Casual</SelectItem>
                              <SelectItem value="Training">Training</SelectItem>
                              <SelectItem value="Traditional">Traditional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="stock">Stock Quantity</Label>
                          <Input
                            id="stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                            placeholder="0"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Product description"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="features">Features</Label>
                        <Textarea
                          id="features"
                          value={newProduct.features}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, features: e.target.value }))}
                          placeholder="Product features"
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="colors">Colors (comma separated)</Label>
                          <Input
                            id="colors"
                            value={newProduct.colors}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, colors: e.target.value }))}
                            placeholder="Black, White, Red"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sizes">Sizes (comma separated)</Label>
                          <Input
                            id="sizes"
                            value={newProduct.sizes}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, sizes: e.target.value }))}
                            placeholder="40, 41, 42, 43"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Image Upload */}
                    <div className="space-y-4">
                      <div>
                        <Label>Product Image</Label>
                        <div className="space-y-4">
                          {/* Image Upload */}
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <input
                              type="file"
                              id="image-upload"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <label htmlFor="image-upload" className="cursor-pointer">
                              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                              <p className="text-sm text-gray-600 mb-2">
                                Click to upload image from your device
                              </p>
                              <p className="text-xs text-gray-400">
                                PNG, JPG, JPEG up to 5MB
                              </p>
                            </label>
                          </div>

                          {/* URL Input */}
                          <div className="relative">
                            <Label htmlFor="image-url">Or paste image URL</Label>
                            <Input
                              id="image-url"
                              value={newProduct.image.startsWith('data:') ? '' : newProduct.image}
                              onChange={(e) => {
                                setNewProduct(prev => ({ ...prev, image: e.target.value }));
                                setImagePreview(e.target.value);
                              }}
                              placeholder="https://example.com/image.jpg"
                            />
                          </div>

                          {/* Image Preview */}
                          {imagePreview && (
                            <div className="relative">
                              <img 
                                src={imagePreview} 
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg border"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={clearImage}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                      Cancel
                    </Button>
                    <Button onClick={saveProduct}>
                      {isEditingProduct ? "Update Product" : "Add Product"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Filters */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="flex items-center space-x-4">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div className="space-y-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={product.stock && product.stock < 10 ? "destructive" : "secondary"}>
                            Stock: {product.stock || 0}
                          </Badge>
                          {product.isNew && <Badge variant="default">New</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium">{product.price}</p>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            editProduct(product);
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No products found matching your criteria
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Product Details */}
        <Card>
          <CardHeader>
            <CardTitle>Product Details & Stock Management</CardTitle>
            <CardDescription>
              {selectedProduct ? selectedProduct.name : "Select a product to view and manage"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedProduct ? (
              <ScrollArea className="h-96">
                <div className="space-y-6">
                  {/* Product Image */}
                  {selectedProduct.image && (
                    <div className="flex justify-center">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  {/* Stock Management */}
                  <div>
                    <h4 className="font-medium mb-2">Stock Management</h4>
                    <div className="flex items-center gap-2">
                      <Label>Current Stock:</Label>
                      <Input
                        type="number"
                        value={selectedProduct.stock || 0}
                        onChange={(e) => updateStock(selectedProduct.id, parseInt(e.target.value) || 0)}
                        className="w-24"
                      />
                      <Badge variant={selectedProduct.stock && selectedProduct.stock < 10 ? "destructive" : "secondary"}>
                        {selectedProduct.stock && selectedProduct.stock < 10 ? "Low Stock" : "In Stock"}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Product Information */}
                  <div>
                    <h4 className="font-medium mb-2">Product Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span>{selectedProduct.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span>{selectedProduct.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{selectedProduct.category}</span>
                      </div>
                      {selectedProduct.description && (
                        <div>
                          <span className="text-muted-foreground">Description:</span>
                          <p className="mt-1">{selectedProduct.description}</p>
                        </div>
                      )}
                      {selectedProduct.features && (
                        <div>
                          <span className="text-muted-foreground">Features:</span>
                          <p className="mt-1">{selectedProduct.features}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Available Options */}
                  {(selectedProduct.colors || selectedProduct.sizes) && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">Available Options</h4>
                        <div className="space-y-2 text-sm">
                          {selectedProduct.colors && (
                            <div>
                              <span className="text-muted-foreground">Colors:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedProduct.colors.map((color, index) => (
                                  <Badge key={index} variant="outline">{color}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {selectedProduct.sizes && (
                            <div>
                              <span className="text-muted-foreground">Sizes:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedProduct.sizes.map((size, index) => (
                                  <Badge key={index} variant="outline">{size}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button onClick={() => editProduct(selectedProduct)} className="flex-1">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Product
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => deleteProduct(selectedProduct.id)}
                      className="flex-1"
                    >
                      Delete Product
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-center h-96 text-muted-foreground">
                <div className="text-center">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a product to view and manage details</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
            <CardDescription className="text-red-600">
              The following products are running low on stock
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-white rounded border">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <Badge variant="destructive">
                    {product.stock} left
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductsManagement;
