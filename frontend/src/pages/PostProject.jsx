import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { createProject } from "../services/api";
import "../styles/PostProject.css";

function PostProject() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [paymentOffer, setPaymentOffer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const skillsArray = skills.split(",").map((s) => s.trim()).filter(Boolean);
    const data = await createProject(token, { title, description, skillsRequired: skillsArray, paymentOffer });
    if (data.project) {
      navigate("/dashboard");
    } else {
      setError(data.message || "Something went wrong");
    }
  };

  return (
    <DashboardLayout>
      <div className="post-project-page">
        <h1>Post a Project</h1>
        <p className="subtitle">Got a job too big to handle alone? Advertise it here.</p>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Description</label>
        <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        <label>Skills Required (comma separated)</label>
        <input placeholder="React, Node.js, MongoDB" value={skills} onChange={(e) => setSkills(e.target.value)} />
        <label>Payment Offer</label>
        <input placeholder="₹10,000 or 20% revenue share" value={paymentOffer} onChange={(e) => setPaymentOffer(e.target.value)} />
        {error && <p className="error-text">{error}</p>}
        <button className="submit-btn" onClick={handleSubmit}>Post Project</button>
      </div>
    </DashboardLayout>
  );
}

export default PostProject;