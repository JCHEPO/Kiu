import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getSuggestedCategories, getCategoriesData, getSubcategoriesByLabel, getCategoryKeyByLabel, getSuggestedTagsBySubcategory, getExclusiveGroupForTag, getTagsInExclusiveGroup } from "../utils/eventIntents";
import EventPostItPreview from "../components/EventPostItPreview";

const CATEGORIES_DATA = getCategoriesData();

export default function CreateEventPage() {
  const { auth, fetchWithAuth } = useContext(AuthContext);
  const [step, setStep] = useState("category");
  const [form, setForm] = useState({
    category: "",
    subcategory: "",
    title: "",
    description: "",
    tags: [],
    invitees: [],
    mode: "direct",
    date: "",
    time: "",
    location: "",
    cost: 0,
    maxParticipants: 10,
    clasesModality: "gratis",
    clasesCost: 0,
    pollOptions: { dates: [], locations: [] },
    suggestedCategories: []
  });
  const [inviteeInput, setInviteeInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();

  const handleCategorySelect = (cat) => {
    setForm({ ...form, category: cat, subcategory: "" });
    setStep("subcategory");
  };

  const handleSubcategorySelect = (subcat) => {
    setForm({ ...form, subcategory: subcat });
    setStep("mandatory");
  };

  const handleTitleChange = (e) => {
    const input = e.target.value;
    setTitleInput(input);
    const suggestions = getSuggestedCategories(input);
    const selectedCategory = suggestions.length > 0 ? suggestions[0] : "";
    setForm(prev => ({
      ...prev,
      category: selectedCategory,
      suggestedCategories: suggestions,
      title: input
    }));
  };

  const removeCategory = () => {
    setForm(prev => ({
      ...prev,
      category: "",
      suggestedCategories: []
    }));
    setTitleInput("");
  };

  const handleAddTag = (tag) => {
    if (tag.trim() && !form.tags.includes(tag.trim())) {
      const newTag = tag.trim();
      const exclusiveGroup = getExclusiveGroupForTag(newTag);
      let updatedTags = form.tags;
      if (exclusiveGroup) {
        const groupTags = getTagsInExclusiveGroup(exclusiveGroup);
        updatedTags = form.tags.filter(t => !groupTags.includes(t));
      }
      setForm(prev => ({
        ...prev,
        tags: [...updatedTags, newTag]
      }));
    }
  };

  const handleRemoveTag = (index) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleAddCustomTag = () => {
    if (tagInput.trim()) {
      handleAddTag(tagInput);
      setTagInput("");
    }
  };

  const handleAddInvitee = () => {
    if (inviteeInput.trim()) {
      setForm({
        ...form,
        invitees: [...form.invitees, inviteeInput]
      });
      setInviteeInput("");
    }
  };

  const handleRemoveInvitee = (index) => {
    setForm({
      ...form,
      invitees: form.invitees.filter((_, i) => i !== index)
    });
  };

  const handleModeSelect = (mode) => {
    setForm({ ...form, mode });
    setStep(mode === "direct" ? "details" : "voting");
  };

  const handleAddPollOption = (type, option) => {
    if (option.trim()) {
      setForm({
        ...form,
        pollOptions: {
          ...form.pollOptions,
          [type]: [...form.pollOptions[type], option]
        }
      });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    
    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      subcategory: form.subcategory,
      tags: form.tags,
      invitees: form.invitees,
      mode: form.mode,
      maxParticipants: form.maxParticipants
    };

    if (form.mode === "direct") {
      payload.date = form.date;
      payload.time = form.time;
      payload.location = form.location;
      payload.cost = form.cost;
    } else {
      payload.pollOptions = form.pollOptions;
      payload.status = "proposal";
    }

    try {
      const res = await fetchWithAuth("http://localhost:3000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      
      if (res.ok) {
        alert(form.mode === "direct" ? "Evento creado" : "Propuesta de evento publicada");
        navigate("/");
      } else {
        alert(data.error || "Error al crear evento");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear evento");
    }
  };

  const styles = {
    wrapper: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "40px",
      padding: "40px",
      minHeight: "100vh",
      backgroundColor: "#fafafa"
    },
    leftPanel: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingTop: "60px"
    },
    rightPanel: {
      maxWidth: "500px"
    },
    stepHeader: {
      marginBottom: "30px"
    },
    section: { marginBottom: "20px" },
    categoryGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
    btn: { padding: "10px 20px", margin: "5px", cursor: "pointer", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "#fff" },
    btnActive: { padding: "10px 20px", margin: "5px", cursor: "pointer", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px" },
    input: { width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" },
    list: { listStyle: "none", padding: 0 },
    listItem: { padding: "8px", backgroundColor: "#f0f0f0", marginBottom: "5px", borderRadius: "4px", display: "flex", justifyContent: "space-between" },
    selectedTags: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px", minHeight: "40px" },
    tag: { padding: "6px 12px", backgroundColor: "#007bff", color: "white", borderRadius: "20px", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" },
    tagClose: { cursor: "pointer", fontWeight: "bold" },
    navigationButtons: { display: "flex", gap: "10px", marginTop: "20px", justifyContent: "space-between" }
  };

  const goBack = () => {
    if (step === "subcategory") setStep("category");
    else if (step === "mandatory") setStep("category");
    else if (step === "mode") setStep("mandatory");
    else if (step === "details" || step === "voting") setStep("mode");
  };

  return (
    <div style={styles.wrapper}>
      {/* LEFT PANEL: Post-it Preview */}
      <div style={styles.leftPanel}>
        <EventPostItPreview form={form} />
      </div>

      {/* RIGHT PANEL: Step-based Form */}
      <div style={styles.rightPanel}>
        <div style={styles.stepHeader}>
          <h1>Crear Evento</h1>
          <p style={{ color: "#666", fontSize: "14px" }}>Completa los detalles paso a paso</p>
        </div>

        {/* PASO 1: Categoría */}
        {step === "category" && (
          <div style={styles.section}>
            <h3>Selecciona una Categoría o describe tu evento</h3>
            <input
              style={styles.input}
              placeholder="Ej: 'partido de fútbol', 'clase de yoga'..."
              value={titleInput}
              onChange={handleTitleChange}
              autoFocus
            />
            {form.category && (
              <div style={styles.selectedTags}>
                <div style={styles.tag}>
                  {form.category}
                  <span style={styles.tagClose} onClick={removeCategory}>✕</span>
                </div>
              </div>
            )}
            <h4>O elige de estas categorías:</h4>
            <div style={styles.categoryGrid}>
              {Object.entries(CATEGORIES_DATA).map(([key, data]) => (
                <button
                  key={key}
                  style={{
                    ...styles.btnActive,
                    backgroundColor: form.category === data.label ? "#0056b3" : "#007bff"
                  }}
                  onClick={() => handleCategorySelect(data.label)}
                >
                  {data.label}
                </button>
              ))}
            </div>
            {form.category && (
              <button style={styles.btnActive} onClick={() => setStep("mandatory")} type="button">
                Siguiente →
              </button>
            )}
          </div>
        )}

        {/* PASO 2: Subcategoría */}
        {step === "subcategory" && (
          <div style={styles.section}>
            <h3>Selecciona tipo de {form.category}</h3>
            <div style={styles.categoryGrid}>
              {CATEGORIES_DATA[getCategoryKeyByLabel(form.category)]?.subcategories.map(subcat => (
                <button
                  key={subcat}
                  style={styles.btnActive}
                  onClick={() => handleSubcategorySelect(subcat)}
                >
                  {subcat}
                </button>
              ))}
            </div>
            <div style={styles.navigationButtons}>
              <button style={styles.btn} onClick={goBack}>← Atrás</button>
            </div>
          </div>
        )}

        {/* PASO 3: Campos Obligatorios */}
        {step === "mandatory" && (
          <div style={styles.section}>
            <h3>Información del Evento</h3>
            <input
              style={styles.input}
              placeholder="Nombre del Evento"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              required
            />
            <textarea
              style={styles.input}
              placeholder="Descripción"
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              rows="4"
              required
            />

            <h4>Tags ({form.subcategory})</h4>
            <div style={styles.selectedTags}>
              {form.tags.map((tag, i) => (
                <div key={i} style={styles.tag}>
                  {tag}
                  <span style={styles.tagClose} onClick={() => handleRemoveTag(i)}>✕</span>
                </div>
              ))}
            </div>

            {getSuggestedTagsBySubcategory(form.subcategory).length > 0 && (
              <div style={{marginBottom: "10px"}}>
                <p style={{fontSize: "12px", color: "#666", marginBottom: "8px"}}>Sugerencias:</p>
                <div style={{display: "flex", flexWrap: "wrap", gap: "6px"}}>
                  {getSuggestedTagsBySubcategory(form.subcategory).map((tag, i) => (
                    <button
                      key={i}
                      style={{...styles.btn, padding: "4px 10px", fontSize: "12px"}}
                      onClick={() => handleAddTag(tag)}
                      type="button"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{display: "flex", gap: "5px", marginBottom: "10px"}}>
              <input
                style={{...styles.input, marginBottom: 0, flex: 1}}
                placeholder="Agregar tag personalizado..."
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddCustomTag()}
              />
              <button
                style={{...styles.btn, padding: "8px 15px"}}
                onClick={handleAddCustomTag}
                type="button"
              >
                Agregar
              </button>
            </div>

            {form.category === "Clases" && (
              <div style={{...styles.section, border: "1px solid #ddd", padding: "15px", borderRadius: "4px", marginBottom: "15px"}}>
                <h4>Modalidad de la Clase</h4>
                <div style={{display: "flex", gap: "10px", marginBottom: "10px"}}>
                  <button
                    style={{
                      ...styles.btn,
                      backgroundColor: form.clasesModality === "gratis" ? "#28a745" : "#fff",
                      color: form.clasesModality === "gratis" ? "white" : "#000"
                    }}
                    onClick={() => setForm({...form, clasesModality: "gratis", clasesCost: 0})}
                    type="button"
                  >
                    Gratis
                  </button>
                  <button
                    style={{
                      ...styles.btn,
                      backgroundColor: form.clasesModality === "pagada" ? "#28a745" : "#fff",
                      color: form.clasesModality === "pagada" ? "white" : "#000"
                    }}
                    onClick={() => setForm({...form, clasesModality: "pagada"})}
                    type="button"
                  >
                    Pagada
                  </button>
                </div>
                {form.clasesModality === "pagada" && (
                  <input
                    style={styles.input}
                    type="number"
                    placeholder="¿Cuánto cuesta?"
                    value={form.clasesCost}
                    onChange={e => setForm({...form, clasesCost: e.target.value})}
                    min="0"
                  />
                )}
              </div>
            )}

            <input
              style={styles.input}
              type="number"
              placeholder="Máximo de participantes"
              value={form.maxParticipants}
              onChange={e => setForm({...form, maxParticipants: e.target.value})}
              required
            />
            <div style={styles.navigationButtons}>
              <button style={styles.btn} onClick={goBack}>← Atrás</button>
              <button style={styles.btnActive} onClick={() => setStep("mode")}>Siguiente →</button>
            </div>
          </div>
        )}

        {/* PASO 4: Modo */}
        {step === "mode" && (
          <div style={styles.section}>
            <h3>¿Cómo definir la logística?</h3>
            <button
              style={{...styles.btnActive, width: "100%", marginBottom: "10px"}}
              onClick={() => handleModeSelect("direct")}
            >
              📅 Host Define Todo (Ahora)
            </button>
            <button
              style={{...styles.btnActive, width: "100%"}}
              onClick={() => handleModeSelect("voting")}
            >
              🗳️ Votación / Posterior
            </button>
            <div style={styles.navigationButtons}>
              <button style={styles.btn} onClick={goBack}>← Atrás</button>
            </div>
          </div>
        )}

        {/* PASO 5: Detalles */}
        {step === "details" && form.mode === "direct" && (
          <form onSubmit={submit}>
            <h3>Completa los Detalles del Evento</h3>
            
            <div style={{marginBottom: "15px"}}>
              <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
                📅 Fecha (dd/mm/yyyy)
              </label>
              <input
                style={styles.input}
                type="text"
                placeholder="dd/mm/yyyy"
                value={form.date}
                onChange={e => {
                  const value = e.target.value;
                  // Solo permitir números y /
                  const formatted = value.replace(/[^\d/]/g, '');
                  // Auto-formatear: dd/mm/yyyy
                  let result = formatted;
                  if (formatted.length === 2 && !formatted.includes('/')) {
                    result = formatted + '/';
                  } else if (formatted.length === 5 && (formatted.match(/\//g) || []).length === 1) {
                    result = formatted + '/';
                  }
                  setForm({...form, date: result});
                }}
                maxLength="10"
                required
              />
            </div>

            <div style={{marginBottom: "15px"}}>
              <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
                🕐 Hora (24h)
              </label>
              <input
                style={styles.input}
                type="time"
                value={form.time}
                onChange={e => setForm({...form, time: e.target.value})}
                required
              />
            </div>

            <div style={{marginBottom: "15px"}}>
              <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
                📍 Lugar
              </label>
              <input
                style={styles.input}
                placeholder="Lugar"
                value={form.location}
                onChange={e => setForm({...form, location: e.target.value})}
                required
              />
            </div>

            <div style={{marginBottom: "15px"}}>
              <label style={{display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px"}}>
                💵 Valor Cancha (opcional)
              </label>
              <input
                style={styles.input}
                type="number"
                placeholder="Valor"
                value={form.cost}
                onChange={e => setForm({...form, cost: e.target.value})}
              />
            </div>

            <div style={styles.navigationButtons}>
              <button style={styles.btn} onClick={goBack} type="button">← Atrás</button>
              <button style={styles.btnActive} type="submit">Crear Evento ✓</button>
            </div>
          </form>
        )}

        {/* PASO 5: Votación */}
        {step === "voting" && form.mode === "voting" && (
          <form onSubmit={submit}>
            <h3>Crea Opciones para Votación</h3>
            <div style={styles.section}>
              <h4>Opciones de Fecha</h4>
              <input
                style={{...styles.input, marginBottom: "5px"}}
                type="datetime-local"
                id="dateOption"
              />
              <button
                style={styles.btn}
                type="button"
                onClick={() => {
                  const input = document.getElementById("dateOption");
                  if (input.value) {
                    handleAddPollOption("dates", input.value);
                    input.value = "";
                  }
                }}
              >
                Agregar Fecha
              </button>
              <ul style={styles.list}>
                {form.pollOptions.dates.map((date, i) => (
                  <li key={i} style={styles.listItem}>{date}</li>
                ))}
              </ul>
            </div>

            <div style={styles.section}>
              <h4>Opciones de Lugar</h4>
              <input
                style={{...styles.input, marginBottom: "5px"}}
                placeholder="Lugar"
                id="locationOption"
              />
              <button
                style={styles.btn}
                type="button"
                onClick={() => {
                  const input = document.getElementById("locationOption");
                  if (input.value) {
                    handleAddPollOption("locations", input.value);
                    input.value = "";
                  }
                }}
              >
                Agregar Lugar
              </button>
              <ul style={styles.list}>
                {form.pollOptions.locations.map((loc, i) => (
                  <li key={i} style={styles.listItem}>{loc}</li>
                ))}
              </ul>
            </div>

            <div style={styles.navigationButtons}>
              <button style={styles.btn} onClick={goBack} type="button">← Atrás</button>
              <button style={styles.btnActive} type="submit">Publicar Propuesta ✓</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}