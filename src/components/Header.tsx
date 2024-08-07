import { useNavigate, useLocation } from "react-router-dom";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useSignOut } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { NavLink } from "@/types";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const links: NavLink[] = [
    { route: "/admin/dashboard", label: "Dashboard" },
    { route: "/admin/users", label: "Users" },
  ];

  return (
    <div className="flex justify-between items-center p-4 bg-slate-950 text-white">
      <h1 className="text-xl font-bold">RAD</h1>
      <ul className="flex-grow flex justify-center space-x-4 text-white">
        {links.map((link) => (
          <li key={link.route}>
            <a
              href={link.route}
              className={`hover:underline ${location.pathname === link.route ? "underline" : ""}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <Button onClick={(e) => handleSignOut(e)} size="icon" className="rounded-full">
        <LogOut className="w-5 h-5" />
      </Button>
    </div>
    
  )
}

export default Header