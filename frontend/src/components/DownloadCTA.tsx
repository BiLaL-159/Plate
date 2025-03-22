
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const DownloadCTA = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/80 via-primary/30 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-food-orange/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-food-blue/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative">
            {/* Overlay abstract shapes */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-food-blue/10 to-food-blue/5 rounded-full -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-block mb-4 animate-fade-down">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
                  Download Now
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-down delay-100">
                Get the App for Faster Delivery
              </h2>
              
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 animate-fade-down delay-200">
                Download our mobile app to enjoy a seamless food ordering experience, exclusive deals, and real-time order tracking.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up delay-300">
                <Button size="lg" className="rounded-full shadow-md shadow-primary/20 group">
                  <div className="mr-2 flex flex-col items-start text-left">
                    <span className="text-xs font-normal">Download on the</span>
                    <span className="text-sm font-semibold">App Store</span>
                  </div>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <Button size="lg" variant="outline" className="rounded-full border-food-200 group">
                  <div className="mr-2 flex flex-col items-start text-left">
                    <span className="text-xs font-normal">Get it on</span>
                    <span className="text-sm font-semibold">Google Play</span>
                  </div>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;
