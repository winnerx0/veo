import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="min-h-[100dvh] flex flex-col">
    <main className="flex-1 p-4 flex justify-center h-full">
      <Outlet />
    </main>
      <footer className="flex justify-center items-center h-14">
        <p>
          Built by <a href="https://github.com/winnerezy">Winner</a>
        </p>
      </footer>
    </div>
  );
};

export default Auth;
