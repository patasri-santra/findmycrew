import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { getProjectsIWorkedOn, createReview } from "../services/api";
import "../styles/MyProject.css";

function WorkedOn() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [reviewingId, setReviewingId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await getProjectsIWorkedOn(token);
      if (data.projects) setProjects(data.projects);
    };
    loadProjects();
  }, []);

  const handleReviewSubmit = async (project) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const data = await createReview(token, {
      projectId: project._id,
      revieweeId: project.postedBy._id,
      rating: Number(rating),
      comment,
    });

    if (data.review) {
      setReviewingId(null);
      setComment("");
      setRating(5);
      setReviewMessage("Review submitted!");
    } else {
      setReviewMessage(data.message || "Something went wrong");
    }
  };

  return (
    <DashboardLayout>
      <div className="my-work-page">
        <h1>Projects I Worked On</h1>
        <p className="subtitle">Jobs where someone hired you.</p>

        {projects.length === 0 && (
          <p className="empty-text">Nobody's hired you yet — go find some work.</p>
        )}

        {projects.map((project) => (
          <div key={project._id} className="work-card">
            <div className="work-card-top">
              <span className="work-title">{project.title}</span>
              <span className={`status-badge ${project.status}`}>{project.status}</span>
            </div>
            <p className="work-payment">{project.paymentOffer}</p>

            <p className="hired-text">
              Hired by:{" "}
              <span
                className="hired-link"
                onClick={() => navigate(`/dashboard/users/${project.postedBy._id}`)}
              >
                {project.postedBy.name}
              </span>
            </p>

            {reviewingId === project._id ? (
              <div className="review-form">
                <label>Rating</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Okay</option>
                  <option value="2">2 - Below Average</option>
                  <option value="1">1 - Poor</option>
                </select>
                <textarea
                  placeholder="How was working with this hirer?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                {reviewMessage && <p className="error-text">{reviewMessage}</p>}
                <button className="confirm-hire-btn" onClick={() => handleReviewSubmit(project)}>
                  Submit Review
                </button>
                <button className="cancel-btn" onClick={() => setReviewingId(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="review-btn" onClick={() => setReviewingId(project._id)}>
                Review My Hirer (optional)
              </button>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default WorkedOn;