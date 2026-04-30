import API from "./axios";

export const createSession = (data) => {
  return API.post("/sessions", data);
};

export const getStudentSessions = () => {
  return API.get("/sessions/student");
};

export const getTrainerSessions = () => {
  return API.get("/sessions/trainer");
};