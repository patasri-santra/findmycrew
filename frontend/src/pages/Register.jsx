import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [freelancerType, setFreelancerType] = useState("full-time");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const data = await registerUser(name, email, password, freelancerType);
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="gradient-blob blob-1" />
      <div className="gradient-blob blob-2" />

      <div className="auth-card register-card">
        <div className="nav-logo">
          <span className="logo-mark">F</span>
          <span className="logo-word">FindMyCrew</span>
        </div>

        <h1>Create your account</h1>
        <p className="auth-subtext">Verified crews only. No flakes, no ghosting.</p>

        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div className="radio-group">
          {[
            { value: "full-time", label: "Full-time freelancer" },
            { value: "part-time", label: "Part-time freelancer" },
            { value: "not-freelancer", label: "Not a freelancer" },
          ].map((option) => (
            <label key={option.value} className={freelancerType === option.value ? "selected" : ""}>
              <input
                type="radio"
                name="freelancerType"
                value={option.value}
                checked={freelancerType === option.value}
                onChange={(e) => setFreelancerType(e.target.value)}
              />
              {option.label}
            </label>
          ))}
        </div>

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        {error && <p className="error-text">{error}</p>}

        <button className="auth-btn" onClick={handleRegister}>Register</button>

        <p className="auth-switch">Already a member? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default Register;