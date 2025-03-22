
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant Owner Dashboard</h1>
          <p className="mb-4">You need to be logged in to access the dashboard.</p>
          <Button asChild>
            <Link to="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm hidden md:block">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Restaurant Dashboard</h2>
            <p className="text-sm text-muted-foreground">Manage your restaurant</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <Link to="/dashboard">
              <Button
                variant={isActive('/dashboard') ? 'default' : 'ghost'}
                className="w-full justify-start"
              >
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            
            <Link to="/dashboard/restaurant">
              <Button 
                variant={isActive('/dashboard/restaurant') ? 'default' : 'ghost'}
                className="w-full justify-start"
              >
                <UtensilsCrossed className="mr-2 h-5 w-5" />
                Restaurant Details
              </Button>
            </Link>
            
            <Link to="/dashboard/orders">
              <Button 
                variant={isActive('/dashboard/orders') ? 'default' : 'ghost'}
                className="w-full justify-start"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Orders
              </Button>
            </Link>

            <Link to="/">
              <Button 
                variant="ghost"
                className="w-full justify-start"
              >
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Button>
            </Link>
          </nav>
          
          <div className="p-4 border-t mt-auto">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar (shown as top nav) */}
      <div className="md:hidden w-full bg-white border-b border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Restaurant Dashboard</h2>
          <div className="flex space-x-2">
            <Link to="/dashboard">
              <Button size="icon" variant={isActive('/dashboard') ? 'default' : 'ghost'}>
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard/restaurant">
              <Button size="icon" variant={isActive('/dashboard/restaurant') ? 'default' : 'ghost'}>
                <UtensilsCrossed className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard/orders">
              <Button size="icon" variant={isActive('/dashboard/orders') ? 'default' : 'ghost'}>
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/">
              <Button size="icon" variant="ghost">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-6 md:p-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
