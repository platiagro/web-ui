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
 * @param {Object} task
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
 * @param {String} id
 * @returns {Promise}
 */
const deleteTask = (id) => {
  return taskApi.delete(`${taskPath}/${id}`);
};

/**
 * Get all tasks
 * @returns {Promise}
 */
const getAllTasks = () => {
  return taskApi.get(taskPath);
};

/**
 * Get paginated tasks
 * @param {Number} page
 * @param {Number} pageSize
 * @returns {Promise}
 */
const getPaginatedTasks = (page, pageSize) => {
  return taskApi.get(`${taskPath}?page=${page}&page_size=${pageSize}`);
};

/**
 * Update task
 * @param {String} uuid
 * @param {Object} task
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
