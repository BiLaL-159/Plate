
import React from 'react';
import { Pizza, Coffee, Salad, Sandwich, IceCream, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  {
    name: 'Pizza',
    icon: Pizza,
    color: 'bg-food-orange/10',
    iconColor: 'text-food-orange',
    delay: '0',
  },
  {
    name: 'Cafe',
    icon: Coffee,
    color: 'bg-food-700/10',
    iconColor: 'text-food-700',
    delay: '100',
  },
  {
    name: 'Salads',
    icon: Salad,
    color: 'bg-food-green/10',
    iconColor: 'text-food-green',
    delay: '200',
  },
  {
    name: 'Sandwiches',
    icon: Sandwich,
    color: 'bg-food-yellow/10',
    iconColor: 'text-food-yellow',
    delay: '300',
  },
  {
    name: 'Desserts',
    icon: IceCream,
    color: 'bg-food-red/10',
    iconColor: 'text-food-red',
    delay: '400',
  },
  {
    name: 'More',
    icon: Utensils,
    color: 'bg-food-blue/10',
    iconColor: 'text-food-blue',
    delay: '500',
  },
];

const CategoryCard = ({ category }: { category: typeof categories[0] }) => {
  const { name, icon: Icon, color, iconColor, delay } = category;
  
  return (
    <div 
      className={cn(
        "relative group flex flex-col items-center justify-center p-6 rounded-xl hover-lift",
        "bg-white border border-food-100 shadow-soft",
        "animate-fade-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center mb-4",
        color
      )}>
        <Icon className={cn("w-8 h-8", iconColor)} />
      </div>
      <h3 className="font-medium text-lg">{name}</h3>
      
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

const FoodCategories = () => {
  return (
    <section id="categories" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-block mb-4 animate-fade-down">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-food-blue/10 text-food-blue">
              Categories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-down delay-100">
            Explore Food Categories
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-down delay-200">
            Browse through our extensive collection of cuisines and dishes from various categories
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodCategories;
