import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";



export default function MobileNavOnAuth() {
    const {logout}= useAuth0();
  return (
    <>
      <Link to="/user-profile" className="flex items-center font-bold text-black">
      User Profile
      </Link>
      <Button className="flex items-center px-3 font-bold" onClick={()=>logout()}>Logout</Button>
    </>
  )
}
