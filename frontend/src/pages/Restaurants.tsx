import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Slider } from '@/components/ui/slider';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const baseRestaurants = [
  {
    id: 1,
    name: 'Fresh Harvest',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Healthy',
    tags: ['Salads', 'Bowls', 'Organic'],
    rating: 4.8,
    deliveryTime: '15-30 min',
    distance: '0.8 mi',
    priceRange: '$$',
    description: 'Fresh, organic ingredients crafted into nutritious and delicious meals.',
  },
  {
    id: 2,
    name: 'Italiano Pasta',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Italian',
    tags: ['Pasta', 'Pizza', 'Wine'],
    rating: 4.6,
    deliveryTime: '20-35 min',
    distance: '1.2 mi',
    priceRange: '$$$',
    description: 'Authentic Italian cuisine with homemade pasta and wood-fired pizzas.',
  },
  {
    id: 3,
    name: 'Sushi Palace',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Japanese',
    tags: ['Sushi', 'Asian', 'Seafood'],
    rating: 4.9,
    deliveryTime: '25-40 min',
    distance: '1.5 mi',
    priceRange: '$$$',
    description: 'Premium Japanese sushi and sashimi made with the freshest seafood.',
  },
  {
    id: 4,
    name: 'Burger Joint',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'American',
    tags: ['Burgers', 'Fries', 'Shakes'],
    rating: 4.7,
    deliveryTime: '15-25 min',
    distance: '0.5 mi',
    priceRange: '$$',
    description: 'Juicy, handcrafted burgers made with 100% beef.',
  },
  {
    id: 5,
    name: 'Spice of India',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&h=250&q=80',
    cuisine: 'Indian',
    tags: ['Curry', 'Naan', 'Tandoori', 'Biryani'],
    rating: 4.7,
    deliveryTime: '25-40 min',
    distance: '1.8 mi',
    priceRange: '$$',
    description: 'Authentic Indian cuisine with bold flavors and aromatic spices from all regions of India. Specializing in both North and South Indian delicacies.',
  },
  {
    id: 6,
    name: 'Mediterranean Delight',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Mediterranean',
    tags: ['Falafel', 'Hummus', 'Kebabs'],
    rating: 4.4,
    deliveryTime: '20-35 min',
    distance: '1.3 mi',
    priceRange: '$$',
    description: 'Fresh Mediterranean cuisine featuring classic dishes from Greece and Lebanon.',
  },
  {
    id: 7,
    name: 'Taco Fiesta',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Mexican',
    tags: ['Tacos', 'Burritos', 'Margaritas'],
    rating: 4.3,
    deliveryTime: '15-30 min',
    distance: '0.9 mi',
    priceRange: '$',
    description: 'Authentic Mexican street food with homemade salsas and fresh ingredients.',
  },
  {
    id: 8,
    name: 'Noodle House',
    image: 'https://images.unsplash.com/photo-1556040220-4096d522378d?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Asian',
    tags: ['Ramen', 'Pho', 'Dumplings'],
    rating: 4.6,
    deliveryTime: '20-35 min',
    distance: '1.1 mi',
    priceRange: '$$',
    description: 'Asian fusion restaurant specializing in various noodle dishes.',
  },
  {
    id: 9,
    name: 'The Pizza Oven',
    image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Italian',
    tags: ['Pizza', 'Calzone', 'Garlic Bread'],
    rating: 4.7,
    deliveryTime: '20-35 min',
    distance: '1.4 mi',
    priceRange: '$$',
    description: 'Authentic wood-fired pizzas made with traditional Italian recipes and fresh ingredients.',
  },
  {
    id: 10,
    name: 'Green Garden',
    image: 'https://images.unsplash.com/photo-1551218372-a8789b81b253?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Vegan',
    tags: ['Plant-based', 'Organic', 'Gluten-Free'],
    rating: 4.4,
    deliveryTime: '20-35 min',
    distance: '1.7 mi',
    priceRange: '$$$',
    description: 'Creative plant-based dishes that prove vegan food is anything but boring.',
  },
  {
    id: 11,
    name: 'Seafood Harbor',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Seafood',
    tags: ['Fish', 'Lobster', 'Oysters'],
    rating: 4.8,
    deliveryTime: '25-40 min',
    distance: '2.1 mi',
    priceRange: '$$$$',
    description: 'The freshest catches of the day prepared with expertise and creativity.',
  },
  {
    id: 12,
    name: 'Beijing Palace',
    image: 'https://images.unsplash.com/photo-1503764654157-72d979d9af2f?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Chinese',
    tags: ['Dim Sum', 'Noodles', 'Peking Duck'],
    rating: 4.5,
    deliveryTime: '25-40 min',
    distance: '1.6 mi',
    priceRange: '$$',
    description: 'Traditional Chinese cuisine from various regions, with a focus on authenticity.',
  },
  {
    id: 13,
    name: 'Thai Spice',
    image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Thai',
    tags: ['Curry', 'Pad Thai', 'Spring Rolls'],
    rating: 4.6,
    deliveryTime: '20-35 min',
    distance: '1.2 mi',
    priceRange: '$$',
    description: 'Bold and aromatic Thai dishes with the perfect balance of sweet, sour, and spicy flavors.',
  },
  {
    id: 14,
    name: 'Steakhouse Prime',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'American',
    tags: ['Steak', 'Ribs', 'Wine'],
    rating: 4.9,
    deliveryTime: '30-45 min',
    distance: '2.4 mi',
    priceRange: '$$$$',
    description: 'Premium aged steaks and fine wines in an elegant atmosphere.',
  },
  {
    id: 15,
    name: 'Seoul Kitchen',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Korean',
    tags: ['BBQ', 'Bibimbap', 'Kimchi'],
    rating: 4.7,
    deliveryTime: '25-40 min',
    distance: '1.9 mi',
    priceRange: '$$$',
    description: 'Authentic Korean BBQ and traditional dishes full of umami and fermented flavors.',
  },
];

