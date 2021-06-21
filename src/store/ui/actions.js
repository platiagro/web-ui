import actionTypes from './actionTypes';
import { deselectOperator } from 'store/operator';

export const changeVisibilityCompareResultsModal = (visible) => {
  return {
    type: actionTypes.VISIBILITY_COMPARE_RESULTS_MODAL,
    isVisible: visible,
  };
};

/**
 * show new project modal
 *
 * @param {object} record Record
 * @returns {object} { type, newProjectModalVisible }
 */
export const showNewProjectModal = (record) => {
  if (record !== undefined && record !== null) {
    return {
      type: actionTypes.SHOW_EDIT_PROJECT_MODAL,
      newProjectModalVisible: true,
      newProjectModalRecord: record,
    };
  } else {
    return {
      type: actionTypes.SHOW_NEW_PROJECT_MODAL,
      newProjectModalVisible: true,
    };
  }
};

/**
 * hide new project modal
 *
 * @returns {object} { type, newProjectModalVisible }
 */
export const hideNewProjectModal = () => {
  return {
    type: actionTypes.HIDE_NEW_PROJECT_MODAL,
    newProjectModalVisible: false,
  };
};

/**
 * show new experiment modal
 *
 * @returns {object} { type, newExperimentModalVisible }
 */
export const showNewExperimentModal = () => (dispatch) => {
  dispatch(deselectOperator());

  dispatch({
    type: actionTypes.SHOW_NEW_EXPERIMENT_MODAL,
    newExperimentModalVisible: true,
  });
};

/**
 * hide new experiment modal
 *
 * @returns {object} { type, newExperimentModalVisible }
 */
export const hideNewExperimentModal = () => {
  return {
    type: actionTypes.HIDE_NEW_EXPERIMENT_MODAL,
    newExperimentModalVisible: false,
  };
};

/**
 * show new template modal
 *
 * @returns {object} { type, newTemplateModalVisible }
 */
export const showNewTemplateModal = () => {
  return {
    type: actionTypes.SHOW_NEW_TEMPLATE_MODAL,
    newTemplateModalVisible: true,
  };
};

/**
 * hide new template modal
 *
 * @returns {object} { type, newTemplateModalVisible }
 */
export const hideNewTemplateModal = () => {
  return {
    type: actionTypes.HIDE_NEW_TEMPLATE_MODAL,
    newTemplateModalVisible: false,
  };
};

/**
 * Show operator information drawer
 *
 * @param {string} title operator drawer
 * @param {boolean} isDataset is a operator is DATASET type
 * @returns {object} { type, drawerVisible }
 */
export const showOperatorDrawer = (title, isDataset) => {
  return {
    type: actionTypes.SHOW_OPERATOR_DRAWER,
    operatorDrawer: { visible: true, title, isDataset },
  };
};

/**
 * Hide operator drawer
 *
 * @returns {object} { type, drawerVisible }
 */
export const hideOperatorDrawer = () => (dispatch) => {
  //hidding drawer
  dispatch({
    type: actionTypes.HIDE_OPERATOR_DRAWER,
    operatorDrawer: false,
  });

  // hidding drawer results
  dispatch(hideOperatorResults());
};

/**
 * Show inference logs drawer
 *
 * @param {string} title drawer title
 * @returns {object} { type, title }
 */
export const showInferenceLogsDrawer = (title) => {
  return {
    type: actionTypes.SHOW_INFERENCE_LOGS_DRAWER,
    inferenceLogsDrawer: { visible: true, title },
  };
};

/**
 * Hide inference logs drawer
 *
 * @returns {object} { type, drawerVisible }
 */
export const hideInferenceLogsDrawer = () => {
  return {
    type: actionTypes.HIDE_INFERENCE_LOGS_DRAWER,
    drawerVisible: false,
  };
};

/**
 * show operator results
 *
 * @returns {object} { type, showResults }
 */
export const showOperatorResults = () => {
  return {
    type: actionTypes.SHOW_OPERATOR_RESULTS,
    showOperatorResults: true,
  };
};

