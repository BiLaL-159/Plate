
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FoodCategories from '@/components/FoodCategories';
import HowItWorks from '@/components/HowItWorks';
import FeaturedRestaurants from '@/components/FeaturedRestaurants';
import Testimonials from '@/components/Testimonials';
import DownloadCTA from '@/components/DownloadCTA';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { useLocation } from 'react-router-dom';

const Index = () => {
  const { pathname, hash } = useLocation();

  
  useEffect(() => {
    document.body.classList.add('animate-fade-in');
    
    
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = anchor.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        
        if (element) {
          const yOffset = -80; 
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });

    
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const yOffset = -80; 
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.body.classList.remove('animate-fade-in');
    };
  }, [pathname, hash]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <div id="categories">
          <FoodCategories />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <div id="featured-restaurants">
          <FeaturedRestaurants />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <DownloadCTA />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
