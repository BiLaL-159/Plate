import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from './ui/sheet';
import { CircleUserRound, Menu } from 'lucide-react';
import MobileNavOnAuth from './MobileNavOnAuth';
export default function MobileNav() {
    const {loginWithRedirect, isAuthenticated, user} = useAuth0();
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className='text-black'></Menu>
        </SheetTrigger>
        <SheetContent className='space-y-3'>
            <SheetTitle>
                {isAuthenticated? <span className='flex items-center font-bold gap-2'>
                    <CircleUserRound></CircleUserRound>
                    {user?.email}
                </span>
                    :
                    <span>Welcome to Plate</span>}
                
            </SheetTitle>
            <Separator/>
            <SheetDescription className="flex flex-col gap-4">
                {isAuthenticated? 
                <MobileNavOnAuth></MobileNavOnAuth>
                
                    : 
                <Button onClick={()=> loginWithRedirect()}className='flex-1 font-bold bg-black'>Login</Button>
                }
                
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}
