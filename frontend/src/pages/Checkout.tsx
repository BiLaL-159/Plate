
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CartItem {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  quantity: number;
}

interface CheckoutState {
  cartItems: CartItem[];
  restaurantName: string;
  restaurantId: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Get cart data from location state
  const checkoutState = location.state as CheckoutState;
  
  if (!checkoutState || !checkoutState.cartItems || checkoutState.cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">You haven't added any items to your cart yet.</p>
            <Button onClick={() => navigate('/restaurants')}>
              Browse Restaurants
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const { cartItems, restaurantName, restaurantId } = checkoutState;
  
 
  const subtotal = cartItems.reduce((total, item) => 
    total + (item.item.price * item.quantity), 0
  );
  const deliveryFee = 2.99;
  const serviceFee = subtotal * 0.05; // 5% service fee
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + serviceFee + tax;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (!name || !email || !phone || !address || !cardNumber || !expiry || !cvv) {
      toast.error("Please fill in all fields");
      return;
    }
   
    setIsProcessing(true);
    
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      toast.success("Order placed successfully!");
    }, 2000);
  };
  
  const handleBackToRestaurant = () => {
    navigate(`/restaurants/${restaurantId}`);
  };
  
  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for your order from {restaurantName}. Your food is being prepared.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              A confirmation has been sent to {email}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/')}>
                Return Home
              </Button>
              <Button variant="outline" onClick={() => navigate('/restaurants')}>
                Browse More Restaurants
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 pb-16">
        <div className="container mx-auto px-6 py-8">
          <button 
            onClick={handleBackToRestaurant}
            className="flex items-center text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {restaurantName}
          </button>
          
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="border rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input 
                        id="address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        placeholder="123 Main St, Apt 4B"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        value={cardNumber} 
                        onChange={(e) => setCardNumber(e.target.value)} 
                        placeholder="4242 4242 4242 4242"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiration Date</Label>
                        <Input 
                          id="expiry" 
                          value={expiry} 
                          onChange={(e) => setExpiry(e.target.value)} 
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          value={cvv} 
                          onChange={(e) => setCvv(e.target.value)} 
                          placeholder="123"
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-6" 
                  size="lg" 
                  disabled={isProcessing}
                >
                  {isProcessing ? 
                    'Processing...' : 
                    `Complete Order • $${total.toFixed(2)}`
                  }
                </Button>
              </form>
            </div>
            
            <div className="lg:col-span-1">
              <div className="border rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                  {cartItems.map((cartItem, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{cartItem.quantity}x</span>
                        <span>{cartItem.item.name}</span>
                      </div>
                      <span>${(cartItem.item.price * cartItem.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
