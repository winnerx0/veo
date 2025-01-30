import axios from "axios";
import { BACKEND_URL } from "../../lib";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const App = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function verify() {
      const res = await axios.post(`${BACKEND_URL}/api/v1/auth/verify-token`, {
        token,
      });
      const isTokenValid: boolean = res.data;

      if (!isTokenValid) {
        navigate("login");
      }
    }
    verify();
  }, [token, navigate]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="flex justify-center items-center h-14">
        <p>Built by Winner</p>
      </footer>
    </div>
  );
};

export default App;