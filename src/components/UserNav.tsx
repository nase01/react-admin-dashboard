
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useGetCurrentUser } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { signOut } from "@/lib/api/AuthApi";
import { ucFirst, updatePageTitle } from "@/lib/utils";
import Loader from "@/components/shared/Loader";

const UserNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setIsAuthenticated } = useUserContext();
  const { data: currentUser } = useGetCurrentUser();

  const handleSignOut = async () => {
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  useEffect(() => {
    updatePageTitle(location); 
  }, [location.pathname]);
 
  const defaultAvatar = "/assets/avatars/default-avatar.png";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full dark:hover:border-gray-600" size="icon">
          <Avatar className="w-9 h-9" >
            <AvatarImage src={defaultAvatar} />
            <AvatarFallback>
              <div className="skeleton-loader w-full h-full rounded-full"></div>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 " align="end" forceMount>
        {!currentUser ? <div className="p-5"><Loader /></div>: (
          <>
            <DropdownMenuLabel className="font-normal p-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-lg font-medium leading-none">{currentUser.name} ({ucFirst(currentUser.role)})</p>
                  <p className="text-sm leading-none text-muted-foreground">
                    {currentUser.email}
                  </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="round-lg"  onClick={() => handleSignOut()} >
              Log out
              <DropdownMenuShortcut>
                <LogOut className="w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav