import { useNavigate } from "react-router-dom";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useSignOut } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useUserContext();
  const { mutate: signOut } = useSignOut();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-slate-950 text-white">
      <h1 className="text-xl font-bold">RAD</h1>
      <ul className="flex-grow flex justify-center space-x-4 text-white">
        <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
        <li><a href="/users" className="hover:underline">Users</a></li>
      </ul>
      <Button onClick={(e) => handleSignOut(e)} size="icon" className="rounded-full">
        <LogOut className="w-5 h-5" />
      </Button>
    </div>
    
  )
}

export default Header