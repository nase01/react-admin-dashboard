import { Outlet } from "react-router-dom";

export default function AboutLayout() {
  return (
    <>
      <section className="h-screen flex items-center justify-center">
        <div className="p-3">
          <div className="flex items-center mb-8">
            <img src="/assets/logo.png" className="h-8 w-auto" alt="logo" />
          </div>
          <Outlet />
        </div>
      </section>
    </>
  );
}
