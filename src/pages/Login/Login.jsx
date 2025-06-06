import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

function Login() {
  const [docnum, setDocnum] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!docnum.trim() || !password.trim()) {
      setError("Por favor, completá usuario y contraseña");
      setLoading(false);
      return;
    }

    try {
      const data = await login(docnum, password);
      if (!data || !data.token) {
        setError("Credenciales inválidas");
        setLoading(false);
        return;
      }
      localStorage.setItem("docnum", data.user.docnum);
      localStorage.setItem("email", data.user.mail);
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Error desconocido");
      setLoading(false);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Bienvenido</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {loading && <p style={{ color: "blue" }}>Cargando...</p>}
          <label>
            Documento
            <input
              type="text"
              value={docnum}
              onChange={(e) => setDocnum(e.target.value)}
              placeholder="Tu documento"
              disabled={loading}
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              disabled={loading}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
