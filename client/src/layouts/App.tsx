import axios from "axios";
import { BACKEND_URL } from "../../lib";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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
    <div className="p-4">
      <Outlet />
      <div className="flex justify-center">
        <p className="fixed bottom-4 self-center">Built by Winner </p>
      </div>
    </div>
  );
};

export default App;
