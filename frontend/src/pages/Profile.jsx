import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getMe, updateProfile, getReviewsAboutMe } from "../services/api";
import "../styles/Profile.css";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [freelancerType, setFreelancerType] = useState("full-time");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const data = await getMe(token);
      if (data.user) {
        setName(data.user.name);
        setEmail(data.user.email);
        setFreelancerType(data.user.freelancerType);
      }

      const reviewData = await getReviewsAboutMe(token);
      if (reviewData.reviews) setReviews(reviewData.reviews);
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const data = await updateProfile(token, { name, freelancerType });

    if (data.user) {
      setMessage("Profile updated!");
      setIsEditing(false);
    } else {
      setMessage(data.message || "Something went wrong");
    }
  };

  return (
    <DashboardLayout>
      <div className="profile-page">
        <h1>Your Profile</h1>

        <div className="profile-card">
          <div className="profile-field">
          <label>Name</label>
          {isEditing ? (
            <input value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <p>{name}</p>
          )}
        </div>

        <div className="profile-field">
          <label>Email</label>
          <p>{email}</p>
        </div>

        <div className="profile-field">
          <label>Freelancer Type</label>
          {isEditing ? (
            <select
              value={freelancerType}
              onChange={(e) => setFreelancerType(e.target.value)}
            >
              <option value="full-time">Full-time freelancer</option>
              <option value="part-time">Part-time freelancer</option>
              <option value="not-freelancer">Not a freelancer</option>
            </select>
          ) : (
            <p>{freelancerType}</p>
          )}
        </div>
        </div>
        

        {message && <p className="profile-message">{message}</p>}

        {isEditing ? (
          <button className="save-btn" onClick={handleSave}>Save</button>
        ) : (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}

        <div className="profile-reviews-section">
          <h2>My Review</h2>
          <p className="reviews-subtext">What others have said about working with you.</p>

          {reviews.length === 0 && (
            <p className="empty-text">No reviews yet — get out there and work with someone.</p>
          )}

          {reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-card-top">
                <span className="review-name">{review.reviewer.name}</span>
                <span className="review-rating">{review.rating} / 5</span>
              </div>
              <p className="review-project">Project: {review.project.title}</p>
              <p className="review-comment">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;