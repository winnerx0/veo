import axios from "axios";
import { BACKEND_URL } from "../../lib";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Title } from "react-admin";

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
    <>
      <Title title={"Veo - Smart Voting"} />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 flex justify-center">
          <Outlet />
        </main>
        <footer className="flex justify-center items-center h-14">
          <p>Built by Winner</p>
        </footer>
      </div>
    </>
  );
};

export default App;
