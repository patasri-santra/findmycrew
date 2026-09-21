import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { getUserProfile } from "../services/api";
import "../styles/UserProfile.css";
import "../styles/PastHistory.css";

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token || !id) return;
      const data = await getUserProfile(token, id);
      if (data.user) {
        setUser(data.user);
        setReviews(data.reviews || []);
      }
    };
    loadProfile();
  }, [id]);

  if (!user) {
    return <DashboardLayout><p>Loading profile...</p></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="user-profile-page">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        <h1>{user.name}</h1>
        <p className="user-type">{user.freelancerType}</p>

        <h2 className="reviews-heading">Reviews</h2>
        {reviews.length === 0 && <p className="empty-text">No reviews yet.</p>}
        {reviews.map((review) => (
          <div key={review._id} className="history-card">
            <div className="history-card-top">
              <span className="history-name">{review.reviewer.name}</span>
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

export default UserProfile;