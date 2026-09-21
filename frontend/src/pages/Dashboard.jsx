import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { getAllProjects } from "../services/api";
import "../styles/BrowseProjects.css";

function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await getAllProjects(token);
      if (data.projects) setProjects(data.projects);
    };
    loadProjects();
  }, []);

  return (
    <DashboardLayout>
      <div className="browse-page">
        <h1>Open Projects</h1>
        <p className="subtitle">Find your next crew to join.</p>
        {projects.length === 0 && <p className="empty-text">No open projects right now — check back soon.</p>}
        {projects.map((project) => (
          <div key={project._id} className="project-card" onClick={() => navigate(`/dashboard/projects/${project._id}`)}>
            <div className="project-card-top">
              <span className="project-title">{project.title}</span>
              <span className="project-payment">{project.paymentOffer}</span>
            </div>
            <p className="project-desc">{project.description}</p>
            <div className="project-skills">
              {project.skillsRequired.map((skill) => <span key={skill} className="skill-tag">{skill}</span>)}
            </div>
            <p className="project-posted-by">Posted by {project.postedBy.name}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;