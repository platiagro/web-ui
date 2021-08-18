import axios from 'axios';

import { AuthExpiredInterceptor } from './interceptors';

const taskApi = axios.create({
  baseURL: process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080',
});

taskApi.interceptors.response.use(
  AuthExpiredInterceptor.Response.onFulfilled,
  AuthExpiredInterceptor.Response.onRejected
);

/**
 * Create task
 *
 * @param {object} task A Task
 * @returns {Promise} Request promise
 */
const createTask = (task) => {
  return taskApi.post('/tasks', task);
};

/**
 * Delete task
 *
 * @param {string} id Task id
 * @returns {Promise} Request promise
 */
const deleteTask = (id) => {
  return taskApi.delete(`/tasks/${id}`);
};

/**
 * Get all tasks
 *
 * @param {object} filters Filters object
 * @param {Array} filters.tags Tag array to filter
 * @returns {Promise} The request promise
 */
const getAllTasks = (filters) => {
  const tags = filters?.tags || [];
  const queryParams = tags.length ? `?tags=${tags.join(',')}` : '';
  return taskApi.get(`/tasks${queryParams}`);
};

/**
 * Get paginated tasks
 *
 * @param {number} page Page number
 * @param {number} pageSize Page size
 * @returns {Promise} Request promise
 */
const getPaginatedTasks = (page, pageSize) => {
  return taskApi.get(`/tasks?page=${page}&page_size=${pageSize}`);
};

/**
 * Update task (PATCH)
 *
 * @param {string} uuid Task id
 * @param {object} taskData Task data
 * @returns {Promise} Request promise
 */
const updateTask = (uuid, taskData) => {
  return taskApi.patch(`/tasks/${uuid}`, taskData);
};

/**
 * Get task data
 *
 * @param {string} uuid Task id
 * @returns {Promise} Request promise
 */
const getTaskData = (uuid) => {
  return taskApi.get(`/tasks/${uuid}`);
};

/**
 * Send task via email
 *
 * @param {string} uuid Task id
 * @param {string[]} emails Email
 * @returns {Promise} Request promise
 */
const sendTaskViaEmail = (uuid, emails) => {
  return taskApi.post(`/tasks/${uuid}/emails`, { emails });
};

export default {
  createTask,
  deleteTask,
  getAllTasks,
  getPaginatedTasks,
  updateTask,
  getTaskData,
  sendTaskViaEmail,
  axiosInstance: taskApi,
};
