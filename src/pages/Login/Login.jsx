import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

function Login() {
  const [docnum, setDocnum] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!docnum.trim() || !password.trim()) {
      setError("Por favor, completá usuario y contraseña");
      return;
    }

    try {
      const data = await login(docnum, password);
      if (!data || !data.token) {
        setError("Credenciales inválidas");
        return;
      }
      localStorage.setItem("docnum", data.user.docnum);
      localStorage.setItem("email", data.user.mail);
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Error desconocido");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Bienvenido</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label>
            Documento
            <input
              type="text"
              value={docnum}
              onChange={(e) => setDocnum(e.target.value)}
              placeholder="Tu documento"
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
            />
          </label>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
