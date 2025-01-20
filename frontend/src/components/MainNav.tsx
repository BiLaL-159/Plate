import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
export default function MainNav() {
    const {loginWithRedirect}=useAuth0();
  return (
    <Button 
     variant="ghost" 
     className="font-bold text-black"
     onClick={async ()=> await loginWithRedirect()}
     >
    Login
    </Button>
  )
}
