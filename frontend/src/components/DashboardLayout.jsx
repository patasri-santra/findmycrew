import Navbar from "./Navbar";
import "../styles/Dashboard.css";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <main className="dashboard-content">{children}</main>
    </div>
  );
}

export default DashboardLayout;