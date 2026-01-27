import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPAge";
import CreateEventPage from "./pages/CreateEventPage";
import EventsListPage from "./pages/EventsListPage";

function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);
  return auth ? children : <Navigate to="/login" />;
}

function Home() {
  const { logout, auth, fetchWithAuth } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetchWithAuth("http://localhost:3000/api/events");
    if (res.ok) {
      const data = await res.json();
      setEvents(data);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Bienvenido, {auth?.user?.email}!</h1>
      <p>Petu funcionando 🚀</p>
      
      <nav style={{ marginBottom: "30px" }}>
        <a href="/create-event" style={{ marginRight: "20px" }}>Crear Evento</a>
        <button onClick={logout}>Cerrar Sesión</button>
      </nav>

      <h2>Eventos Disponibles</h2>
      <ul style={{ fontSize: "16px" }}>
        {events.map(event => (
          <li key={event._id} onClick={() => setSelectedEvent(event)} style={{ cursor: "pointer", marginBottom: "10px" }}>
            <strong>{event.title}</strong> - {new Date(event.date).toLocaleString()}
          </li>
        ))}
      </ul>
      {selectedEvent && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "15px", backgroundColor: "#f9f9f9" }}>
          <h3>{selectedEvent.title}</h3>
          <p><strong>Fecha:</strong> {new Date(selectedEvent.date).toLocaleString()}</p>
          <p><strong>Descripción:</strong> {selectedEvent.description}</p>
          <p><strong>Ubicación:</strong> {selectedEvent.location}</p>
          <p><strong>Máx. Participantes:</strong> {selectedEvent.maxParticipants}</p>
          <p><strong>Creador:</strong> {selectedEvent.creator?.email}</p>
          <button onClick={() => setSelectedEvent(null)}>Cerrar</button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-event" element={<ProtectedRoute><CreateEventPage /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><EventsListPage /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
