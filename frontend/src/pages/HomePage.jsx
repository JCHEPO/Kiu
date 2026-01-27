import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import EventPostItPreview from "../components/EventPostItPreview";

export default function HomePage() {
  const { auth, fetchWithAuth } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    wrapper: {
      padding: "40px",
      backgroundColor: "#fafafa",
      minHeight: "100vh"
    },
    header: {
      textAlign: "center",
      marginBottom: "50px"
    },
    title: {
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333"
    },
    subtitle: {
      fontSize: "16px",
      color: "#666",
      marginBottom: "20px"
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
      justifyContent: "center"
    },
    btnCreateEvent: {
      padding: "12px 30px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold"
    },
    btnExplore: {
      padding: "12px 30px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold"
    },
    eventsSection: {
      marginTop: "40px"
    },
    sectionTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "30px",
      color: "#333"
    },
    eventsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "30px",
      gridAutoRows: "auto"
    },
    eventCard: {
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    eventCardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)"
    },
    emptyState: {
      textAlign: "center",
      padding: "60px 20px",
      color: "#999"
    },
    emptyStateTitle: {
      fontSize: "24px",
      marginBottom: "10px"
    },
    emptyStateText: {
      fontSize: "16px",
      marginBottom: "20px"
    },
    loadingMessage: {
      textAlign: "center",
      fontSize: "18px",
      color: "#666",
      padding: "40px"
    }
  };

  if (loading) {
    return <div style={styles.loadingMessage}>Cargando eventos...</div>;
  }

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>🎉 Petu - Eventos Comunitarios</h1>
        <p style={styles.subtitle}>Crea y descubre eventos increíbles en tu comunidad</p>
        
        <div style={styles.buttonContainer}>
          <button
            style={styles.btnCreateEvent}
            onClick={() => navigate("/create-event")}
          >
            ➕ Crear Evento
          </button>
          <button
            style={styles.btnExplore}
            onClick={() => document.getElementById("events-section").scrollIntoView({ behavior: "smooth" })}
          >
            🔍 Explorar Eventos
          </button>
        </div>
      </div>

      {/* EVENTOS DISPONIBLES */}
      <div style={styles.eventsSection} id="events-section">
        <h2 style={styles.sectionTitle}>📌 Eventos Disponibles</h2>

        {events.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyStateTitle}>No hay eventos aún</div>
            <p style={styles.emptyStateText}>
              Sé el primero en crear un evento y conectar con tu comunidad
            </p>
            <button
              style={styles.btnCreateEvent}
              onClick={() => navigate("/create-event")}
            >
              Crear el primer evento
            </button>
          </div>
        ) : (
          <div style={styles.eventsGrid}>
            {events.map(event => (
              <div
                key={event._id}
                style={styles.eventCard}
                onClick={() => navigate(`/event/${event._id}`)}
                onMouseEnter={e => Object.assign(e.currentTarget.style, styles.eventCardHover)}
                onMouseLeave={e => Object.assign(e.currentTarget.style, styles.eventCard)}
              >
                <EventPostItCard event={event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Componente para mostrar evento como post-it en la grilla
function EventPostItCard({ event }) {
  const styles = {
    postIt: {
      width: "100%",
      minHeight: "320px",
      backgroundColor: "#fffacd",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      position: "relative",
      transform: "rotate(-2deg)",
      borderRadius: "2px",
      fontFamily: "cursive, 'Comic Sans MS', sans-serif",
      border: "1px solid #e8d700",
      display: "flex",
      flexDirection: "column"
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333",
      wordBreak: "break-word"
    },
    category: {
      display: "inline-block",
      backgroundColor: "#ff6b6b",
      color: "white",
      padding: "4px 10px",
      borderRadius: "12px",
      fontSize: "12px",
      marginBottom: "10px",
      fontFamily: "sans-serif",
      fontWeight: "bold",
      width: "fit-content"
    },
    section: {
      marginBottom: "10px",
      fontSize: "12px",
      lineHeight: "1.4",
      color: "#555"
    },
    label: {
      fontWeight: "bold",
      color: "#333",
      fontFamily: "sans-serif",
      fontSize: "11px"
    },
    tape: {
      position: "absolute",
      top: "-8px",
      left: "20px",
      width: "60px",
      height: "20px",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      borderRadius: "50%",
      transform: "rotate(-15deg)"
    },
    footer: {
      marginTop: "auto",
      paddingTop: "10px",
      borderTop: "1px dashed #ccc",
      fontSize: "11px",
      color: "#999"
    }
  };

  return (
    <div style={styles.postIt}>
      <div style={styles.tape}></div>
      
      <div style={styles.title}>{event.title}</div>

      {event.category && (
        <div style={styles.category}>{event.category}</div>
      )}

      {event.description && (
        <div style={styles.section}>
          <span style={styles.label}>Sobre:</span>
          <p style={{ margin: "4px 0 0 0", fontSize: "12px" }}>
            {event.description.substring(0, 50)}
            {event.description.length > 50 ? "..." : ""}
          </p>
        </div>
      )}

      {event.mode === "direct" && event.date && (
        <div style={styles.section}>
          <span style={styles.label}>📅 {event.date}</span>
        </div>
      )}

      {event.location && (
        <div style={styles.section}>
          <span style={styles.label}>📍 {event.location}</span>
        </div>
      )}

      {event.mode === "proposal" && (
        <div style={styles.section}>
          <span style={{...styles.label, color: "#ff6b6b"}}>🗳️ Votación Pendiente</span>
        </div>
      )}

      <div style={styles.footer}>
        👤 Creado por {event.createdBy?.name || "Usuario"}
      </div>
    </div>
  );
}