const getAllRestaurants = () => {
  try {
    const ownerRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    return [...baseRestaurants, ...ownerRestaurants];
  } catch (error) {
    console.error('Error loading owner restaurants:', error);
    return baseRestaurants;
  }
};

const Restaurants = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [restaurants, setRestaurants] = useState(getAllRestaurants());
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState([0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantsPerPage = 6;
  
  const cuisines = ['all', ...new Set(restaurants.map(r => r.cuisine.toLowerCase()))];
  
  useEffect(() => {
    let result = restaurants;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(restaurant => 
        restaurant.name.toLowerCase().includes(term) || 
        restaurant.cuisine.toLowerCase().includes(term) ||
        restaurant.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    if (cuisineFilter !== 'all') {
      result = result.filter(restaurant => 
        restaurant.cuisine.toLowerCase() === cuisineFilter
      );
    }
    
    if (priceFilter !== 'all') {
      result = result.filter(restaurant => restaurant.priceRange === priceFilter);
    }
    
    if (ratingFilter[0] > 0) {
      result = result.filter(restaurant => restaurant.rating >= ratingFilter[0]);
    }
    
    setFilteredRestaurants(result);
    setCurrentPage(1);
  }, [searchTerm, cuisineFilter, priceFilter, ratingFilter, restaurants]);
  
  useEffect(() => {
    setRestaurants(getAllRestaurants());
  }, []);
  
  const totalPages = Math.ceil(filteredRestaurants.length / restaurantsPerPage);
  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Restaurants</h1>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search restaurants, cuisines, dishes..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisines.map((cuisine, index) => (
                      <SelectItem key={index} value={cuisine}>
                        {cuisine === 'all' ? 'All Cuisines' : cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="$">$ (Budget)</SelectItem>
                    <SelectItem value="$$">$$ (Moderate)</SelectItem>
                    <SelectItem value="$$$">$$$ (Upscale)</SelectItem>
                    <SelectItem value="$$$$">$$$$ (Fine)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                  <DrawerTrigger asChild>
                    <Button variant="outline" className="flex gap-2">
                      <SlidersHorizontal className="h-4 w-4" /> 
                      <span className="hidden md:inline">More Filters</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="px-4 py-6 max-w-md mx-auto">
                      <DrawerHeader className="px-0">
                        <DrawerTitle>Filters</DrawerTitle>
                      </DrawerHeader>
                      
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h3 className="font-medium">Minimum Rating</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Any</span>
                              <span>5 Stars</span>
                            </div>
                            <Slider
                              value={ratingFilter}
                              min={0}
                              max={5}
                              step={0.5}
                              onValueChange={setRatingFilter}
                            />
                            <div className="text-center font-medium">{ratingFilter[0]} {ratingFilter[0] === 1 ? 'Star' : 'Stars'}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 mt-6">
                        <DrawerClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                        <DrawerClose asChild>
                          <Button onClick={() => {
                            setSearchTerm('');
                            setCuisineFilter('all');
                            setPriceFilter('all');
                            setRatingFilter([0]);
                          }}>Reset</Button>
                        </DrawerClose>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
            
            {filteredRestaurants.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">No restaurants found</h2>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentRestaurants.map(restaurant => (
                    <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                      <div 
                        className={cn(
                          "group relative rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col"
                        )}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={restaurant.image} 
                            alt={restaurant.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        
                        <div className="p-5 flex-grow flex flex-col">
                          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{restaurant.name}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{restaurant.cuisine}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {restaurant.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-muted rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{restaurant.description}</p>
                          
                          <div className="mt-auto flex flex-wrap gap-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-food-yellow fill-food-yellow" />
                              <span className="font-medium">{restaurant.rating}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-food-orange" />
                              <span>{restaurant.deliveryTime}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-food-blue" />
                              <span>{restaurant.distance}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination className="mt-10 justify-center">
                    <PaginationContent>
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                        </PaginationItem>
                      )}
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                isActive={page === currentPage}
                                onClick={() => handlePageChange(page)}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        
                        if (page === 2 || page === totalPages - 1) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        
                        return null;
                      })}
                      
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Restaurants;
