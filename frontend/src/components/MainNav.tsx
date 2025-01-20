import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import UsernameMenu from "./UsernameMenu";
export default function MainNav() {
    const {loginWithRedirect, isAuthenticated}=useAuth0();
  return (
    <span className="flex space-x-2 items-center">
        {isAuthenticated? <UsernameMenu/> :  <Button 
     variant="ghost" 
     className="font-bold text-black"
     onClick={async ()=> await loginWithRedirect()}
     >
    Login
    </Button>}
    </span>
   
  )
}
