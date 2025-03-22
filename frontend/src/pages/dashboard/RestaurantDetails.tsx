
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

// Initial restaurant data
const initialRestaurantData = {
  id: 'new-restaurant',
  name: '',
  description: '',
  cuisine: '',
  address: '',
  image: '',
  deliveryTime: '',
  priceRange: '$$',
  categories: [] as Category[]
};

const RestaurantDetails = () => {
  const [restaurant, setRestaurant] = useState(initialRestaurantData);
  const [newCategory, setNewCategory] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user } = useAuth();

  // Load existing restaurant data if available (owner's restaurant)
  useEffect(() => {
    const savedRestaurant = localStorage.getItem('ownerRestaurant');
    if (savedRestaurant) {
      try {
        setRestaurant(JSON.parse(savedRestaurant));
      } catch (error) {
        console.error('Error loading restaurant data:', error);
      }
    }
  }, []);

  const handleRestaurantChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRestaurant(prev => ({ ...prev, [name]: value }));
  };

  const addCategory = () => {
    if (!newCategory) return;
    
    const categoryId = `cat-${Date.now()}`;
    setRestaurant(prev => ({
      ...prev,
      categories: [...prev.categories, { id: categoryId, name: newCategory, items: [] }]
    }));
    setNewCategory('');
    setSelectedCategory(categoryId);
  };

  const addMenuItem = () => {
    if (!selectedCategory || !newItemName || !newItemPrice) return;
    
    const itemId = `item-${Date.now()}`;
    const price = parseFloat(newItemPrice);
    
    if (isNaN(price)) {
      toast.error('Please enter a valid price');
      return;
    }
    
    setRestaurant(prev => ({
      ...prev,
      categories: prev.categories.map(category => 
        category.id === selectedCategory
          ? {
              ...category,
              items: [
                ...category.items,
                {
                  id: itemId,
                  name: newItemName,
                  price,
                  description: newItemDescription
                }
              ]
            }
          : category
      )
    }));
    
    setNewItemName('');
    setNewItemPrice('');
    setNewItemDescription('');
  };

  const removeCategory = (categoryId: string) => {
    setRestaurant(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat.id !== categoryId)
    }));
    
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    }
  };

  const removeMenuItem = (categoryId: string, itemId: string) => {
    setRestaurant(prev => ({
      ...prev,
      categories: prev.categories.map(category => 
        category.id === categoryId
          ? {
              ...category,
              items: category.items.filter(item => item.id !== itemId)
            }
          : category
      )
    }));
  };

  const saveRestaurant = () => {
    if (!restaurant.name) {
      toast.error('Restaurant name is required');
      return;
    }

    // Generate a real ID if it's a new restaurant
    const restaurantToSave = restaurant.id === 'new-restaurant' 
      ? { ...restaurant, id: `rest-${Date.now()}` }
      : restaurant;
    
    
    localStorage.setItem('ownerRestaurant', JSON.stringify(restaurantToSave));
    
    // Add to public restaurant list
    const publicRestaurant = {
      id: restaurantToSave.id,
      name: restaurantToSave.name,
      image: restaurantToSave.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000&h=400',
      cuisine: restaurantToSave.cuisine,
      tags: restaurantToSave.categories.map(cat => cat.name),
      rating: 4.5, // Default rating
      deliveryTime: restaurantToSave.deliveryTime || '30-45 min',
      distance: '1.0 mi', // Default distance
      priceRange: restaurantToSave.priceRange,
      description: restaurantToSave.description,
      ownerEmail: user?.email,
      menu: restaurantToSave.categories.reduce((menu: Record<string, any>, category) => {
        menu[category.name.toLowerCase()] = category.items;
        return menu;
      }, {})
    };
    
    // Add to restaurants list in localStorage
    try {
      const existingRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
      const restIndex = existingRestaurants.findIndex((r: any) => r.id === publicRestaurant.id);
      
      if (restIndex >= 0) {
        existingRestaurants[restIndex] = publicRestaurant;
      } else {
        existingRestaurants.push(publicRestaurant);
      }
      
      localStorage.setItem('restaurants', JSON.stringify(existingRestaurants));
      toast.success('Restaurant saved successfully');
    } catch (error) {
      console.error('Error saving restaurant:', error);
      toast.error('Error saving restaurant');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Restaurant Details</h1>
          <p className="text-muted-foreground">Manage your restaurant information and menu</p>
        </div>
        
        
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Restaurant Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={restaurant.name} 
                  onChange={handleRestaurantChange} 
                  placeholder="Enter restaurant name"
                />
              </div>
              
              <div>
                <Label htmlFor="cuisine">Cuisine Type</Label>
                <Input 
                  id="cuisine" 
                  name="cuisine" 
                  value={restaurant.cuisine} 
                  onChange={handleRestaurantChange} 
                  placeholder="e.g. Italian, Mexican, Asian"
                />
              </div>
              
              <div>
                <Label htmlFor="priceRange">Price Range</Label>
                <select 
                  id="priceRange" 
                  name="priceRange" 
                  value={restaurant.priceRange}
                  onChange={(e) => setRestaurant(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="$">$ (Budget)</option>
                  <option value="$$">$$ (Moderate)</option>
                  <option value="$$$">$$$ (Upscale)</option>
                  <option value="$$$$">$$$$ (Fine Dining)</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="deliveryTime">Average Delivery Time</Label>
                <Input 
                  id="deliveryTime" 
                  name="deliveryTime" 
                  value={restaurant.deliveryTime} 
                  onChange={handleRestaurantChange} 
                  placeholder="e.g. 15-30 min"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  value={restaurant.address} 
                  onChange={handleRestaurantChange} 
                  placeholder="Restaurant address"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="image">Cover Image URL</Label>
                <Input 
                  id="image" 
                  name="image" 
                  value={restaurant.image} 
                  onChange={handleRestaurantChange} 
                  placeholder="Image URL"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={restaurant.description} 
                  onChange={handleRestaurantChange} 
                  placeholder="Short description of your restaurant"
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Menu Management */}
        <Card>
          <CardHeader>
            <CardTitle>Menu Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Menu Category */}
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="newCategory">Add Menu Category</Label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    id="newCategory" 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)} 
                    placeholder="e.g. Appetizers, Main Course, Desserts"
                  />
                  <Button onClick={addCategory} className="shrink-0">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Categories List */}
            {restaurant.categories.length > 0 && (
              <div className="space-y-4">
                <Label>Menu Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {restaurant.categories.map(category => (
                    <div 
                      key={category.id} 
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                    >
                      <span 
                        onClick={() => setSelectedCategory(category.id)}
                        className="cursor-pointer"
                      >
                        {category.name} ({category.items.length})
                      </span>
                      <button 
                        onClick={() => removeCategory(category.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Menu Items Form */}
            {selectedCategory && (
              <div className="mt-6 border rounded-md p-4">
                <h3 className="font-medium mb-4">
                  Add Items to {restaurant.categories.find(c => c.id === selectedCategory)?.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="itemName">Item Name</Label>
                    <Input 
                      id="itemName" 
                      value={newItemName} 
                      onChange={(e) => setNewItemName(e.target.value)} 
                      placeholder="Item name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="itemPrice">Price ($)</Label>
                    <Input 
                      id="itemPrice" 
                      value={newItemPrice} 
                      onChange={(e) => setNewItemPrice(e.target.value)} 
                      placeholder="9.99"
                      type="number"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="itemDescription">Description</Label>
                    <Textarea 
                      id="itemDescription" 
                      value={newItemDescription} 
                      onChange={(e) => setNewItemDescription(e.target.value)} 
                      placeholder="Short description of the item"
                      rows={2}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Button onClick={addMenuItem} className="w-full">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Menu Item
                    </Button>
                  </div>
                </div>
                
                {/* Display Current Items */}
                {restaurant.categories.find(c => c.id === selectedCategory)?.items.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Current Items</h4>
                    <div className="space-y-2">
                      {restaurant.categories
                        .find(c => c.id === selectedCategory)
                        ?.items.map(item => (
                          <div key={item.id} className="flex justify-between items-center p-3 bg-muted rounded-md">
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">{item.description}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold">${item.price.toFixed(2)}</span>
                              <button 
                                onClick={() => removeMenuItem(selectedCategory, item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="lg" onClick={saveRestaurant}>
            <Save className="h-4 w-4 mr-2" />
            Save Restaurant
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RestaurantDetails;
