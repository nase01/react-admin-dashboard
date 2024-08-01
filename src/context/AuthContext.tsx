import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { User } from "@/types";
import { getCurrentUser } from "@/lib/api";

export const INITIAL_USER = {
  id: "",
  name: "",
  email: "",
  accountType: "",
  role: "",
  active: true,
  pwForceChange: false,
  ip: "",
  ipWhitelist: [],
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
  setJWT: () => {},
};

type IContextType = {
  user: User;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const jwt = localStorage.getItem('jwt');

  const checkAuthUser = async () => {
    setIsLoading(true);

    try {
        const currentAdmin = await getCurrentUser();
        if (currentAdmin) {
          setUser({
            id: currentAdmin.$id,
            name: currentAdmin.name,
            email: currentAdmin.username,
            accountType: currentAdmin.accountType,
            role: currentAdmin.role,
            active: currentAdmin.active,
            pwForceChange: currentAdmin.pwForceChange,
            ip: currentAdmin.ip,
            ipWhitelist: currentAdmin.ipWhitelist,
          });

          setIsAuthenticated(true);
          
          return true;
        }
      
      return false;

    } catch (error) {
      console.error(error);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (
      jwt  === "[]" ||
      jwt  === null ||
      jwt  === undefined
    ) {
      navigate("/sign-in");
    } else {
      (currentPath === "/sign-in" || currentPath === "/sign-up") 
      && navigate("/");
    }

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);