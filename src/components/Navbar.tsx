import { AlignRight, ChevronFirst } from "lucide-react";
import { useSidebarExpanded, useMobileMenuToggle } from "@/components/ToggleProvider";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import UserNav from "@/components/UserNav";

const Navbar = () => {
  const { sidebarExpanded, setSidebarExpanded } = useSidebarExpanded();
  const { setMobileMenuToggle } = useMobileMenuToggle();

  return (
    <nav className="flex w-full justify-between p-3 shadow-md dark:border-b-[1px] sticky top-0 z-10
    bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Button
        onClick={() => setMobileMenuToggle((curr) => !curr)}
        className="lg:hidden rounded-full border-none bg-transparent"
        variant="outline"
        size="icon"
      >
        <AlignRight />
      </Button>

      <div
        className={`flex justify-between items-center overflow-hidden  max-lg:hidden transition-all ${
          sidebarExpanded ? "w-[255px]" : "w-10"
        }`}
      >
        <img
          src="/assets/logo.png"
          className={`overflow-hidden transition-all h-6 ${
            sidebarExpanded ? "h-8 w-auto" : "w-0"
          }`}
          alt="logo"
        />

        <Button
          onClick={() => setSidebarExpanded((curr) => !curr)}
          variant="outline"
          className={`rounded-full border-none transition-all bg-transparent text-black dark:text-white duration-300 ${
            sidebarExpanded && "rotate-180"
          }`}
          size="icon"
        >
          <ChevronFirst />
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        <ModeToggle />
        <UserNav />
      </div>
    </nav>
  );
};

export default Navbar;