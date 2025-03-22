import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, ChevronLeft, Plus, ShoppingCart, Trash, RefreshCw, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { toast } from "sonner";

const getRestaurants = () => {
  try {
    const localRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    if (localRestaurants && localRestaurants.length > 0) {
      return [...localRestaurants, ...allRestaurants];
    }
  } catch (error) {
    console.error('Error getting restaurants from localStorage:', error);
  }
  return allRestaurants;
};

const allRestaurants = [
  {
    id: 1,
    name: 'Fresh Harvest',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=1000&h=400',
    cuisine: 'Healthy',
    tags: ['Salads', 'Bowls', 'Organic'],
    rating: 4.8,
    deliveryTime: '15-30 min',
    distance: '0.8 mi',
    priceRange: '$$',
    description: 'Fresh, organic ingredients crafted into nutritious and delicious meals. Perfect for health-conscious food lovers.',
    menu: {
      featured: [
        { id: 'f1', name: 'Signature Harvest Bowl', price: 14.99, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300&h=200', description: 'Quinoa, avocado, roasted veggies, and our special tahini dressing' },
        { id: 'f2', name: 'Superfood Salad', price: 12.99, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300&h=200', description: 'Kale, spinach, berries, nuts, and lemon vinaigrette' },
      ],
      mains: [
        { id: 'm1', name: 'Mediterranean Bowl', price: 15.99, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=300&h=200', description: 'Falafel, hummus, tabbouleh, and pita with tzatziki' },
        { id: 'm2', name: 'Protein Power Bowl', price: 16.99, image: 'https://images.unsplash.com/photo-1539136788836-5699e78bfc75?auto=format&fit=crop&q=80&w=300&h=200', description: 'Grilled chicken, sweet potatoes, broccoli, and avocado' },
        { id: 'm3', name: 'Vegan Delight Bowl', price: 14.99, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=300&h=200', description: 'Tofu, brown rice, edamame, carrots, and sesame ginger sauce' },
      ],
      salads: [
        { id: 's1', name: 'Classic Caesar', price: 11.99, image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&q=80&w=300&h=200', description: 'Romaine, parmesan crisps, croutons, and our house-made dressing' },
        { id: 's2', name: 'Greek Goddess', price: 12.99, image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&q=80&w=300&h=200', description: 'Mixed greens, feta, olives, cucumber, tomato, and herb vinaigrette' },
        { id: 's3', name: 'Asian Crunch', price: 13.99, image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&q=80&w=300&h=200', description: 'Cabbage slaw, cashews, mandarin oranges, and sesame dressing' },
      ],
      sides: [
        { id: 'side1', name: 'Sweet Potato Fries', price: 5.99, image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&q=80&w=300&h=200', description: 'Crispy baked sweet potato fries with chipotle aioli' },
        { id: 'side2', name: 'Avocado Toast', price: 7.99, image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&q=80&w=300&h=200', description: 'Multigrain toast topped with avocado, microgreens, and seeds' },
      ],
      drinks: [
        { id: 'd1', name: 'Green Machine Smoothie', price: 8.99, image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=300&h=200', description: 'Spinach, banana, pineapple, and coconut water' },
        { id: 'd2', name: 'Berry Blast Smoothie', price: 8.99, image: 'https://images.unsplash.com/photo-1553530666-ba11a90a0083?auto=format&fit=crop&q=80&w=300&h=200', description: 'Mixed berries, yogurt, and honey' },
        { id: 'd3', name: 'Kombucha', price: 6.99, image: 'https://images.unsplash.com/photo-1601412936791-9d05a0ab0dfe?auto=format&fit=crop&q=80&w=300&h=200', description: 'Locally brewed, various flavors available' },
      ],
    }
  },
  {
    id: 2,
    name: 'Italiano Pasta',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=1000&h=400',
    cuisine: 'Italian',
    tags: ['Pasta', 'Pizza', 'Wine'],
    rating: 4.6,
    deliveryTime: '20-35 min',
    distance: '1.2 mi',
    priceRange: '$$$',
    description: 'Authentic Italian cuisine with homemade pasta, wood-fired pizzas, and a selection of fine wines.',
    menu: {
      featured: [
        { id: 'f1', name: 'Truffle Pasta', price: 22.99, image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&q=80&w=300&h=200', description: 'Fresh fettuccine with black truffle cream sauce and parmesan' },
        { id: 'f2', name: 'Margherita Pizza', price: 16.99, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=300&h=200', description: 'San Marzano tomatoes, fresh mozzarella, basil, and olive oil' },
      ],
      appetizers: [
        { id: 'a1', name: 'Bruschetta', price: 11.99, image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b49f?auto=format&fit=crop&q=80&w=300&h=200', description: 'Grilled bread topped with diced tomatoes, garlic, basil, and olive oil' },
        { id: 'a2', name: 'Arancini', price: 13.99, image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=300&h=200', description: 'Sicilian rice balls stuffed with mozzarella and peas' },
        { id: 'a3', name: 'Antipasto Platter', price: 18.99, image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a9c?auto=format&fit=crop&q=80&w=300&h=200', description: 'Selection of Italian cured meats, cheeses, olives, and roasted vegetables' },
      ],
      pasta: [
        { id: 'p1', name: 'Spaghetti Carbonara', price: 17.99, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=300&h=200', description: 'Pancetta, egg, black pepper, and pecorino cheese' },
        { id: 'p2', name: 'Fettuccine Alfredo', price: 16.99, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023882c?auto=format&fit=crop&q=80&w=300&h=200', description: 'Creamy parmesan sauce with grilled chicken' },
        { id: 'p3', name: 'Penne Arrabbiata', price: 15.99, image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=300&h=200', description: 'Spicy tomato sauce with garlic and red chili flakes' },
      ],
      pizza: [
        { id: 'pizza1', name: 'Quattro Formaggi', price: 18.99, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=300&h=200', description: 'Four cheese pizza with mozzarella, gorgonzola, fontina, and parmesan' },
        { id: 'pizza2', name: 'Diavola', price: 19.99, image: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?auto=format&fit=crop&q=80&w=300&h=200', description: 'Spicy salami, red peppers, mozzarella, and tomato sauce' },
      ],
      desserts: [
        { id: 'des1', name: 'Tiramisu', price: 9.99, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=300&h=200', description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream' },
        { id: 'des2', name: 'Panna Cotta', price: 8.99, image: 'https://images.unsplash.com/photo-1488477129229-6428a0291777?auto=format&fit=crop&q=80&w=300&h=200', description: 'Vanilla bean and honey with berry compote' },
      ],
    }
  },
  {
    id: 3,
    name: 'Sushi Palace',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1000&h=400',
    cuisine: 'Japanese',
    tags: ['Sushi', 'Asian', 'Seafood'],
    rating: 4.9,
    deliveryTime: '25-40 min',
    distance: '1.5 mi',
    priceRange: '$$$',
    description: 'Premium Japanese sushi and sashimi made with the freshest seafood and traditional techniques.',
    menu: {
      featured: [
        { id: 'f1', name: 'Dragon Roll', price: 18.99, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=300&h=200', description: 'Eel, cucumber, and avocado with eel sauce' },
        { id: 'f2', name: 'Chef\'s Selection Sashimi', price: 28.99, image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&q=80&w=300&h=200', description: 'Assortment of premium raw fish, chef\'s daily selection' },
      ],
      starters: [
        { id: 's1', name: 'Edamame', price: 6.99, image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=300&h=200', description: 'Steamed soybeans with sea salt' },
        { id: 's2', name: 'Miso Soup', price: 4.99, image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?auto=format&fit=crop&q=80&w=300&h=200', description: 'Traditional Japanese soup with tofu, seaweed, and green onion' },
        { id: 's3', name: 'Gyoza', price: 9.99, image: 'https://images.unsplash.com/photo-1632757488122-3ebec352f2cd?auto=format&fit=crop&q=80&w=300&h=200', description: 'Pan-fried pork and vegetable dumplings' },
      ],
      rolls: [
        { id: 'r1', name: 'California Roll', price: 11.99, image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&q=80&w=300&h=200', description: 'Crab, cucumber, and avocado' },
        { id: 'r2', name: 'Spicy Tuna Roll', price: 13.99, image: 'https://images.unsplash.com/photo-1558985250-27a406d64cb3?auto=format&fit=crop&q=80&w=300&h=200', description: 'Tuna, spicy mayo, and cucumber' },
        { id: 'r3', name: 'Rainbow Roll', price: 16.99, image: 'https://images.unsplash.com/photo-1633478562774-56ba7f3a9729?auto=format&fit=crop&q=80&w=300&h=200', description: 'California roll topped with assorted fish' },
      ],
      nigiri: [
        { id: 'n1', name: 'Salmon Nigiri (2 pcs)', price: 8.99, image: 'https://images.unsplash.com/photo-1618040996337-11b4a5ed1d30?auto=format&fit=crop&q=80&w=300&h=200', description: 'Fresh salmon over seasoned rice' },
        { id: 'n2', name: 'Tuna Nigiri (2 pcs)', price: 9.99, image: 'https://images.unsplash.com/photo-1648147129229-cbcf0e650efc?auto=format&fit=crop&q=80&w=300&h=200', description: 'Fresh tuna over seasoned rice' },
      ],
      bowls: [
        { id: 'b1', name: 'Chirashi Bowl', price: 22.99, image: 'https://images.unsplash.com/photo-1614975059251-991411b0823d?auto=format&fit=crop&q=80&w=300&h=200', description: 'Assorted sashimi over sushi rice' },
        { id: 'b2', name: 'Poke Bowl', price: 17.99, image: 'https://images.unsplash.com/photo-1626458176058-767fc827c738?auto=format&fit=crop&q=80&w=300&h=200', description: 'Marinated tuna, rice, avocado, edamame, cucumber, and spicy mayo' },
      ],
    }
  },
  {
    id: 4,
    name: 'Burger Joint',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&q=80&w=1000&h=400',
    cuisine: 'American',
    tags: ['Burgers', 'Fries', 'Shakes'],
    rating: 4.7,
    deliveryTime: '15-25 min',
    distance: '0.5 mi',
    priceRange: '$$',
    description: 'Juicy, handcrafted burgers made with 100% beef, served with crispy fries and creamy milkshakes.',
    menu: {
      featured: [
        { id: 'f1', name: 'Classic Cheeseburger', price: 12.99, image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&q=80&w=300&h=200', description: 'Beef patty, American cheese, lettuce, tomato, and house sauce' },
        { id: 'f2', name: 'Bacon BBQ Burger', price: 15.99, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&q=80&w=300&h=200', description: 'Beef patty, cheddar, bacon, BBQ sauce, and crispy onions' },
      ],
      burgers: [
        { id: 'b1', name: 'Mushroom Swiss', price: 14.99, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&q=80&w=300&h=200', description: 'Beef patty, sautéed mushrooms, Swiss cheese, and garlic aioli' },
        { id: 'b2', name: 'Veggie Burger', price: 13.99, image: 'https://images.unsplash.com/photo-1585238342070-61e1e768b1ff?auto=format&fit=crop&q=80&w=300&h=200', description: 'Plant-based patty, avocado, lettuce, tomato, and special sauce' },
        { id: 'b3', name: 'Double Trouble', price: 18.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=300&h=200', description: 'Two beef patties, double cheese, bacon, and all the fixings' },
      ],
      sides: [
        { id: 's1', name: 'Classic Fries', price: 4.99, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&q=80&w=300&h=200', description: 'Crispy golden fries with house seasoning' },
        { id: 's2', name: 'Onion Rings', price: 5.99, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&q=80&w=300&h=200', description: 'Beer-battered onion rings with chipotle dip' },
        { id: 's3', name: 'Loaded Tots', price: 7.99, image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=300&h=200', description: 'Tater tots topped with cheese, bacon, sour cream, and green onions' },
      ],
      shakes: [
        { id: 'sh1', name: 'Vanilla Shake', price: 6.99, image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80&w=300&h=200', description: 'Creamy vanilla ice cream blended to perfection' },
        { id: 'sh2', name: 'Chocolate Shake', price: 6.99, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=300&h=200', description: 'Rich chocolate ice cream with chocolate syrup' },
        { id: 'sh3', name: 'Strawberry Shake', price: 7.99, image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=300&h=200', description: 'Fresh strawberries blended with vanilla ice cream' },
      ],
    }
  },
];

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const OrderStatus = ({ orderId }: { orderId: string | null }) => {
  const [status, setStatus] = useState<'pending' | 'preparing' | 'ready' | 'delivering' | 'delivered' | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    if (!orderId) return;
    
    setStatus('pending');
    setLastUpdate(new Date());
    
    const updateInterval = setInterval(() => {
      setStatus(currentStatus => {
        if (!currentStatus) return 'pending';
        
        const statusFlow: Record<string, 'pending' | 'preparing' | 'ready' | 'delivering' | 'delivered'> = {
          'pending': 'preparing',
          'preparing': 'ready',
          'ready': 'delivering',
          'delivering': 'delivered',
          'delivered': 'delivered'
        };
        
        const newStatus = statusFlow[currentStatus];
        if (newStatus !== currentStatus) {
          setLastUpdate(new Date());
          toast.info(`Order status updated to: ${newStatus.toUpperCase()}`, {
            icon: <Bell className="h-4 w-4" />
          });
        }
        
        return newStatus;
      });
    }, 30000);
    
    return () => clearInterval(updateInterval);
  }, [orderId]);
  
  if (!status || !orderId) return null;
  
  const statusColors: Record<string, string> = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'preparing': 'bg-blue-100 text-blue-800',
    'ready': 'bg-green-100 text-green-800',
    'delivering': 'bg-purple-100 text-purple-800',
    'delivered': 'bg-gray-100 text-gray-800'
  };
  
  return (
    <div className="border rounded-lg p-4 mt-4 bg-background shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">Order Status</h3>
        <Badge variant="outline" className="flex gap-1">
          <RefreshCw className="h-3 w-3 animate-spin" />
          Live Updates
        </Badge>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Order #{orderId.slice(-4)}</span>
          <span className="text-sm text-muted-foreground">
            {lastUpdate ? `Updated: ${lastUpdate.toLocaleTimeString()}` : ''}
          </span>
        </div>
        
        <div className="flex items-center">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[status]}`}>
            {status.toUpperCase()}
          </span>
          
          <div className="ml-4 flex-1">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ 
                  width: status === 'pending' ? '20%' : 
                        status === 'preparing' ? '40%' :
                        status === 'ready' ? '60%' :
                        status === 'delivering' ? '80%' : '100%' 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItemCard = ({ item, onAddToCart }: { item: MenuItem; onAddToCart: (item: MenuItem) => void }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg hover:border-primary/50 hover:bg-secondary/20 transition-colors">
      <div className="md:w-1/4 h-48 md:h-32 overflow-hidden rounded-md">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="md:w-3/4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg">{item.name}</h3>
            <p className="font-medium text-lg">${item.price.toFixed(2)}</p>
          </div>
          <p className="text-muted-foreground mt-1">{item.description}</p>
        </div>
        
        <div className="mt-3 flex justify-end">
          <Button 
            size="sm" 
            onClick={() => onAddToCart(item)}
            className="group"
          >
            <Plus className="mr-1 h-4 w-4 transition-transform group-hover:scale-110" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

const RestaurantMenu = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('featured');
  const [cartItems, setCartItems] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const restaurant = getRestaurants().find(r => r.id.toString() === id);
  
  useEffect(() => {
    if (!id) return;
    
    try {
      const savedCart = localStorage.getItem(`cart-${id}`);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, [id]);
  
  useEffect(() => {
    if (!id) return;
    localStorage.setItem(`cart-${id}`, JSON.stringify(cartItems));
  }, [cartItems, id]);
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [id]);
  
  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
            <Link to="/restaurants">
              <Button>Back to Restaurants</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const menuSections: MenuSection[] = Object.entries(restaurant.menu).map(([key, items]) => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    items: items as MenuItem[],
  }));
  
  const handleAddToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.item.id === item.id);
      
      if (existingItem) {
        return prev.map(cartItem => 
          cartItem.item.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        return [...prev, { item, quantity: 1 }];
      }
    });
    
    toast("Added to cart", {
      description: `${item.name} has been added to your cart.`,
      action: {
        label: "View Cart",
        onClick: () => console.log("View cart clicked")
      },
    });
  };
  
  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.item.id === itemId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prev.map(cartItem => 
          cartItem.item.id === itemId 
            ? { ...cartItem, quantity: cartItem.quantity - 1 } 
            : cartItem
        );
      } else {
        return prev.filter(cartItem => cartItem.item.id !== itemId);
      }
    });
    
    toast("Removed from cart", {
      description: "Item removed from your cart.",
    });
  };
  
  const handleDeleteFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(cartItem => cartItem.item.id !== itemId));
    
    toast("Removed from cart", {
      description: "Item removed from your cart.",
    });
  };
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  
  const handleCheckout = () => {
    const newOrderId = `ORD-${Date.now().toString().slice(-6)}`;
    setOrderId(newOrderId);
    
    navigate('/checkout', {
      state: {
        cartItems,
        restaurantName: restaurant.name,
        restaurantId: restaurant.id,
        orderId: newOrderId
      }
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 pb-16">
        <div 
          className="h-64 md:h-80 relative"
          style={{
            backgroundImage: `url(${restaurant.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
            <div className="container mx-auto">
              <Link to="/restaurants" className="inline-flex items-center text-white mb-4 hover:underline">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Restaurants
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-white">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-food-yellow fill-food-yellow" />
                  <span className="font-medium">{restaurant.rating}</span>
                </div>
                <span>•</span>
                <span>{restaurant.cuisine}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{restaurant.distance}</span>
                </div>
                <span>•</span>
                <span>{restaurant.priceRange}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-6 py-8">
          <p className="text-lg text-muted-foreground mb-8">{restaurant.description}</p>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
              <Tabs defaultValue="featured" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="mb-6 flex w-full h-auto flex-wrap gap-2">
                  {menuSections.map(section => (
                    <TabsTrigger 
                      key={section.title.toLowerCase()} 
                      value={section.title.toLowerCase()}
                      className="flex-1 px-4 py-2"
                    >
                      {section.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {menuSections.map(section => (
                  <TabsContent 
                    key={section.title.toLowerCase()} 
                    value={section.title.toLowerCase()} 
                    className="space-y-4"
                  >
                    {section.items.map(item => (
                      <MenuItemCard 
                        key={item.id} 
                        item={item} 
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            <div className="lg:w-1/3">
              <div className="sticky top-24 bg-white border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Your Order</h2>
                  <Badge variant="outline" className="font-semibold">
                    {restaurant.deliveryTime}
                  </Badge>
                </div>
                
                <OrderStatus orderId={orderId} />
                
                {cartItems.length > 0 ? (
                  <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {cartItems.map((cartItem, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{cartItem.quantity}x</span>
                            <span>{cartItem.item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>${(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
                            <div className="flex items-center border rounded-md">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7 rounded-none border-r" 
                                onClick={() => handleRemoveFromCart(cartItem.item.id)}
                              >
                                <span className="text-lg font-bold">-</span>
                              </Button>
                              <div className="w-8 flex items-center justify-center">
                                <span className="text-sm">{cartItem.quantity}</span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7 rounded-none border-l" 
                                onClick={() => handleAddToCart(cartItem.item)}
                              >
                                <span className="text-lg font-bold">+</span>
                              </Button>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteFromCart(cartItem.item.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between items-center font-medium">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full" onClick={handleCheckout}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Proceed to Checkout ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                    <h3 className="font-medium mb-1">Your cart is empty</h3>
                    <p className="text-muted-foreground text-sm mb-4">Add items from the menu to get started</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('featured')}
                    >
                      Browse Menu
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default RestaurantMenu;
