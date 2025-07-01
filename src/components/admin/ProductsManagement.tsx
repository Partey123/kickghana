
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
import { Plus, Edit, Package, AlertTriangle, Search, Upload, X, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseProducts } from "@/hooks/useSupabaseProducts";
import { Database } from "@/integrations/supabase/types";

type Product = Database['public']['Tables']['products']['Row'] & {
  category?: Database['public']['Tables']['categories']['Row'];
};

type Category = Database['public']['Tables']['categories']['Row'];

interface NewProductForm {
  name: string;
  price: string;
  category_id: string;
  description: string;
  features: string;
  colors: string;
  sizes: string;
  stock: number;
  image_url: string;
  use_case: string;
  event_relevance: string;
}

const ProductsManagement = () => {
  const { products: supabaseProducts, loading: productsLoading, refetch } = useSupabaseProducts();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [newProduct, setNewProduct] = useState<NewProductForm>({
    name: "",
    price: "",
    category_id: "",
    description: "",
    features: "",
    colors: "",
    sizes: "",
    stock: 0,
    image_url: "",
    use_case: "",
    event_relevance: ""
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive"
      });
    }
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
        setNewProduct(prev => ({ ...prev, image_url: imageDataUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview("");
    setNewProduct(prev => ({ ...prev, image_url: "" }));
  };

  const saveProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category_id || !newProduct.description || !newProduct.use_case) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      // Generate slug from product name
      const slug = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const productData = {
        name: newProduct.name,
        slug: slug,
        price: parseFloat(newProduct.price),
        category_id: newProduct.category_id,
        description: newProduct.description,
        features: newProduct.features ? newProduct.features.split(',').map(f => f.trim()) : [],
        colors: newProduct.colors ? newProduct.colors.split(',').map(c => c.trim()) : [],
        sizes: newProduct.sizes ? newProduct.sizes.split(',').map(s => s.trim()) : [],
        stock: newProduct.stock,
        image_url: newProduct.image_url,
        use_case: newProduct.use_case,
        event_relevance: newProduct.event_relevance ? newProduct.event_relevance.split(',').map(e => e.trim()) : [],
        is_active: true
      };

      let result;
      if (isEditingProduct && selectedProduct) {
        // Update existing product
        result = await supabase
          .from('products')
          .update(productData)
          .eq('id', selectedProduct.id)
          .select();
        
        toast({
          title: "Product Updated",
          description: "Product has been successfully updated",
        });
      } else {
        // Add new product
        result = await supabase
          .from('products')
          .insert(productData)
          .select();
        
        toast({
          title: "Product Added",
          description: "New product has been added successfully",
        });
      }

      if (result.error) throw result.error;

      // Refresh products list
      refetch();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      price: "",
      category_id: "",
      description: "",
      features: "",
      colors: "",
      sizes: "",
      stock: 0,
      image_url: "",
      use_case: "",
      event_relevance: ""
    });
    setImagePreview("");
    setIsAddingProduct(false);
    setIsEditingProduct(false);
    setSelectedProduct(null);
  };

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Product Deleted",
        description: "Product has been removed successfully",
      });

      refetch();
      if (selectedProduct?.id === productId) {
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      });
    }
  };

  const updateStock = async (productId: string, newStock: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Stock Updated",
        description: "Stock has been updated successfully",
      });

      refetch();
    } catch (error) {
      console.error('Error updating stock:', error);
      toast({
        title: "Error",
        description: "Failed to update stock",
        variant: "destructive"
      });
    }
  };

  const editProduct = (product: Product) => {
    setNewProduct({
      name: product.name,
      price: String(product.price),
      category_id: product.category_id || "",
      description: product.description,
      features: Array.isArray(product.features) ? product.features.join(', ') : '',
      colors: Array.isArray(product.colors) ? product.colors.join(', ') : '',
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
      stock: product.stock,
      image_url: product.image_url || "",
      use_case: product.use_case,
      event_relevance: Array.isArray(product.event_relevance) ? product.event_relevance.join(', ') : ''
    });
    setImagePreview(product.image_url || "");
    setSelectedProduct(product);
    setIsEditingProduct(true);
    setIsAddingProduct(true);
  };

  const filteredProducts = supabaseProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category_id === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const lowStockProducts = supabaseProducts.filter(p => p.stock < 10);

  return (
    <div className="space-y-6">
      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-black">{supabaseProducts.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
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
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-black">{categories.length}</p>
              </div>
              <Package className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Stock</p>
                <p className="text-2xl font-bold text-black">{supabaseProducts.reduce((sum, p) => sum + p.stock, 0)}</p>
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
                <CardTitle className="text-black">Products Inventory</CardTitle>
                <CardDescription className="text-gray-600">Manage your product catalog and stock levels</CardDescription>
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
                    <DialogTitle className="text-black">{isEditingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      {isEditingProduct ? "Update product information" : "Add a new product to your inventory"}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Product Info */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-black">Product Name *</Label>
                          <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter product name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="price" className="text-black">Price (Ghana Cedis) *</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="100.00"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category" className="text-black">Category *</Label>
                          <Select 
                            value={newProduct.category_id} 
                            onValueChange={(value) => setNewProduct(prev => ({ ...prev, category_id: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="stock" className="text-black">Stock Quantity</Label>
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
                        <Label htmlFor="description" className="text-black">Description *</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Product description"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="use_case" className="text-black">Use Case *</Label>
                        <Input
                          id="use_case"
                          value={newProduct.use_case}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, use_case: e.target.value }))}
                          placeholder="e.g., Daily wear, Sports, Formal events"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="features" className="text-black">Features</Label>
                        <Textarea
                          id="features"
                          value={newProduct.features}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, features: e.target.value }))}
                          placeholder="Feature 1, Feature 2, Feature 3"
                          rows={2}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="colors" className="text-black">Colors (comma separated)</Label>
                          <Input
                            id="colors"
                            value={newProduct.colors}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, colors: e.target.value }))}
                            placeholder="Black, White, Red"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sizes" className="text-black">Sizes (comma separated)</Label>
                          <Input
                            id="sizes"
                            value={newProduct.sizes}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, sizes: e.target.value }))}
                            placeholder="40, 41, 42, 43"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="event_relevance" className="text-black">Event Relevance</Label>
                        <Input
                          id="event_relevance"
                          value={newProduct.event_relevance}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, event_relevance: e.target.value }))}
                          placeholder="Wedding, Sports, Casual"
                        />
                      </div>
                    </div>

                    {/* Right Column - Image Upload */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-black">Product Image</Label>
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
                            <Label htmlFor="image-url" className="text-black">Or paste image URL</Label>
                            <Input
                              id="image-url"
                              value={newProduct.image_url.startsWith('data:') ? '' : newProduct.image_url}
                              onChange={(e) => {
                                setNewProduct(prev => ({ ...prev, image_url: e.target.value }));
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
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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
                      {product.image_url && (
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div className="space-y-1">
                        <p className="font-medium text-black">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category?.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant={product.stock < 10 ? "destructive" : "secondary"}>
                            Stock: {product.stock}
                          </Badge>
                          {product.is_active && <Badge variant="default">Active</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium text-black">GHS {product.price}</p>
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
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteProduct(product.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-8 text-gray-600">
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
            <CardTitle className="text-black">Product Details & Stock Management</CardTitle>
            <CardDescription className="text-gray-600">
              {selectedProduct ? selectedProduct.name : "Select a product to view and manage"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedProduct ? (
              <ScrollArea className="h-96">
                <div className="space-y-6">
                  {/* Product Image */}
                  {selectedProduct.image_url && (
                    <div className="flex justify-center">
                      <img 
                        src={selectedProduct.image_url} 
                        alt={selectedProduct.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  {/* Stock Management */}
                  <div>
                    <h4 className="font-medium mb-2 text-black">Stock Management</h4>
                    <div className="flex items-center gap-2">
                      <Label className="text-black">Current Stock:</Label>
                      <Input
                        type="number"
                        value={selectedProduct.stock}
                        onChange={(e) => updateStock(selectedProduct.id, parseInt(e.target.value) || 0)}
                        className="w-24"
                      />
                      <Badge variant={selectedProduct.stock < 10 ? "destructive" : "secondary"}>
                        {selectedProduct.stock < 10 ? "Low Stock" : "In Stock"}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Product Information */}
                  <div>
                    <h4 className="font-medium mb-2 text-black">Product Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="text-black">{selectedProduct.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="text-black">GHS {selectedProduct.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="text-black">{selectedProduct.category?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Use Case:</span>
                        <span className="text-black">{selectedProduct.use_case}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Description:</span>
                        <p className="mt-1 text-black">{selectedProduct.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Available Options */}
                  {(selectedProduct.colors || selectedProduct.sizes) && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2 text-black">Available Options</h4>
                        <div className="space-y-2 text-sm">
                          {selectedProduct.colors && (
                            <div>
                              <span className="text-gray-600">Colors:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedProduct.colors.map((color, index) => (
                                  <Badge key={index} variant="outline">{color}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {selectedProduct.sizes && (
                            <div>
                              <span className="text-gray-600">Sizes:</span>
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
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Product
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-600">
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
                    <p className="font-medium text-black">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category?.name}</p>
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
