
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    name: 'Tara Singh',
    location: 'Bengalore, India',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5,
    text: 'The website is incredibly intuitive and the delivery is always on time. I love how I can track my order in real-time!',
    delay: '0',
  },
  {
    name: 'Aman Sharma',
    location: 'Delhi, India',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5,
    text: 'As a busy professional, this website saves me so much time. The variety of restaurants is impressive and the food is always fresh.',
    delay: '200',
  },
  {
    name: 'Maggi Gupta',
    location: 'Mumbai, India',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 4,
    text: 'Customer service is exceptional! When my order was slightly delayed, they immediately sent a notification and offered a discount.',
    delay: '400',
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  const { name, location, image, rating, text, delay } = testimonial;
  
  return (
    <div 
      className="relative bg-white rounded-xl p-6 shadow-soft border border-food-100 hover-lift animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      
      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-food-50 flex items-center justify-center">
        <Quote className="w-4 h-4 text-food-orange" />
      </div>
      
     
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "w-4 h-4", 
              i < rating ? "text-food-yellow fill-food-yellow" : "text-food-300"
            )} 
          />
        ))}
      </div>
      
      
      <p className="text-muted-foreground mb-6">
        "{text}"
      </p>
      
     
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-food-100">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-food-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-block mb-4 animate-fade-down">
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-food-yellow/10 text-food-yellow">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-down delay-100">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-down delay-200">
            Don't just take our word for it, hear what our happy customers have to say
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
