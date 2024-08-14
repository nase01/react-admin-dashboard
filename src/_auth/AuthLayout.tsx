import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <div className="flex justify-between rounded-[30px] overflow-hidden p-5">
          <div className="flex-center flex-col p-3 md:w-[450px]">
            <div className="flex justify-center items-center">
              <img src="/assets/logo.svg" alt="logo" />
            </div>
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
}
