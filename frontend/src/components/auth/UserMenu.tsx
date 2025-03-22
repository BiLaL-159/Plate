
import React from 'react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Settings, ShoppingBag, LayoutDashboard, UtensilsCrossed } from 'lucide-react';

const UserMenu: React.FC = () => {
  const { user, logout, isRestaurantOwner } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>
          {isRestaurantOwner ? 'Restaurant Owner' : 'Customer'}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {isRestaurantOwner ? (
          <>
            <DropdownMenuItem asChild>
              <Link to="/dashboard" className="cursor-pointer flex w-full items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/restaurant" className="cursor-pointer flex w-full items-center">
                <UtensilsCrossed className="mr-2 h-4 w-4" />
                Restaurant Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/orders" className="cursor-pointer flex w-full items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Manage Orders
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="cursor-pointer flex w-full items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/orders" className="cursor-pointer flex w-full items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                My Orders
              </Link>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuItem asChild>
          <Link to="/settings" className="cursor-pointer flex w-full items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
