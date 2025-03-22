import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

// User role type
export type UserRole = 'customer' | 'restaurant_owner';

// Define user type
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isRestaurantOwner: boolean;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  isAuthenticated: false,
  isRestaurantOwner: false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for an existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Login function calling the backend endpoint
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message || "Login failed");
        return false;
      }

      const data = await response.json();
      const loggedInUser = data.user;

      // Update state and persist session
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      localStorage.setItem('token', data.token);
      toast.success(`Welcome back, ${loggedInUser.name}!`);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error("An error occurred during login");
      return false;
    }
  };

  // Signup function calling the backend endpoint
  const signup = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message || "Signup failed");
        return false;
      }

      const data = await response.json();
      const newUser = data.user;

      // Update state and persist session
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', data.token);
      toast.success(`Welcome, ${newUser.name}!`);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error("An error occurred during signup");
      return false;
    }
  };

  // Logout function to clear session
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.info("You've been logged out");
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isRestaurantOwner: user?.role === 'restaurant_owner'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
