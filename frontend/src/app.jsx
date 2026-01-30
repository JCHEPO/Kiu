import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPAge";
import CreateEventPage from "./pages/CreateEventPage";
import EventsListPage from "./pages/EventsListPage";
import HomePage from "./pages/HomePage";
import EventDetailPage from "./pages/EventDetailPage";

function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);
  return auth ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-event" element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><EventsListPage /></ProtectedRoute>} />
        <Route path="/event/:id" element={<ProtectedRoute><EventDetailPage /></ProtectedRoute>} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
