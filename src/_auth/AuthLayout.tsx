import Version from "@/components/shared/Version";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <section className="h-screen flex items-center justify-center">
        <div className="w-[410px] p-3">
          <div className="flex items-center justify-center mb-8">
            <img src="/assets/logo.png" className="h-8 w-auto" alt="logo" />
          </div>
          <Outlet />
          <div className="flex justify-center items-center mt-5">
            <Version />
          </div>
        </div>
      </section>
    </>
  );
}
