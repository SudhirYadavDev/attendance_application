import axios from "axios";

let clerkUserIdGlobal = "";

export const setClerkUserId = (id) => {
  clerkUserIdGlobal = id;
};

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use((config) => {
  if (clerkUserIdGlobal) {
    config.headers.clerkUserId = clerkUserIdGlobal;
  }
  return config;
});

export default API;