
import React from 'react';
import { Search, Utensils, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    title: 'Browse Restaurants',
    description: 'Explore local restaurants and discover your favorites',
    icon: Search,
    color: 'bg-food-blue/10',
    iconColor: 'text-food-blue',
    delay: '0',
  },
  {
    title: 'Select Your Food',
    description: 'Choose from a variety of delicious dishes and customize your order',
    icon: Utensils,
    color: 'bg-food-orange/10',
    iconColor: 'text-food-orange',
    delay: '200',
  },
  {
    title: 'Fast Delivery',
    description: 'Track your order in real-time as it makes its way to you',
    icon: Truck,
    color: 'bg-food-green/10',
    iconColor: 'text-food-green',
    delay: '400',
  },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const { title, description, icon: Icon, color, iconColor, delay } = step;
  
  return (
    <div 
      className="flex flex-col items-center text-center animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative mb-8">
        <div className={cn(
          "w-20 h-20 rounded-xl flex items-center justify-center",
          color
        )}>
          <Icon className={cn("w-10 h-10", iconColor)} />
        </div>
        
        <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white font-medium">
          {index + 1}
        </div>
        
        {/* Connecting line */}
        {index < steps.length - 1 && (
          <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-food-200 to-transparent">
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-food-200"></div>
          </div>
        )}
      </div>
      
      <h3 className="font-semibold text-xl mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground max-w-xs">
        {description}
      </p>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-padding bg-food-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-block mb-4 animate-fade-down">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-food-green/10 text-food-green">
              Simple Process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-down delay-100">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-down delay-200">
            Get your favorite meals delivered in just three simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
