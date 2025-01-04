import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const Auth = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex items-center justify-center px-4 py-6">
        <Outlet />
        <footer className="fixed bottom-4">
          <div>
            <p>&copy; Veo 2025 by Winnerezy</p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
};

export default Auth;
