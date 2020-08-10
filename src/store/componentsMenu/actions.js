// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import tasksApi from '../../services/TasksApi';
import templatesApi from '../../services/TemplatesApi';

// UI ACTIONS
import {
  componentsMenuLoadingData,
  componentsMenuDataLoaded,
} from '../ui/actions';

// UTILS
import utils from '../../utils';

// ACTIONS
// ** FETCH COMPONENTS MENU
/**
 * fetch components menu success action
 * @param {Object} componentsMenu
 * @returns {Object} { type, componentsMenu }
 */
const fetchComponentsMenuSuccess = (componentsMenu) => (dispatch) => {
  // dispatching components menu data loaded action
  dispatch(componentsMenuDataLoaded());

  // dispatching fetch components menu success
  dispatch({
    type: actionTypes.FETCH_COMPONENTS_MENU_SUCCESS,
    componentsMenu,
  });
};

/**
 * fetch components menu fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchComponentsMenuFail = (error) => (dispatch) => {
  // getting error message
  const errorMessage = error.message;

  // dispatching components menu data loaded action
  dispatch(componentsMenuDataLoaded());

  // dispatching fetch components menu fail action
  dispatch({
    type: actionTypes.FETCH_COMPONENTS_MENU_FAIL,
    errorMessage,
  });
};

/**
 * fetch components menu request action
 * @returns {Function}
 */
export const fetchComponentsMenuRequest = () => async (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_COMPONENTS_MENU_REQUEST,
  });

  // dispatching components menu loading data action
  dispatch(componentsMenuLoadingData());

  try {
    // getting templates
    const templatesResponse = await templatesApi.listTemplates();
    // getting components
    const componentsResponse = await tasksApi.getAllTasks();

    // creating components menu
    let componentsMenu = {};

    // adding templates to menu
    if (templatesResponse.data && templatesResponse.data.length > 0)
      componentsMenu.TEMPLATES = templatesResponse.data;

    // adding components to menu
    componentsMenu = {
      ...componentsMenu,
      ...utils.createMenu(componentsResponse.data.tasks),
    };

    dispatch(fetchComponentsMenuSuccess(componentsMenu));
  } catch (e) {
    dispatch(fetchComponentsMenuFail(e));
  }
};

// // // // // // // // // //

// ** FILTER COMPONENTS MENU
/**
 * filter experiment components menu action
 * @param {string} filter
 * @returns {type, filter}
 */
export const filterComponentsMenu = (filter) => ({
  type: actionTypes.FILTER_COMPONENTS_MENU,
  filter,
});

// // // // // // // // // //
