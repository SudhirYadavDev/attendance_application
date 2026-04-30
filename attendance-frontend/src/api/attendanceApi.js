import API from "./axios";

export const markAttendance = (sessionId, status) => {
  return API.post(
    `/attendance/mark?sessionId=${sessionId}&status=${status}`
  );
};

export const getSessionAttendance = (sessionId) => {
  return API.get(`/attendance/session/${sessionId}`);
};

export const getSessionAttendanceForTrainer = (sessionId) => {
  return API.get(`/attendance/sessions/${sessionId}/attendance`);
};

export const getMyAttendance = () => {
  return API.get("/attendance/my");
};