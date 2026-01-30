import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.error) return alert(data.error);
    login(data);
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Iniciar Sesión</h2>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <button onClick={submit}>Login</button>
      <p><a href="/register">¿No tienes cuenta? Regístrate</a></p>
    </div>
  );
}
