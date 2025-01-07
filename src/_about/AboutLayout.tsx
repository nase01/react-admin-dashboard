import { ModeToggle } from "@/components/ModeToggle";
import { Outlet } from "react-router-dom";

export default function AboutLayout() {
  return (
    <>
      <nav className="flex w-full justify-between p-3 shadow-md dark:border-b-[1px] sticky top-0 z-10
      bg-gray-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          
          <img src="/assets/logo.png" className="h-8 w-auto" alt="logo" />
          <div className="flex gap-2 items-center">
            <ModeToggle />
          </div>
      </nav>
      <section className="p-10">
        <Outlet />
      </section>
    </>
  );
}
