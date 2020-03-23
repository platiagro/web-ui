// ACTION TYPES
import actionTypes from './actionTypes';

// ACTIONS
// ** SHOW_NEW_PROJECT_MODAL
/**
 * show new project modal
 * @returns {Object} { type, newProjectModalVisible }
 */
export const showNewProjectModal = () => {
  return {
    type: actionTypes.SHOW_NEW_PROJECT_MODAL,
    newProjectModalVisible: true,
  };
};

// // // // // // // // // //

// ** HIDE_NEW_PROJECT_MODAL
/**
 * hide new project modal
 * @returns {Object} { type, newProjectModalVisible }
 */
export const hideNewProjectModal = () => {
  return {
    type: actionTypes.HIDE_NEW_PROJECT_MODAL,
    newProjectModalVisible: false,
  };
};

// // // // // // // // // //

// ** SHOW_NEW_EXPERIMENT_MODAL
/**
 * show new experiment modal
 * @returns {Object} { type, newExperimentModalVisible }
 */
export const showNewExperimentModal = () => {
  return {
    type: actionTypes.SHOW_NEW_EXPERIMENT_MODAL,
    newExperimentModalVisible: true,
  };
};

// // // // // // // // // //

// ** HIDE_NEW_EXPERIMENT_MODAL
/**
 * hide new experiment modal
 * @returns {Object} { type, newExperimentModalVisible }
 */
export const hideNewExperimentModal = () => {
  return {
    type: actionTypes.HIDE_NEW_EXPERIMENT_MODAL,
    newExperimentModalVisible: false,
  };
};

// // // // // // // // // //

// ** SHOW_DRAWER
/**
 * show drawer
 * @returns {Object} { type, drawerVisible }
 */
export const showDrawer = (title, isDataset) => {
  return {
    type: actionTypes.SHOW_DRAWER,
    drawer: { visible: true, title, isDataset },
  };
};

// // // // // // // // // //

// ** HIDE_DRAWER
/**
 * hide drawer
 * @returns {Object} { type, drawerVisible }
 */
export const hideDrawer = () => {
  return {
    type: actionTypes.HIDE_DRAWER,
    drawerVisible: false,
  };
};

// // // // // // // // // //
