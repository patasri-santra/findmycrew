import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const data = await loginUser(email, password);
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="gradient-blob blob-1" />
      <div className="gradient-blob blob-2" />

      <div className="auth-card">
        <div className="nav-logo">
          <span className="logo-mark">F</span>
          <span className="logo-word">FindMyCrew</span>
        </div>

        <h1>Welcome back</h1>
        <p className="auth-subtext">Log in to keep finding your crew.</p>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="error-text">{error}</p>}

        <button className="auth-btn" onClick={handleLogin}>Login</button>

        <p className="auth-switch">Not a member? <a href="/register">Register now</a></p>
      </div>
    </div>
  );
}

export default Login;