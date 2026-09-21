import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PastHistory from "./pages/PastHistory";
import ManageAccount from "./pages/ManageAccount";
import PostProject from "./pages/PostProject";
import ProjectDetails from "./pages/ProjectDetails";
import UserProfile from "./pages/UserProfile";
import MyProject from "./pages/MyProject";
import WorkedOn from "./pages/WorkedOn";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard/history" element={<ProtectedRoute><PastHistory /></ProtectedRoute>} />
          <Route path="/dashboard/manage" element={<ProtectedRoute><ManageAccount /></ProtectedRoute>} />
          <Route path="/dashboard/post-project" element={<ProtectedRoute><PostProject /></ProtectedRoute>} />
          <Route path="/dashboard/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
          <Route path="/dashboard/users/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/dashboard/my-project" element={<ProtectedRoute><MyProject /></ProtectedRoute>} />
          <Route path="/dashboard/worked-on" element={<ProtectedRoute><WorkedOn /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;