/**
 * hide drawer results
 *
 * @returns {object} { type, showResults }
 */
export const hideOperatorResults = () => {
  return {
    type: actionTypes.HIDE_OPERATOR_RESULTS,
    showOperatorResults: false,
  };
};

/**
 * tasks menu loading data
 *
 * @returns {object} { type, tasksMenuLoading }
 */
export const tasksMenuLoadingData = () => {
  return {
    type: actionTypes.TASKS_MENU_LOADING_DATA,
    tasksMenuLoading: true,
  };
};

/**
 * tasks menu loading data
 *
 * @returns {object} { type, tasksMenuLoading }
 */
export const tasksMenuDataLoaded = () => {
  return {
    type: actionTypes.TASKS_MENU_DATA_LOADED,
    tasksMenuLoading: false,
  };
};

/**
 * deployments tabs hide modal
 *
 * @returns {object} { type, visible }
 */
export const deploymentsTabsHideModal = () => {
  return {
    type: actionTypes.DEPLOYMENTS_TABS_HIDE_MODAL,
    visible: false,
  };
};

/**
 * deployments tabs show modal
 *
 * @returns {object} { type, visible }
 */
export const deploymentsTabsShowModal = () => {
  return {
    type: actionTypes.DEPLOYMENTS_TABS_SHOW_MODAL,
    visible: true,
  };
};

/**
 * experiment training loading data
 *
 * @returns {object} { type, experimentTrainingLoading }
 */
export const experimentTrainingLoadingData = () => {
  return {
    type: actionTypes.EXPERIMENT_TRAINING_LOADING_DATA,
    experimentTrainingLoading: true,
  };
};

/**
 * experiment training loading data
 *
 * @returns {object} { type, experimentTrainingLoading }
 */
export const experimentTrainingDataLoaded = () => {
  return {
    type: actionTypes.EXPERIMENT_TRAINING_DATA_LOADED,
    experimentTrainingLoading: false,
  };
};

/**
 * experiment delete training loading data
 *
 * @returns {object} { type, experimentDeleteTrainingLoading }
 */
export const experimentDeleteTrainingLoadingData = () => {
  return {
    type: actionTypes.EXPERIMENT_DELETE_TRAINING_LOADING_DATA,
    experimentDeleteTrainingLoading: true,
  };
};

/**
 * experiment delete training loaded data
 *
 * @returns {object} { type, experimentDeleteTrainingLoading }
 */
export const experimentDeleteTrainingDataLoaded = () => {
  return {
    type: actionTypes.EXPERIMENT_DELETE_TRAINING_DATA_LOADED,
    experimentDeleteTrainingLoading: false,
  };
};

/**
 * experiment operators loading data
 *
 * @returns {object} { type, experimentOperatorsLoading }
 */
export const experimentOperatorsLoadingData = () => {
  return {
    type: actionTypes.EXPERIMENT_OPERATORS_LOADING_DATA,
    experimentOperatorsLoading: true,
  };
};

/**
 * experiment operators loading data
 *
 * @returns {object} { type, experimentOperatorsLoading }
 */
export const experimentOperatorsDataLoaded = () => {
  return {
    type: actionTypes.EXPERIMENT_OPERATORS_DATA_LOADED,
    experimentOperatorsLoading: false,
  };
};

/**
 * template loading data
 *
 * @returns {object} { type, templateLoading }
 */
export const templateLoadingData = () => {
  return {
    type: actionTypes.TEMPLATE_LOADING_DATA,
    templateLoading: true,
  };
};

/**
 * template loading data
 *
 * @returns {object} { type, templateLoading }
 */
export const templateDataLoaded = () => {
  return {
    type: actionTypes.TEMPLATE_DATA_LOADED,
    templateLoading: false,
  };
};

// USING_DEPLOYMENTS_MODAL
export const showUsingDeploymentsModal = () => {
  return {
    type: actionTypes.SHOW_USING_DEPLOYMENTS_MODAL,
  };
};

