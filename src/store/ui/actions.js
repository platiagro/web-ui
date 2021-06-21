// ACTION TYPES
import actionTypes from './actionTypes';
import { deselectOperator } from 'store/operator';

// ACTIONS

// // // // // // // // // //
// COMPARE RESULTS MODAL
export const changeVisibilityCompareResultsModal = (visible) => {
  return {
    type: actionTypes.VISIBILITY_COMPARE_RESULTS_MODAL,
    isVisible: visible,
  };
};

// ** SHOW_NEW_PROJECT_MODAL
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

// // // // // // // // // //

// ** HIDE_NEW_PROJECT_MODAL
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

// // // // // // // // // //

// ** SHOW_NEW_EXPERIMENT_MODAL
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

// // // // // // // // // //

// ** HIDE_NEW_EXPERIMENT_MODAL
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

// // // // // // // // // //

// ** SHOW_NEW_TEMPLATE_MODAL
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

// // // // // // // // // //

// ** HIDE_NEW_TEMPLATE_MODAL
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

// // // // // // // // // //

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

// // // // // // // // // //

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

// // // // // // // // // // // // // //
//
//  INFERENCE LOGS DRAWER

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
 *  Inference logs drawer loading data
 *
 * @returns {object} { type, inferenceLogsDrawerLoading }
 */
export const inferenceLogsDrawerLoadingData = () => {
  return {
    type: actionTypes.INFERENCE_LOGS_DRAWER_LOADING_DATA,
    inferenceLogsDrawerLoading: true,
  };
};

/**
 * Inference logs drawer data loaded
 *
 * @returns {object} { type, inferenceLogsDrawerLoading }
 */
export const inferenceLogsDrawerDataLoaded = () => {
  return {
    type: actionTypes.INFERENCE_LOGS_DRAWER_DATA_LOADED,
    inferenceLogsDrawerLoading: false,
  };
};

// // // // // // // // // //

// ** SHOW OPERATOR RESULTS
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

// // // // // // // // // //

// ** HIDE OPERATOR RESULTS
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

// // // // // // // // // //

// ** TASKS MENU LOADING DATA
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

// // // // // // // // // //

// ** TASKS MENU DATA LOADED
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

// // // // // // // // // //

// ** DEPLOYMENTS TABS

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

// // // // // // // // // //

// ** EXPERIMENT TRAINING LOADING DATA
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

// // // // // // // // // //

// ** EXPERIMENT TRAINING DATA LOADED
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

// // // // // // // // // //

// ** EXPERIMENT DELETE TRAINING LOADING DATA
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

// // // // // // // // // //

// ** EXPERIMENT DELETE TRAINING LOADED DATA
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

// // // // // // // // // //

// ** EXPERIMENT OPERATORS LOADING DATA
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

// // // // // // // // // //

// ** EXPERIMENT OPERATORS DATA LOADED
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

// // // // // // // // // //

// ** OPERATOR RESULTS DOWNLOAD DATASET LOADED
export const operatorResultsDownloadDatasetLoaded = () => {
  return {
    type: actionTypes.OPERATOR_RESULTS_DOWNLOAD_DATASET_LOADED,
    downloadDatasetLoading: false,
  };
};

// ** OPERATOR RESULTS DOWNLOAD DATASET LOADING
export const operatorResultsDownloadDatasetLoading = () => {
  return {
    type: actionTypes.OPERATOR_RESULTS_DOWNLOAD_DATASET_LOADING,
    downloadDatasetLoading: true,
  };
};

// // // // // // // // // //

// ** OPERATOR RESULTS LOADING DATA
/**
 * operator parameter loading data
 *
 * @returns {object} { type, operatorResultsLoading }
 */
export const operatorResultsLoadingData = () => {
  return {
    type: actionTypes.OPERATOR_RESULTS_LOADING_DATA,
    operatorResultsLoading: true,
  };
};

// // // // // // // // // //

// ** OPERATOR RESULTS DATA LOADED
/**
 * operator parameter data loaded
 *
 * @returns {object} { type, operatorResultsLoading }
 */
export const operatorResultsDataLoaded = () => {
  return {
    type: actionTypes.OPERATOR_RESULTS_DATA_LOADED,
    operatorResultsLoading: false,
  };
};

// ** OPERATOR RESULTS BUTTON LOADING DATA
/**
 * operator parameter loading data
 *
 * @returns {object} { type, resultsButtonBarLoading }
 */
export const resultsButtonBarLoadingData = () => {
  return {
    type: actionTypes.OPERATOR_RESULTS_BUTTON_LOADING_DATA,
    resultsButtonBarLoading: true,
  };
};

// // // // // // // // // //

// ** OPERATOR RESULTS BUTTON DATA LOADED
/**
 * operator parameter data loaded
 *
 * @returns {object} { type, resultsButtonBarLoading }
 */
export const resultsButtonBarDataLoaded = () => {
  return {
    type: actionTypes.OPERATOR_RESULTS_BUTTON_DATA_LOADED,
    resultsButtonBarLoading: false,
  };
};

// // // // // // // // // //

// ** TEMPLATE LOADING DATA
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

// // // // // // // // // //

// ** TEMPLATE DATA LOADED
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

// // // // // // // // // //

// ** IMPLANTED EXPERIMENTS LOADING DATA
/**
 *  implanted experiments loading data
 *
 * @returns {object} { type, implantedExperimentsLoading }
 */
export const implantedExperimentsLoadingData = () => {
  return {
    type: actionTypes.IMPLANTED_EXPERIMENTS_LOADING_DATA,
    implantedExperimentsLoading: true,
  };
};

// // // // // // // // // //

// ** IMPLANTED EXPERIMENTS DATA LOADED
/**
 * implanted experiments loading data
 *
 * @returns {object} { type, implantedExperimentsLoading }
 */
export const implantedExperimentsDataLoaded = () => {
  return {
    type: actionTypes.IMPLANTED_EXPERIMENTS_DATA_LOADED,
    implantedExperimentsLoading: false,
  };
};

// USING_DEPLOYMENTS_MODAL
export const showUsingDeploymentsModal = () => {
  return {
    type: actionTypes.SHOW_USING_DEPLOYMENTS_MODAL,
  };
};

// // // // // // // // // //

// ** HIDE_USING_DEPLOYMENTS_MODAL
/**
 *
 * @returns {object} { type, newTemplateModalVisible }
 */
export const hideUsingDeploymentsModal = () => {
  return {
    type: actionTypes.HIDE_USING_DEPLOYMENTS_MODAL,
  };
};

export const loadingOnDataViewModal = () => {
  return {
    type: actionTypes.LOADING_DATA_VIEW_MODAL,
    loading: true,
  };
};

export const loadingOffDataViewModal = () => {
  return {
    type: actionTypes.LOADING_DATA_VIEW_MODAL,
    loading: false,
  };
};

// // // // // // // // // //

// ** DEPLOYMENT OPERATORS LOADING DATA
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

// // // // // // // // // //

// ** DEPLOYMENT OPERATORS DATA LOADED
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

// // // // // // // // // //

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

// // // // // // // // // // // // // //
// // // // // // // // // //

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

export const newDeploymentModalStartLoading = () => {
  return {
    type: actionTypes.DEPLOYMENT_MODAL_START_LOADING,
    payload: true,
  };
};

export const newDeploymentModalEndLoading = () => {
  return {
    type: actionTypes.DEPLOYMENT_MODAL_END_LOADING,
    payload: false,
  };
};

// // // // // // // // // // // // // //

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
