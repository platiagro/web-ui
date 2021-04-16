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
 * @returns {Promise}
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
 * @param {string} id
 * @returns {Promise}
 */
const deleteTask = (id) => {
  return taskApi.delete(`${taskPath}/${id}`);
};

/**
 * Get all tasks
 *
 * @param filters
 * @returns {Promise}
 */
const getAllTasks = (filters) => {
  const tags = filters?.tags || [];
  const queryParams = tags.length ? `?tags=${tags.join(',')}` : '';
  return taskApi.get(`${taskPath}${queryParams}`);
};

/**
 * Get paginated tasks
 *
 * @param {number} page
 * @param {number} pageSize
 * @returns {Promise}
 */
const getPaginatedTasks = (page, pageSize) => {
  return taskApi.get(`${taskPath}?page=${page}&page_size=${pageSize}`);
};

/**
 * Update task
 *
 * @param {string} uuid
 * @param {object} task
 * @returns {Promise}
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
