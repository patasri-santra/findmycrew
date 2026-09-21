import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { getProjectById, closeProject } from "../services/api";
import "../styles/ProjectDetails.css";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      const token = localStorage.getItem("token");
      if (!token || !id) return;
      const data = await getProjectById(token, id);
      if (data.project) setProject(data.project);
    };
    loadProject();
  }, [id]);

  const handleClose = async () => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;
    const data = await closeProject(token, id);
    if (data.project) setProject(data.project);
  };

  if (!project) {
    return <DashboardLayout><p>Loading project...</p></DashboardLayout>;
  }

  const mailtoLink = `mailto:${project.postedBy.email}?subject=Interested in "${project.title}" on FindMyCrew&body=Hi ${project.postedBy.name}, I'd like to work on your project.`;

  return (
    <DashboardLayout>
      <div className="details-page">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>← Back to projects</button>
        <div className="details-top">
          <h1>{project.title}</h1>
          <span className={`status-badge ${project.status}`}>{project.status}</span>
        </div>
        <p className="details-payment">{project.paymentOffer}</p>
        <p className="details-desc">{project.description}</p>
        <div className="details-skills">
          {project.skillsRequired.map((skill) => <span key={skill} className="skill-tag">{skill}</span>)}
        </div>
        <div className="details-poster">
          <p>Posted by <strong>{project.postedBy.name}</strong> ({project.postedBy.freelancerType})</p>
        </div>
        {project.status === "open" && (
          <div className="details-actions">
            <a href={mailtoLink} className="contact-btn">Contact via Email</a>
            {user?.id === project.postedBy._id && (
              <button className="close-project-btn" onClick={handleClose}>Mark as Closed</button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ProjectDetails;