import actionTypes from './actionTypes';
import { deselectOperator } from 'store/operator';

/**
 * Change compare results modal visibility
 *
 * @param {boolean} visible Is Visible
 * @returns {object} Action
 */
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
 * @returns {object} Action
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
 * @returns {object} Action
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
 * @returns {Function} DIspatch function
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
 * @returns {object} Action
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
 * @returns {object} Action
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
 * @returns {object} Action
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
 * @returns {object} Action
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
 * @returns {Function} DIspatch function
 */
export const hideOperatorDrawer = () => (dispatch) => {
  dispatch({
    type: actionTypes.HIDE_OPERATOR_DRAWER,
    operatorDrawer: false,
  });

  dispatch(hideOperatorResults());
};

/**
 * Show inference logs drawer
 *
 * @param {string} title drawer title
 * @returns {object} Action
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
 * @returns {object} Action
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
 * @returns {object} Action
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
 * @returns {object} Action
 */
export const hideOperatorResults = () => {
  return {
    type: actionTypes.HIDE_OPERATOR_RESULTS,
    showOperatorResults: false,
  };
};

/**
 * deployments tabs hide modal
 *
 * @returns {object} Action
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
 * @returns {object} Action
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
 * @returns {object} Action
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
 * @returns {object} Action
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
 * @returns {object} Action
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
 * @returns {object} Action
 */
export const experimentDeleteTrainingDataLoaded = () => {
  return {
    type: actionTypes.EXPERIMENT_DELETE_TRAINING_DATA_LOADED,
    experimentDeleteTrainingLoading: false,
  };
};

/**
 * show using deployments modal
 *
 * @returns {object} Action
 */
export const showUsingDeploymentsModal = () => {
  return {
    type: actionTypes.SHOW_USING_DEPLOYMENTS_MODAL,
  };
};

/**
 * Hide using deployments modal
 *
 * @returns {object} Action
 */
export const hideUsingDeploymentsModal = () => {
  return {
    type: actionTypes.HIDE_USING_DEPLOYMENTS_MODAL,
  };
};

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

/**
 * Save flow transform
 *
 * @param {object} transform Transform
 * @returns {object} Action
 */
export const saveFlowTransform = (transform) => {
  return {
    type: actionTypes.SAVE_FLOW_TRANSFORM,
    transform: transform,
  };
};

/**
 * Dependencies operator loading
 *
 * @param {string} dependencyId Dependency Id
 * @returns {object} Action
 */
export const dependenciesOperatorLoading = (dependencyId) => {
  return {
    type: actionTypes.LOADING_OPERATOR_DEPENDENCIES,
    loading: true,
    uuid: dependencyId,
  };
};

/**
 * Dependencies operator loaded
 *
 * @param {string} dependencyId Dependency Id
 * @returns {object} Action
 */
export const dependenciesOperatorLoaded = (dependencyId) => {
  return {
    type: actionTypes.LOADING_OPERATOR_DEPENDENCIES,
    loading: false,
    uuid: dependencyId,
  };
};

/**
 * Hide prepare deployments modal
 *
 * @returns {object} Action
 */
export const hidePrepareDeploymentsModal = () => {
  return {
    type: actionTypes.HIDE_PREPARE_DEPLOYMENTS_MODAL,
    prepareDeploymentsModalVisible: false,
  };
};

/**
 * Show prepare deployments modal
 *
 * @returns {object} Action
 */
export const showPrepareDeploymentsModal = () => {
  return {
    type: actionTypes.SHOW_PREPARE_DEPLOYMENTS_MODAL,
    prepareDeploymentsModalVisible: true,
  };
};

/**
 * Show mew deployment modal
 *
 * @returns {object} Action
 */
export const showNewDeploymentModal = () => {
  return {
    type: actionTypes.SHOW_DEPLOYMENT_MODAL,
    visible: true,
  };
};

/**
 * Hide new deployment modal
 *
 * @returns {object} Action
 */
export const hideNewDeploymentModal = () => {
  return {
    type: actionTypes.HIDE_DEPLOYMENT_MODAL,
    visible: false,
  };
};

/**
 * Show external dataset helper modal
 *
 * @returns {object} Action
 */
export const showExternalDatasetHelperModal = () => {
  return {
    type: actionTypes.SHOW_EXTERNAL_DATASET_HELPER_MODAL,
    visible: true,
  };
};

/**
 * Hide external dataset helper modal
 *
 * @returns {object} Action
 */
export const hideExternalDatasetHelperModal = () => {
  return {
    type: actionTypes.HIDE_EXTERNAL_DATASET_HELPER_MODAL,
    visible: false,
  };
};

/**
 * Show logs panel
 *
 * @returns {object} Action
 */
export const showLogsPanel = () => {
  return {
    type: actionTypes.SHOW_LOGS_PANEL,
    isShowing: true,
  };
};

/**
 * Hide logs panel
 *
 * @returns {object} Action
 */
export const hideLogsPanel = () => {
  return {
    type: actionTypes.SHOW_LOGS_PANEL,
    isShowing: false,
  };
};
