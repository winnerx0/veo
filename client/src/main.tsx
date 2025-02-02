import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReactQueryProvider from "./components/ReactQueryProvider.tsx";
import "./index.css";
import App from "./layouts/App.tsx";
import Create from "./pages/Create.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Poll from "./pages/Poll.tsx";
import Register from "./pages/Register.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="polls">
              <Route path="create" element={<Create />} />
              <Route path=":pollId" element={<Poll />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ReactQueryProvider>
    <ToastContainer hideProgressBar />
  </StrictMode>
);
