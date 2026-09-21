import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div className="nav-logo">
          <span className="logo-mark">F</span>
          <span className="logo-word">FindMyCrew</span>
        </div>
        <div className="nav-actions">
          <button className="nav-link-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="nav-cta-btn" onClick={() => navigate("/register")}>Register</button>
        </div>
      </header>

      <div className="gradient-blob blob-1" />
      <div className="gradient-blob blob-2" />

      <main className="landing-hero">
        <h1>Let's work<br />together</h1>
        <p className="hero-subtext">
          Verified freelancers only. No flakes, no group-chat chaos.
        </p>
        <button className="cta-btn" onClick={() => navigate("/login")}>Find Crew</button>
      </main>

      <section className="about-section">
        <div className="about-col">
          <h2>Why FindMyCrew</h2>
          <div className="underline" />
          <p>
            You're a freelancer. You landed a project too big to handle solo.
            Panic is optional. FindMyCrew isn't.
          </p>
        </div>
        <div className="about-col">
          <h2>How it works</h2>
          <div className="underline" />
          <p>
            Post your project with a real payment offer, get emails from
            verified candidates, hire who fits, and build a reputation
            that follows you across every job.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Landing;