import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ChevronRight, XCircle } from "lucide-react";
import { useMobileMenuToggle, useActiveSubMenu } from "@/components/ToggleProvider";
import { Button } from "@/components/ui/button";
import { getAllowedLinks } from "@/lib/utils";
import Version from "@/components/shared/Version";

const SidebarMobile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navLinks = getAllowedLinks();
  const { mobileMenuToggle, setMobileMenuToggle } = useMobileMenuToggle();
  const { activeSubMenu, setActiveSubMenu } = useActiveSubMenu();

  const toggleSubMenu = (item: any) => {
    if (activeSubMenu === item.label) {
      setActiveSubMenu("");
    } else {
      setActiveSubMenu(item.label);
    }
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event: { key: string; }) => {
      if (event.key === "Escape") {
        setMobileMenuToggle((curr) => !curr);
      }
    };

    document.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [mobileMenuToggle, setMobileMenuToggle]);

  return (
    <div
    className={`fixed lg:hidden inset-0 justify-start items-center bg-black bg-opacity-50 z-40
    ${mobileMenuToggle ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}
    transition-opacity duration-300 ease-in-out`}
    onClick={() => setMobileMenuToggle((curr) => !curr)}
    >
      <div className={`w-72 bg-white dark:bg-slate-950 h-full transform transition-transform 
      ${mobileMenuToggle ? "-translate-x-full" : "translate-x-0"}`}
      onClick={(e) => e.stopPropagation()}
      >
        <nav className="h-full flex flex-col">
        <div className="flex items-center justify-between p-3" >
            <img
              src="/assets/logo.png"
              className="h-8 w-auto"
              alt="logo"
            />
            <Button
              onClick={() => setMobileMenuToggle((curr) => !curr)}
              className="rounded-full border-none"
              variant="outline"
              size="icon"
            >
              <XCircle />
            </Button>
          </div>
          <div className="overflow-y-auto overflow-x-hidden h-full p-3 ">
            <ul className="flex-1 -mt-3">
              {navLinks.map((item) => (
                <li key={item.label} >
                  <div className={`
                  relative flex items-center p-3 my-4 text-gray-400 font-medium group cursor-pointer rounded-lg
                  ${ location.pathname === item.route ? "bg-main text-white" : item.subMenu &&
                  item.subMenu.some((subItem) => subItem.route === location.pathname)
                  ? "bg-main text-white" : "hover:bg-accent"}`}
                  onClick={item.subMenu ? () => toggleSubMenu(item) : () => {
                    setMobileMenuToggle((curr) => !curr);
                    navigate(item.route);
                  }}
                  >
                    {item.icon && <item.icon /> }

                    <span className="overflow-hidden w-52 ml-3">
                      {item.label}
                    </span>
                    {item.subMenu && (
                      <div
                        className={`transition-all duration-200 ${
                          activeSubMenu === item.label && "transform rotate-90"
                        }`}
                      >
                        <ChevronRight />
                      </div>
                    )}
                  </div>
                  {item.subMenu && activeSubMenu === item.label && (
                    <ul className="-mt-3 ml-8 border-l-2 ">
                      {item.subMenu.map((subItem) => (
                        <li
                          key={subItem.label}
                          className="p-3"
                        >
                          <Link to={subItem.route}
                            className={`relative flex items-center w-52 ml-3 text-sm
                            ${location.pathname === subItem.route ? "text-main" : "text-gray-400"}`}
                            onClick={() => setMobileMenuToggle((curr) => !curr)}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
					<div className="fixed bottom-0 left-0 py-2 bg-white dark:bg-slate-950 w-72 text-center ">
						<Version />
					</div>
        </nav>
      </div>
    </div>
  )
}

export default SidebarMobile 