import API from "./axios";

export const createUser = (data) => {
  return API.post("/users", data);
};

export const getUser = (clerkUserId) => {
  return API.get(`/users/${clerkUserId}`);
};