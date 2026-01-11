import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPAge";

function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);
  return auth ? children : <Navigate to="/login" />;
}

function Home() {
  const { logout, auth } = useContext(AuthContext);
  return (
    <div style={{ padding: "40px", fontSize: "24px" }}>
      <h1>Bienvenido, {auth?.user?.email}!</h1>
      <p>Rol: {auth?.user?.rol}</p>
      <p>Petu funcionando 🚀</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
