import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./layouts/App.tsx";
import "./index.css";
import Home from "./pages/Home.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import ReactQueryProvider from "./components/ReactQueryProvider.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Auth from "./layouts/Auth.tsx";
import Create from "./pages/Create.tsx";
import Poll from "./pages/Poll.tsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" index element={<Onboarding />} />
            <Route path="home" element={<Home />} />
            <Route path="polls">
              <Route path="create" element={<Create/>}/>
            <Route path=":pollId" element={<Poll/>}/>
            </Route>
          </Route>
          <Route path="/" element={<Auth/>}>
          <Route  path="login" element={<Login/>}/>
          <Route  path="register" element={<Register/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactQueryProvider>
    <ToastContainer/>
  </StrictMode>
);
