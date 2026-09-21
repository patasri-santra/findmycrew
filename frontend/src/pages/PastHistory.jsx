import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getReviewsIWrote } from "../services/api";
import "../styles/PastHistory.css";

function PastHistory() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await getReviewsIWrote(token);
      if (data.reviews) setReviews(data.reviews);
    };
    loadHistory();
  }, []);

  return (
    <DashboardLayout>
      <div className="history-page">
        <h1>Past History</h1>
        <p className="subtitle">People you've worked with and reviewed.</p>
        {reviews.length === 0 && <p className="empty-text">No history yet — go close a project first.</p>}
        {reviews.map((review) => (
          <div key={review._id} className="history-card">
            <div className="history-card-top">
              <span className="history-name">{review.reviewee.name}</span>
              <span className="history-rating">{review.rating} / 5</span>
            </div>
            <p className="history-project">Project: {review.project.title}</p>
            <p className="history-comment">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default PastHistory;