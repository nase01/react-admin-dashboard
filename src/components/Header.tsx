import { LogOut } from "lucide-react";
import { Button } from "./ui/button";


const Header = () => {
  const handleLogout = () => {
    window.location.href = '/logout'; // Example redirect, replace with your logout logic
  };

  return (
    <div className="flex justify-between items-center p-4 bg-slate-950 text-white">
      <h1 className="text-xl font-bold">RAD</h1>
      <ul className="flex-grow flex justify-center space-x-4 text-white">
        <li><a href="/" className="hover:underline">Dashboard</a></li>
        <li><a href="/users" className="hover:underline">Users</a></li>
      </ul>
      <Button onClick={handleLogout} size="icon" className="rounded-full">
        <LogOut className="w-5 h-5" />
      </Button>
    </div>
    
  )
}

export default Header