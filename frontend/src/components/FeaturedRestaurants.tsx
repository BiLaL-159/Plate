
import React from 'react';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const restaurants = [
  {
    id: 1,
    name: 'Fresh Harvest',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Healthy • Salads • Bowls',
    rating: 4.8,
    deliveryTime: '15-30 min',
    distance: '0.8 mi',
    featured: true,
    delay: '0',
  },
  {
    id: 2,
    name: 'Italiano Pasta',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Italian • Pasta • Pizza',
    rating: 4.6,
    deliveryTime: '20-35 min',
    distance: '1.2 mi',
    featured: false,
    delay: '100',
  },
  {
    id: 3,
    name: 'Sushi Palace',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Japanese • Sushi • Asian',
    rating: 4.9,
    deliveryTime: '25-40 min',
    distance: '1.5 mi',
    featured: true,
    delay: '200',
  },
  {
    id: 4,
    name: 'Burger Joint',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'American • Burgers • Fries',
    rating: 4.7,
    deliveryTime: '15-25 min',
    distance: '0.5 mi',
    featured: false,
    delay: '300',
  },
  {
    id: 5,
    name: 'Spice of India',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356475?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Indian • Curry • Naan',
    rating: 4.5,
    deliveryTime: '25-40 min',
    distance: '1.8 mi',
    featured: true,
    delay: '400',
  },
  {
    id: 6,
    name: 'Mediterranean Delight',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Mediterranean • Falafel • Hummus',
    rating: 4.4,
    deliveryTime: '20-35 min',
    distance: '1.3 mi',
    featured: false,
    delay: '500',
  },
  {
    id: 7,
    name: 'Taco Fiesta',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Mexican • Tacos • Burritos',
    rating: 4.3,
    deliveryTime: '15-30 min',
    distance: '0.9 mi',
    featured: true,
    delay: '600',
  },
  {
    id: 8,
    name: 'Noodle House',
    image: 'https://images.unsplash.com/photo-1556040220-4096d522378d?auto=format&fit=crop&q=80&w=400&h=250',
    cuisine: 'Asian • Ramen • Pho',
    rating: 4.6,
    deliveryTime: '20-35 min',
    distance: '1.1 mi',
    featured: false,
    delay: '700',
  },
];

const RestaurantCard = ({ restaurant }: { restaurant: typeof restaurants[0] }) => {
  const { id, name, image, cuisine, rating, deliveryTime, distance, featured, delay } = restaurant;
  
  return (
    <div 
      className={cn(
        "group relative bg-white rounded-xl overflow-hidden border border-food-100 shadow-soft hover-lift",
        "animate-fade-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Featured tag */}
      {featured && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-primary text-white">
            Featured
          </span>
        </div>
      )}
      
      {/* Restaurant image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      
      {/* Restaurant info */}
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm mb-3">{cuisine}</p>
        
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-food-yellow fill-food-yellow" />
            <span className="font-medium">{rating}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-food-orange" />
            <span>{deliveryTime}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-food-blue" />
            <span>{distance}</span>
          </div>
        </div>
      </div>
      
      {/* Hover overlay with button */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link to={`/restaurants/${id}`}>
          <Button variant="default" className="rounded-full shadow-lg">
            View Menu
          </Button>
        </Link>
      </div>
    </div>
  );
};

const FeaturedRestaurants = () => {
  return (
    <section id="restaurants" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 md:space-y-6">
            <div className="inline-block animate-fade-down">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-food-red/10 text-food-red">
                Top Picks
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold animate-fade-down delay-100">
              Featured Restaurants
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl animate-fade-down delay-200">
              Discover our handpicked selection of the most popular restaurants in your area
            </p>
          </div>
          
          <Link to="/restaurants">
            <Button 
              variant="ghost" 
              className="self-start group animate-fade-left"
            >
              <span>View All Restaurants</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.slice(0, 6).map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
