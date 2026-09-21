import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { deleteAccount } from "../services/api";
import "../styles/ManageAccount.css";

function ManageAccount() {
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const data = await deleteAccount(token);
    if (data.message === "Account deleted successfully") {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <DashboardLayout>
      <div className="manage-page">
        <h1>Manage My Account</h1>
        <p className="subtitle">Deleting your account is permanent. Your projects and reviews stay on record, but you're gone for good.</p>
        {!confirming ? (
          <button className="danger-btn" onClick={() => setConfirming(true)}>Delete My Account</button>
        ) : (
          <div className="confirm-box">
            <p>Are you sure? This can't be undone.</p>
            <button className="danger-btn" onClick={handleDelete}>Yes, delete it</button>
            <button className="cancel-btn" onClick={() => setConfirming(false)}>Cancel</button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ManageAccount;