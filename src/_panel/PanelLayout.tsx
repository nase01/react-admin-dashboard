import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ToggleProvider } from "@/components/ToggleProvider";
import { Outlet } from "react-router-dom";

const PanelLayout = () => {
  return (
    <ToggleProvider>
      <div className="w-full">
        <Navbar />
        {/* SidebarMobile */}
        <section className="w-full pb-10 md:flex">
          <Sidebar />
          <div className="p-12 max-lg:p-6 flex-1">
            <Outlet />
          </div>
        </section>
      </div>
    </ToggleProvider>
  );
};

export default PanelLayout;