import axios from "axios";

let clerkUserIdGlobal = "";

export const setClerkUserId = (id) => {
  clerkUserIdGlobal = id;
};

const API = axios.create({
  baseURL: "https://attendance-backend-x6cn.onrender.com",
});

API.interceptors.request.use((config) => {
  if (clerkUserIdGlobal) {
    config.headers.clerkUserId = clerkUserIdGlobal;
  }
  return config;
});

export default API;