import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const navLinks = [
  { label: "Gigs", path: "/dashboard" },
  { label: "My Projects", path: "/dashboard/my-project" },
  { label: "Worked On", path: "/dashboard/worked-on" },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
        <span className="logo-mark">F</span>
        <span className="logo-word">FindMyCrew</span>
      </div>

      <nav className="navbar-links">
        {navLinks.map((link) => (
          <button
            key={link.path}
            className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="navbar-right">
        <button className="post-project-btn" onClick={() => navigate("/dashboard/post-project")}>
          + Post a Project
        </button>

        <div className="avatar-menu">
          <button className="avatar-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
          </button>

          {menuOpen && (
            <div className="avatar-dropdown" onClick={() => setMenuOpen(false)}>
              <button onClick={() => navigate("/dashboard/profile")}>Profile</button>
              <button onClick={() => navigate("/dashboard/history")}>Past History</button>
              <button onClick={() => navigate("/dashboard/manage")}>Manage Account</button>
              <button className="logout-item" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;