
import React from 'react';
import { Utensils, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Press', href: '#' },
    ],
  },
  {
    title: 'For Restaurants',
    links: [
      { name: 'Partner with us', href: '#' },
      { name: 'Apps for restaurants', href: '#' },
      { name: 'Restaurant dashboard', href: '#' },
    ],
  },
  {
    title: 'For You',
    links: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Help Center', href: '#' },
    ],
  },
];

const socialIcons = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
];

const LinkSection = ({ section }: { section: typeof footerLinks[0] }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{section.title}</h3>
      <ul className="space-y-3">
        {section.links.map((link, index) => (
          <li key={index}>
            <a 
              href={link.href} 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-food-100">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company info */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#" className="flex items-center space-x-2">
              <div className="bg-primary/10 p-2 rounded-md">
                <Utensils className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display font-bold text-xl">Plate</span>
            </a>
            
            <p className="text-muted-foreground max-w-xs">
              Bringing delicious food from the best restaurants straight to your doorstep.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">plate@delivery.com</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">BH, GGSIPU, Delhi</span>
              </div>
            </div>
          </div>
          
          {/* Links */}
          {footerLinks.map((section, index) => (
            <LinkSection key={index} section={section} />
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-food-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Plate. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3">
            {socialIcons.map((social, index) => {
              const Icon = social.icon;
              return (
                <a 
                  key={index} 
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-food-50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
