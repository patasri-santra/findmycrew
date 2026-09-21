import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchMe = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) return;

      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      const data = await res.json();

      if (data.user) {
        setUser(data.user);
        setToken(storedToken);
      } else {
        localStorage.removeItem("token");
      }
    };

    fetchMe();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() was called outside of <AuthProvider>. Wrap your app with <AuthProvider> first.");
  }
  return context;
}