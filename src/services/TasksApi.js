import axios from 'axios';

export const taskApi = axios.create({
  baseURL: process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080',
});

/**
 * Create task
 *
 * @param {object} task A Task
 * @returns {Promise} Request promise
 */
const createTask = (task) => {
  const body = {
    copy_from: task.template === 'uuid' ? '' : task.template,
    name: task.name,
    description: task.description,
  };
  return taskApi.post('/tasks', body);
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
 * @returns {Promise} Request promise
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
 * @param {string} email Email
 * @returns {Promise} Request promise
 */
const sendTaskViaEmail = (uuid, email) => {
  // TODO: This endpoint doesn't exist. Change it with the correct one
  return taskApi.put(`/tasks/${uuid}/mail`, { email });
};

export default {
  createTask,
  deleteTask,
  getAllTasks,
  getPaginatedTasks,
  updateTask,
  getTaskData,
  sendTaskViaEmail,
};
