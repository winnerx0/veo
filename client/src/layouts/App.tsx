import axios from "axios";
import { BACKEND_URL } from "../../lib";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const App = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    async function verify() {
      const res = await axios.post(`${BACKEND_URL}/api/v1/verify-token`, {
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
    </div>
  );
};

export default App;
