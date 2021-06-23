// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import tasksApi from 'services/TasksApi';
import templatesApi from 'services/TemplatesApi';

// UI ACTIONS
import { fetchTasksSuccess } from 'store/tasks/tasks.actions';

// UTILS
import utils from 'utils';
import { addLoading, removeLoading } from 'store/loading';

// ACTIONS
// ** FETCH TASKS MENU
/**
 * fetch tasks menu success action
 *
 * @param {object} tasksMenu Task menu
 * @returns {object} { type, tasksMenu }
 */
const fetchTasksMenuSuccess = (tasksMenu) => (dispatch) => {
  // dispatching fetch tasks menu success
  dispatch({
    type: actionTypes.FETCH_TASKS_MENU_SUCCESS,
    tasksMenu,
  });
};

/**
 * fetch tasks menu fail action
 *
 * @param {object} error Error
 * @returns {object} { type, errorMessage }
 */
const fetchTasksMenuFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching fetch tasks menu fail action
  dispatch({
    type: actionTypes.FETCH_TASKS_MENU_FAIL,
    errorMessage,
  });

  message.error(errorMessage);
};

/**
 * fetch tasks menu request action
 *
 * @returns {Function} Dispatch function
 */
export const fetchTasksMenuRequest = () => async (dispatch) => {
  try {
    // dispatching request action
    dispatch({
      type: actionTypes.FETCH_TASKS_MENU_REQUEST,
    });

    // dispatching tasks menu loading data action
    dispatch(addLoading(actionTypes.FETCH_TASKS_MENU_REQUEST));

    // getting templates
    const templatesResponse = await templatesApi.listTemplates();

    /**
     * Atualmente os menus não funcionam corretamente sem dados na store de
     * tasks, por isso estamos dando um dispatch para preencher a store
     */
    // getting tasks
    const tasksResponse = await tasksApi.getAllTasks();
    const { tasks } = tasksResponse.data;
    dispatch(fetchTasksSuccess(tasks));

    // creating tasks menu
    let tasksMenu = {};

    // adding templates to menu
    if (
      templatesResponse.data.templates &&
      templatesResponse.data.templates.length > 0
    )
      tasksMenu.TEMPLATES = templatesResponse.data.templates;

    // adding tasks to menu
    tasksMenu = {
      ...tasksMenu,
      ...utils.createMenu(tasksResponse.data.tasks),
    };

    dispatch(fetchTasksMenuSuccess(tasksMenu));
  } catch (e) {
    dispatch(fetchTasksMenuFail(e));
  } finally {
    dispatch(removeLoading(actionTypes.FETCH_TASKS_MENU_REQUEST));
  }
};

// // // // // // // // // //

// ** FILTER TASKS MENU
/**
 * filter experiment tasks menu action
 *
 * @param {string} filter Filter
 * @returns {object} Action
 */
export const filterTasksMenu = (filter) => ({
  type: actionTypes.FILTER_TASKS_MENU,
  filter,
});

// // // // // // // // // //
