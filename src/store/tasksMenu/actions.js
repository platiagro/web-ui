// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import tasksApi from '../../services/TasksApi';
import templatesApi from '../../services/TemplatesApi';

// UI ACTIONS
import { tasksMenuLoadingData, tasksMenuDataLoaded } from '../ui/actions';

// UTILS
import utils from '../../utils';

// ACTIONS
// ** FETCH TASKS MENU
/**
 * fetch tasks menu success action
 * @param {Object} tasksMenu
 * @returns {Object} { type, tasksMenu }
 */
const fetchTasksMenuSuccess = (tasksMenu) => (dispatch) => {
  // dispatching tasks menu data loaded action
  dispatch(tasksMenuDataLoaded());

  // dispatching fetch tasks menu success
  dispatch({
    type: actionTypes.FETCH_TASKS_MENU_SUCCESS,
    tasksMenu,
  });
};

/**
 * fetch tasks menu fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchTasksMenuFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching tasks menu data loaded action
  dispatch(tasksMenuDataLoaded());

  // dispatching fetch tasks menu fail action
  dispatch({
    type: actionTypes.FETCH_TASKS_MENU_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

/**
 * fetch tasks menu request action
 * @returns {Function}
 */
export const fetchTasksMenuRequest = () => async (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_TASKS_MENU_REQUEST,
  });

  // dispatching tasks menu loading data action
  dispatch(tasksMenuLoadingData());

  try {
    // getting templates
    const templatesResponse = await templatesApi.listTemplates();
    // getting tasks
    const tasksResponse = await tasksApi.getAllTasks();

    // creating tasks menu
    let tasksMenu = {};

    // adding templates to menu
    if (templatesResponse.data && templatesResponse.data.length > 0)
      tasksMenu.TEMPLATES = templatesResponse.data;

    // adding tasks to menu
    tasksMenu = {
      ...tasksMenu,
      ...utils.createMenu(tasksResponse.data.tasks),
    };

    dispatch(fetchTasksMenuSuccess(tasksMenu));
  } catch (e) {
    dispatch(fetchTasksMenuFail(e));
  }
};

// // // // // // // // // //

// ** FILTER TASKS MENU
/**
 * filter experiment tasks menu action
 * @param {string} filter
 * @returns {type, filter}
 */
export const filterTasksMenu = (filter) => ({
  type: actionTypes.FILTER_TASKS_MENU,
  filter,
});

// // // // // // // // // //
