import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const App = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("login");
    }
  }, [token, navigate])
  return (
    <div className="p-4">
      <Outlet />
    </div>
  );
};

export default App;
