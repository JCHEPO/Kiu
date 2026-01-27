import React from "react";

export default function EventPostItPreview({ form }) {
  const styles = {
    postIt: {
      width: "280px",
      minHeight: "380px",
      backgroundColor: "#fffacd",
      padding: "20px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      position: "relative",
      transform: "rotate(-2deg)",
      borderRadius: "2px",
      fontFamily: "cursive, 'Comic Sans MS', sans-serif",
      border: "1px solid #e8d700"
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "12px",
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
      marginBottom: "12px",
      fontFamily: "sans-serif",
      fontWeight: "bold"
    },
    section: {
      marginBottom: "12px",
      fontSize: "13px",
      lineHeight: "1.4",
      color: "#555"
    },
    label: {
      fontWeight: "bold",
      color: "#333",
      fontFamily: "sans-serif",
      display: "block",
      marginBottom: "4px",
      fontSize: "12px"
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      marginTop: "4px"
    },
    tag: {
      backgroundColor: "#4dabf7",
      color: "white",
      padding: "2px 8px",
      borderRadius: "12px",
      fontSize: "11px",
      fontFamily: "sans-serif"
    },
    emptyState: {
      color: "#999",
      fontStyle: "italic",
      fontSize: "13px"
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
    }
  };

  return (
    <div style={styles.postIt}>
      <div style={styles.tape}></div>
      
      {form.title ? (
        <>
          <div style={styles.title}>{form.title}</div>
          
          {form.category && (
            <div style={styles.category}>{form.category}</div>
          )}

          {form.subcategory && (
            <div style={styles.section}>
              <span style={{fontSize: "11px", color: "#666"}}>📂 {form.subcategory}</span>
            </div>
          )}

          {form.description && (
            <div style={styles.section}>
              <span style={styles.label}>Sobre:</span>
              <p style={{ margin: "0", fontSize: "12px" }}>
                {form.description.substring(0, 60)}
                {form.description.length > 60 ? "..." : ""}
              </p>
            </div>
          )}

          {form.tags.length > 0 && (
            <div style={styles.section}>
              <span style={styles.label}>Tags:</span>
              <div style={styles.tags}>
                {form.tags.map((tag, i) => (
                  <span key={i} style={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          )}

          {form.mode && (
            <div style={styles.section}>
              <span style={styles.label}>Modo:</span>
              {form.mode === "direct" ? "📅 Directo" : "🗳️ Votación"}
            </div>
          )}

          {form.date && (
            <div style={styles.section}>
              <span style={styles.label}>Cuándo:</span>
              <span style={{fontSize: "12px"}}>{form.date} {form.time}hs</span>
            </div>
          )}

          {form.location && (
            <div style={styles.section}>
              <span style={styles.label}>Dónde:</span>
              <span style={{fontSize: "12px"}}>{form.location}</span>
            </div>
          )}

          {form.cost > 0 && (
            <div style={styles.section}>
              <span style={styles.label}>Valor Cancha:</span>
              <span style={{fontSize: "12px"}}>${form.cost}</span>
            </div>
          )}

          {form.clasesCost > 0 && (
            <div style={styles.section}>
              <span style={styles.label}>Valor:</span>
              <span style={{fontSize: "12px"}}>${form.clasesCost}</span>
            </div>
          )}
        </>
      ) : (
        <div style={styles.emptyState}>
          ✍️ Comienza escribiendo el nombre de tu evento...
        </div>
      )}
    </div>
  );
}