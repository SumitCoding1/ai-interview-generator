import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const login = async ({ email, password }) => {
  const response = await API.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const register = async ({ username, email, password }) => {
  const response = await API.post("/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
};

export const logout = async () => {
  const response = await API.get("/auth/logout");
  return response.data;
};

export const getme = async () => {
  const response = await API.get("/auth/get-me");
  return response.data;
};