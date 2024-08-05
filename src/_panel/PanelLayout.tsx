import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const PanelLayout = () => {
  return (
    <div className="w-full md:flex">
      <section className="flex-1 h-full">
        <Header />
        <Outlet />
      </section>
    </div>
  );
};

export default PanelLayout;