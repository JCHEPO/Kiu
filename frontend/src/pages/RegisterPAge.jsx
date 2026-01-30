import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.error) return alert(data.error);
    alert("Registrado exitosamente");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Registrarse</h2>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <input placeholder="Nombre" onChange={e=>setForm({...form,nombre:e.target.value})}/>
      <input placeholder="Apellido" onChange={e=>setForm({...form,apellido:e.target.value})}/>
      <button onClick={submit}>Registrar</button>
      <p><a href="/login">¿Ya tienes cuenta? Inicia sesión</a></p>
    </div>
  );
}
