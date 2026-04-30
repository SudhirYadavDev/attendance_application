import API from "./axios";

export const createBatch = (data) => {
  return API.post("/batches", data);
};

export const addTrainer = (batchId, trainerId) => {
  return API.put(`/batches/${batchId}/trainers/${trainerId}`);
};

export const addStudent = (batchId, studentId) => {
  return API.put(`/batches/${batchId}/students/${studentId}`);
};

export const getBatchSummary = (batchId) => {
  return API.get(`/batches/${batchId}/summary`);
};

export const getProgrammeSummary = () => {
  return API.get(`/batches/programme/summary`);
};

export const createInvite = (batchId) => {
  return API.post(`/batches/${batchId}/invite`, {});
};

export const joinBatch = (batchId, token) => {
  return API.post(`/batches/${batchId}/join?token=${token}`, {});
};

export const getInstitutionSummary = (institutionId) => {
  return API.get(`/batches/institutions/${institutionId}/summary`);
};