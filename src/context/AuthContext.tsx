import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { User } from "@/types";
import { getCurrentUser } from "@/lib/api/UserApi";
import { getJwt, getJwtPayload, matchRoute } from '@/lib/utils';
import { signOut } from "@/lib/api/AuthApi";
import { navLinks } from "@/constants";

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

const jwtPayload = getJwtPayload();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const jwt = getJwt();

  const checkAuthUser = async () => {
    setIsLoading(true);

    try {
      if(jwt) {
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
        } else {
          navigate("/sign-in");
        }
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

    if (jwt  === "[]" || jwt  === null || jwt  === undefined ) {
      navigate("/sign-in");
    } else { 
      (currentPath === "/" || currentPath === "/sign-in") 
      && navigate("/panel/dashboard");
    }

    checkAuthUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const currentRoute = window.location.pathname;
      
      const currentNavLink = navLinks.find(link => matchRoute(link.route, currentRoute)); 
      const ipWhitelist = user.ipWhitelist
      
      if (currentNavLink) {
        const allowedRoles = currentNavLink.restrictions;
        
        const hasAccess = 
          user.role === "super" || 
          allowedRoles.length === 0 || 
          allowedRoles.includes(user.role); 

        const isIpAllowed = 
          !ipWhitelist || 
          ipWhitelist.length === 0 || 
          ipWhitelist.includes(user.ip);

        if (!hasAccess) {
          navigate("/unauthorized");
        } else if (
          !user.active || 
          jwtPayload?.role != user.role || 
          !isIpAllowed) {
            signOut();
            setIsAuthenticated(false);
            setUser(INITIAL_USER);
            navigate("/sign-in");
        } else if (user.pwForceChange) {
          navigate("/panel/account-settings");
        }
      }
    }
  }, [isAuthenticated, user, navigate]);

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