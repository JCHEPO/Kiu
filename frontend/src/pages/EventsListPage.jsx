import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function EventsListPage() {
  const { fetchWithAuth } = useContext(AuthContext);
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
      <h2>Eventos Disponibles</h2>
      <ul>
        {events.map(event => (
          <li key={event._id} onClick={() => setSelectedEvent(event)} style={{ cursor: "pointer" }}>
            <strong>{event.title}</strong> - {new Date(event.date).toLocaleString()}
          </li>
        ))}
      </ul>
      {selectedEvent && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
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