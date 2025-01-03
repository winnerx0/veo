import { Outlet } from "react-router-dom";
import Header from "../components/Header.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <section className="flex flex-col min-h-screen items-center">
        <Header />
        <Outlet />
        <footer className="fixed bottom-4">
          <div>
            <p>&copy; Veo 2025 by Winnerezy</p>
          </div>
        </footer>
      </section>
    </QueryClientProvider>
  );
}

export default App;
