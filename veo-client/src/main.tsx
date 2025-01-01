import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./layouts/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Auth from "./layouts/Auth.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/" >
        <Route element={<Home/>} path="home"/>
        </Route>
        <Route element={<Auth/>} path="/auth">
        <Route element={<Register/>} path="register"/>
        <Route element={<Login/>} path="login"/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
