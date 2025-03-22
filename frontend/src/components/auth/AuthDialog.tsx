
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
}

const AuthDialog: React.FC<AuthDialogProps> = ({ 
  isOpen, 
  onClose,
  initialView = 'login'
}) => {
  const [view, setView] = useState<'login' | 'signup'>(initialView);

  const toggleView = () => {
    setView(view === 'login' ? 'signup' : 'login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        {view === 'login' ? (
          <LoginForm onToggleForm={toggleView} onSuccess={onClose} />
        ) : (
          <SignupForm onToggleForm={toggleView} onSuccess={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
