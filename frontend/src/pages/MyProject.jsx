import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { getMyProjects, closeProjectWithHire, createReview } from "../services/api";
import "../styles/MyProject.css";

function MyProject() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [hiringId, setHiringId] = useState(null);
  const [hireEmail, setHireEmail] = useState("");
  const [reviewingId, setReviewingId] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const [error, setError] = useState("");

  const loadProjects = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const data = await getMyProjects(token);
    if (data.projects) setProjects(data.projects);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleHire = async (projectId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const data = await closeProjectWithHire(token, projectId, hireEmail);

    if (data.project) {
      setHiringId(null);
      setHireEmail("");
      setError("");
      loadProjects();
    } else {
      setError(data.message || "Something went wrong");
    }
  };

  const handleReviewSubmit = async (project) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const data = await createReview(token, {
      projectId: project._id,
      revieweeId: project.hiredUser._id,
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
        <h1>My Project</h1>
        <p className="subtitle">Everything you've posted, open or closed.</p>

        {projects.length === 0 && <p className="empty-text">You haven't posted anything yet.</p>}

        {projects.map((project) => (
          <div key={project._id} className="work-card">
            <div className="work-card-top">
              <span className="work-title">{project.title}</span>
              <span className={`status-badge ${project.status}`}>{project.status}</span>
            </div>
            <p className="work-payment">{project.paymentOffer}</p>

            {project.status === "closed" && project.hiredUser ? (
              <div>
                <p className="hired-text">
                  Hired:{" "}
                  <span
                    className="hired-link"
                    onClick={() => navigate(`/dashboard/users/${project.hiredUser._id}`)}
                  >
                    {project.hiredUser.name}
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
                      placeholder="How was working with them?"
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
                    Leave a Review (optional)
                  </button>
                )}
              </div>
            ) : (
              <>
                {hiringId === project._id ? (
                  <div className="hire-form">
                    <input
                      type="email"
                      placeholder="Hired person's registered email"
                      value={hireEmail}
                      onChange={(e) => setHireEmail(e.target.value)}
                    />
                    {error && <p className="error-text">{error}</p>}
                    <button className="confirm-hire-btn" onClick={() => handleHire(project._id)}>
                      Confirm Hire & Close
                    </button>
                    <button className="cancel-btn" onClick={() => setHiringId(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="hire-btn" onClick={() => setHiringId(project._id)}>
                    Hire & Close
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default MyProject;