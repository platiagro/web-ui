// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import componentsApi from '../../services/ComponentsApi';
import templatesApi from '../../services/TemplatesApi';

// UTILS
import utils from '../../utils';

// ACTIONS
// ** FETCH COMPONENTS MENU
/**
 * fetch components menu success action
 * @param {Object} componentsMenu
 * @returns {Object} { type, componentsMenu }
 */
const fetchComponentsMenuSuccess = (componentsMenu) => {
  return {
    type: actionTypes.FETCH_COMPONENTS_MENU_SUCCESS,
    componentsMenu,
  };
};

/**
 * fetch components menu fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchComponentsMenuFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.FETCH_COMPONENTS_MENU_FAIL,
    errorMessage,
  };
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

  try {
    // getting templates
    const templatesResponse = await templatesApi.listTemplates();
    // getting components
    const componentsResponse = await componentsApi.listComponents();

    // creating components menu
    let componentsMenu = {};

    // adding templates to menu
    if (templatesResponse.data && templatesResponse.data.length > 0)
      componentsMenu.TEMPLATES = templatesResponse.data;

    // adding components to menu
    componentsMenu = {
      ...componentsMenu,
      ...utils.createMenu(componentsResponse.data),
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
