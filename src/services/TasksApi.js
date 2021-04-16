// CORE LIBS
import axios from 'axios';

export const URL =
  process.env.REACT_APP_PROJECTS_API || 'http://localhost:8080';

export const taskApi = axios.create({
  baseURL: URL,
});

const taskPath = '/tasks';

/**
 * Create task
 *
 * @param {object} task
 * @returns {Promise} The request promise
 */
const createTask = (task) => {
  const body = {
    copy_from: task.template === 'uuid' ? '' : task.template,
    name: task.name,
    description: task.description,
  };
  return taskApi.post(taskPath, body);
};

/**
 * Delete task
 *
 * @param {string} id Task id
 * @returns {Promise} The request promise
 */
const deleteTask = (id) => {
  return taskApi.delete(`${taskPath}/${id}`);
};

/**
 * Get all tasks
 *
 * @param filters Filters object
 * @returns {Promise} The request promise
 */
const getAllTasks = (filters) => {
  const tags = filters?.tags || [];
  const queryParams = tags.length ? `?tags=${tags.join(',')}` : '';
  return taskApi.get(`${taskPath}${queryParams}`);
};

/**
 * Get paginated tasks
 *
 * @param {number} page Page number
 * @param {number} pageSize Page size
 * @returns {Promise} The request promise
 */
const getPaginatedTasks = (page, pageSize) => {
  return taskApi.get(`${taskPath}?page=${page}&page_size=${pageSize}`);
};

/**
 * Update task
 *
 * @param {string} uuid Task id
 * @param {object} task The task
 * @returns {Promise} The request promise
 */
const updateTask = (uuid, task) => {
  const body = {
    name: task.name,
    description: task.description,
  };
  return taskApi.patch(`${taskPath}/${uuid}`, body);
};

// EXPORT DEFAULT
export default {
  createTask,
  deleteTask,
  getAllTasks,
  getPaginatedTasks,
  updateTask,
};
