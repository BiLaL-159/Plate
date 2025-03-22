
import React, { useState, useEffect } from 'react';
import { Utensils, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthDialog from './auth/AuthDialog';
import UserMenu from './auth/UserMenu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogView, setAuthDialogView] = useState<'login' | 'signup'>('login');
  const { isAuthenticated, isRestaurantOwner } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const openLoginDialog = () => {
    setAuthDialogView('login');
    setAuthDialogOpen(true);
    setMobileMenuOpen(false);
  };

  const openSignupDialog = () => {
    setAuthDialogView('signup');
    setAuthDialogOpen(true);
    setMobileMenuOpen(false);
  };

  // Helper function to create appropriate links based on current page
  const getSectionLink = (sectionId: string) => {
    if (isHomePage) {
      return `#${sectionId}`;
    } else {
      return `/#${sectionId}`;
    }
  };

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-3 px-4 md:px-8",
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
           
            <Link to="/" className="flex items-center space-x-2 z-10">
              <div className="bg-primary/10 p-2 rounded-md">
                <Utensils className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display font-bold text-xl">Plate</span>
            </Link>

            
            <div className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink 
                        className={cn(
                          navigationMenuTriggerStyle(),
                          location.pathname === "/" && "bg-accent text-accent-foreground"
                        )}
                      >
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/20 to-primary/40 p-6 no-underline outline-none focus:shadow-md"
                              href={getSectionLink("categories")}
                            >
                              <div className="mt-4 mb-2 text-lg font-medium">
                                Food Categories
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Explore delicious cuisines from around the world
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <Link 
                            to="/restaurants"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">Restaurants</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Browse the best local restaurants
                            </p>
                          </Link>
                        </li>
                        <li>
                          <a
                            href={getSectionLink("how-it-works")}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">How It Works</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Learn about our ordering process
                            </p>
                          </a>
                        </li>
                        <li>
                          <a
                            href={getSectionLink("testimonials")}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">Testimonials</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              See what our customers say about us
                            </p>
                          </a>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  {isRestaurantOwner && (
                    <NavigationMenuItem>
                      <Link to="/dashboard">
                        <NavigationMenuLink 
                          className={cn(
                            navigationMenuTriggerStyle(),
                            location.pathname.startsWith("/dashboard") && "bg-accent text-accent-foreground"
                          )}
                        >
                          Restaurant Dashboard
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={openLoginDialog}>
                    Log in
                  </Button>
                  <Button variant="default" size="sm" onClick={openSignupDialog}>
                    Sign up
                  </Button>
                </>
              )}
            </div>

            
            <button 
              className="md:hidden p-2 z-20" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

     
      <div 
        className={cn(
          "fixed inset-0 bg-background md:hidden z-40 transition-all duration-300",
          mobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-6 space-y-6">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-lg font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href={getSectionLink("categories")} 
              className="text-lg font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </a>
            <Link 
              to="/restaurants" 
              className="text-lg font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Restaurants
            </Link>
            <a 
              href={getSectionLink("how-it-works")} 
              className="text-lg font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href={getSectionLink("testimonials")} 
              className="text-lg font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            
            {isRestaurantOwner && (
              <Link 
                to="/dashboard" 
                className="text-lg font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Restaurant Dashboard
              </Link>
            )}
          </div>
          
          <div className="mt-auto">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/profile" 
                  className="text-base font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link 
                  to="/orders" 
                  className="text-base font-medium py-2 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Orders
                </Link>
                <button 
                  className="text-base font-medium py-2 text-red-500 hover:text-red-600 transition-colors text-left"
                  onClick={() => {
                    const { logout } = useAuth();
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={openLoginDialog}
                >
                  Log in
                </Button>
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={openSignupDialog}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AuthDialog 
        isOpen={authDialogOpen} 
        onClose={() => setAuthDialogOpen(false)} 
        initialView={authDialogView}
      />
    </>
  );
};

export default Navbar;