/**
 *
 * @returns {object} { type, newTemplateModalVisible }
 */
export const hideUsingDeploymentsModal = () => {
  return {
    type: actionTypes.HIDE_USING_DEPLOYMENTS_MODAL,
  };
};

/**
 * deployment operators loading data
 *
 * @returns {object} { type, deploymentOperatorsLoading }
 */
export const deploymentOperatorsLoadingData = () => {
  return {
    type: actionTypes.DEPLOYMENT_OPERATORS_LOADING_DATA,
    deploymentOperatorsLoading: true,
  };
};

/**
 * deployment operators loading data
 *
 * @returns {object} { type, deploymentOperatorsLoading }
 */
export const deploymentOperatorsDataLoaded = () => {
  return {
    type: actionTypes.DEPLOYMENT_OPERATORS_DATA_LOADED,
    deploymentOperatorsLoading: false,
  };
};

// DATA VIEW MODAL

/**
 * Show data view modal
 *
 * @returns {object} Action
 */
export const showDataViewModal = () => {
  return {
    type: actionTypes.SHOW_DATA_VIEW_MODAL,
    isVisible: true,
  };
};

/**
 * Hide data view modal
 *
 * @returns {object} Action
 */
export const hideDataViewModal = () => {
  return {
    type: actionTypes.HIDE_DATA_VIEW_MODAL,
    isVisible: false,
  };
};

export const saveFlowTransform = (transform) => {
  return {
    type: actionTypes.SAVE_FLOW_TRANSFORM,
    transform: transform,
  };
};

export const dependenciesOperatorLoading = (dependencyId) => {
  return {
    type: actionTypes.LOADING_OPERATOR_DEPENDENCIES,
    loading: true,
    uuid: dependencyId,
  };
};

export const dependenciesOperatorLoaded = (dependencyId) => {
  return {
    type: actionTypes.LOADING_OPERATOR_DEPENDENCIES,
    loading: false,
    uuid: dependencyId,
  };
};

export const hidePrepareDeploymentsModal = () => {
  return {
    type: actionTypes.HIDE_PREPARE_DEPLOYMENTS_MODAL,
    prepareDeploymentsModalVisible: false,
  };
};

export const showPrepareDeploymentsModal = () => {
  return {
    type: actionTypes.SHOW_PREPARE_DEPLOYMENTS_MODAL,
    prepareDeploymentsModalVisible: true,
  };
};

export const showNewDeploymentModal = () => {
  return {
    type: actionTypes.SHOW_DEPLOYMENT_MODAL,
    visible: true,
  };
};

export const hideNewDeploymentModal = () => {
  return {
    type: actionTypes.HIDE_DEPLOYMENT_MODAL,
    visible: false,
  };
};

/**
 * Prepare deployments loading data
 *
 * @returns {object} { type, prepareDeploymentsLoading }
 */
export const prepareDeploymentsLoadingData = () => {
  return {
    type: actionTypes.PREPARE_DEPLOYMENTS_LOADING_DATA,
    prepareDeploymentsLoading: true,
  };
};

/**
 * Prepare deployments data loaded
 *
 * @returns {object} { type, prepareDeploymentsLoading }
 */
export const prepareDeploymentsDataLoaded = () => {
  return {
    type: actionTypes.PREPARE_DEPLOYMENTS_DATA_LOADED,
    prepareDeploymentsLoading: false,
  };
};

export const showExternalDatasetHelperModal = () => {
  return {
    type: actionTypes.SHOW_EXTERNAL_DATASET_HELPER_MODAL,
    visible: true,
  };
};

export const hideExternalDatasetHelperModal = () => {
  return {
    type: actionTypes.HIDE_EXTERNAL_DATASET_HELPER_MODAL,
    visible: false,
  };
};

export const showLogsPanel = () => {
  return {
    type: actionTypes.SHOW_LOGS_PANEL,
    isShowing: true,
  };
};

export const hideLogsPanel = () => {
  return {
    type: actionTypes.SHOW_LOGS_PANEL,
    isShowing: false,
  };
};
