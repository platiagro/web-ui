// CORE LIBS
import axios from 'axios';

// CONSTANTS
const URL = process.env.REACT_APP_PIPELINES_API || 'http://localhost:8080';
const monitoringsApi = axios.create({
  baseURL: `${URL}/projects/`,
});

const requestMonitorings = (projectId) => {
  return monitoringsApi.get(`${projectId}/monitorings`);
};

const postMonitorings = (projectId, body) => {
  return monitoringsApi.post(`${projectId}/monitorings`, body);
};

const putMonitorings = (projectId, monitoringId, body) => {
  return monitoringsApi.put(`${projectId}/monitorings/${monitoringId}`, body);
};

const deleteMonitorings = (projectId, monitoringId) => {
  return monitoringsApi.delete(`${projectId}/monitorings/${monitoringId}`);
};

// EXPORT DEFAULT
export default {
  requestMonitorings,
  deleteMonitorings,
  putMonitorings,
  postMonitorings,
};
