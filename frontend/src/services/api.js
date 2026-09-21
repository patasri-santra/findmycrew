const API_URL = "http://localhost:5000/api";

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const registerUser = async (name, email, password, freelancerType) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, freelancerType }),
  });
  return res.json();
};

export const getMe = async (token) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const updateProfile = async (token, data) => {
  const res = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteAccount = async (token) => {
  const res = await fetch(`${API_URL}/profile`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getReviewsIWrote = async (token) => {
  const res = await fetch(`${API_URL}/reviews/written-by-me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getReviewsAboutMe = async (token) => {
  const res = await fetch(`${API_URL}/reviews/about-me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createProject = async (token, data) => {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getAllProjects = async (token) => {
  const res = await fetch(`${API_URL}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getProjectById = async (token, id) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const closeProject = async (token, id) => {
  const res = await fetch(`${API_URL}/projects/${id}/close`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getUserProfile = async (token, id) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getMyProjects = async (token) => {
  const res = await fetch(`${API_URL}/projects/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const closeProjectWithHire = async (token, id, hiredEmail) => {
  const res = await fetch(`${API_URL}/projects/${id}/close`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ hiredEmail }),
  });
  return res.json();
};


export const createReview = async (token, data) => {
  const res = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getProjectsIWorkedOn = async (token) => {
  const res = await fetch(`${API_URL}/projects/worked-on`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};