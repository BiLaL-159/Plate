import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Clock, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleOrderNow = () => {
    // Scroll to the restaurants section on the home page
    const restaurantsSection = document.getElementById('featured-restaurants');
    if (restaurantsSection) {
      restaurantsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewRestaurants = () => {
    navigate('/restaurants');
  };

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-food-100/50 to-transparent -z-10"></div>
      
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-food-orange/5 rounded-full blur-3xl"></div>
      <div className="absolute top-40 -left-20 w-72 h-72 bg-food-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left content */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <div className="inline-block animate-fade-down">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-food-orange/10 text-food-orange">
                #1 Food Delivery App
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !leading-tight animate-fade-down delay-100">
              Delicious Food<br />
              <span className="text-primary">Delivered Fast</span>
              <span className="text-food-orange">.</span>
            </h1>
            
            <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto lg:mx-0 animate-fade-down delay-200">
              Order from your favorite restaurants and get your food delivered to your doorstep in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 animate-fade-down delay-300">
              <Button 
                size="lg" 
                className="rounded-full shadow-md shadow-primary/20 group"
                onClick={handleOrderNow}
              >
                Order Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full"
                onClick={handleViewRestaurants}
              >
                View Restaurants
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6 animate-fade-down delay-400">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-food-green/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-food-green" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Available in</span>
                  <span className="font-medium">15+ Cities</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-food-blue/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-food-blue" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Delivery in</span>
                  <span className="font-medium">20-30 min</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-food-yellow/10 flex items-center justify-center">
                  <Star className="h-5 w-5 text-food-yellow" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Rated</span>
                  <span className="font-medium">4.8/5 (2k+)</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right content - Image mockup */}
          <div className="w-full lg:w-1/2 relative animate-fade-up">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Phone mockup */}
              <div className="absolute inset-0 flex items-center justify-center animate-float">
                <div className="w-[85%] h-[90%] bg-white rounded-[2.5rem] shadow-xl overflow-hidden border-8 border-gray-100">
                  {/* App screenshot */}
                  <div className="relative h-full w-full bg-food-50">
                    {/* App status bar */}
                    <div className="h-6 w-full bg-white flex items-center justify-between px-4">
                      <div className="w-16 h-1.5 bg-food-200 rounded-full"></div>
                      <div className="w-3 h-3 rounded-full bg-food-200"></div>
                    </div>
                    
                    {/* App content */}
                    <div className="p-4 space-y-4">
                      {/* Location header */}
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-food-600">Delivery to</p>
                          <div className="flex items-center">
                            <p className="text-sm font-medium">Home</p>
                            <MapPin className="h-3 w-3 ml-1 text-primary" />
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-food-200"></div>
                      </div>
                      
                      {/* Search bar */}
                      <div className="bg-white rounded-lg p-2 flex items-center shadow-sm">
                        <div className="w-4 h-4 rounded bg-food-200 mr-2"></div>
                        <div className="h-2 w-24 bg-food-200 rounded-full"></div>
                      </div>
                      
                      {/* Food items */}
                      <div className="grid grid-cols-2 gap-3 py-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="w-full h-20 bg-food-200"></div>
                            <div className="p-2">
                              <div className="h-2 w-12 bg-food-200 rounded-full mb-1"></div>
                              <div className="h-2 w-8 bg-food-300 rounded-full"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Bottom navigation */}
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-white flex justify-around items-center px-6 border-t border-food-100">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-food-200"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Food floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white p-2 shadow-lg transform rotate-12 animate-float delay-200">
                <div className="w-full h-full rounded-full bg-food-orange/20"></div>
              </div>
              
              <div className="absolute -bottom-2 -left-2 w-16 h-16 rounded-full bg-white p-2 shadow-lg transform -rotate-12 animate-float delay-300">
                <div className="w-full h-full rounded-full bg-food-green/20"></div>
              </div>
              
              <div className="absolute top-1/4 -right-8 w-14 h-14 rounded-full bg-white p-2 shadow-lg transform rotate-6 animate-float delay-400">
                <div className="w-full h-full rounded-full bg-food-blue/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
