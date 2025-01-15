import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from './ui/sheet';
import { Menu } from 'lucide-react';
export default function MobileNav() {
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className='text-black'></Menu>
        </SheetTrigger>
        <SheetContent className='space-y-3'>
            <SheetTitle>
                <span>Welcome to Plate</span>
            </SheetTitle>
            <Separator/>
            <SheetDescription className="flex">
                <Button className='flex-1 font-bold bg-black'>Login</Button>
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}
