// ACTION TYPES
import actionTypes from './actionTypes';
import { deselectOperator } from '../operator/actions';

// ACTIONS

// // // // // // // // // //
// COMPARE RESULTS MODAL
export const changeVisibilityCompareResultsModal = (visible) => {
  return {
    type: actionTypes.VISIBILITY_COMPARE_RESULTS_MODAL,
    isVisible: visible,
  };
};
export const changeLoadingCompareResultsModal = (loading) => {
  return {
    type: actionTypes.LOADING_COMPARE_RESULTS_MODAL,
    loading: loading,
  };
};
export const setAddLoaderCompareResultsModal = (addIsLoading) => {
  return {
    type: actionTypes.ADD_COMPARE_RESULT_LOADER,
    addIsLoading: addIsLoading,
  };
};
export const setDeleteLoaderCompareResultsModal = (deleteIsLoading) => {
  return {
    type: actionTypes.DELETE_COMPARE_RESULT_LOADER,
    deleteIsLoading: deleteIsLoading,
  };
};

// ** SHOW_NEW_PROJECT_MODAL
/**
 * show new project modal
 *
 * @param record
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

// ** TASKS TABLE LOADING DATA
/**
 * tasks table loading data
 *
 * @returns {object} { type, tasksTableLoading }
 */
export const tasksTableLoadingData = () => {
  return {
    type: actionTypes.TASKS_TABLE_LOADING_DATA,
    tasksTableLoading: true,
  };
};

// // // // // // // // // //

// ** TASKS TABLE DATA LOADED
/**
 * tasks table loading data
 *
 * @returns {object} { type, tasksTableLoading }
 */
export const tasksTableDataLoaded = () => {
  return {
    type: actionTypes.TASKS_TABLE_DATA_LOADED,
    tasksTableLoading: false,
  };
};

// // // // // // // // // //

// ** PROJECTS TABLE LOADING DATA
/**
 * projects table loading data
 *
 * @returns {object} { type, projectsTableLoading }
 */
export const projectsTableLoadingData = () => {
  return {
    type: actionTypes.PROJECTS_TABLE_LOADING_DATA,
    projectsTableLoading: true,
  };
};

// // // // // // // // // //

// ** PROJECTS TABLE DATA LOADED
/**
 * projects table loading data
 *
 * @returns {object} { type, projectsTableLoading }
 */
export const projectsTableDataLoaded = () => {
  return {
    type: actionTypes.PROJECTS_TABLE_DATA_LOADED,
    projectsTableLoading: false,
  };
};

// // // // // // // // // //

// ** PROJECT NAME LOADING DATA
/**
 * project name loading data
 *
 * @returns {object} { type, projectNameLoading }
 */
export const projectNameLoadingData = () => {
  return {
    type: actionTypes.PROJECT_NAME_LOADING_DATA,
    projectNameLoading: true,
  };
};

// // // // // // // // // //

// ** PROJECT NAME DATA LOADED
/**
 * project name loading data
 *
 * @returns {object} { type, projectNameLoading }
 */
export const projectNameDataLoaded = () => {
  return {
    type: actionTypes.PROJECT_NAME_DATA_LOADED,
    projectNameLoading: false,
  };
};

// // // // // // // // // //

// ** PROJECT EDIT NAME LOADING DATA
/**
 * project edit name loading data
 *
 * @returns {object} { type, projectEditNameLoading }
 */
export const projectEditNameLoadingData = () => {
  return {
    type: actionTypes.PROJECT_EDIT_NAME_LOADING_DATA,
    projectEditNameLoading: true,
  };
};

// // // // // // // // // //

// ** PROJECT EDIT NAME DATA LOADED
/**
 * project edit name loading data
 *
 * @returns {object} { type, projectEditNameLoading }
 */
export const projectEditNameDataLoaded = () => {
  return {
    type: actionTypes.PROJECT_EDIT_NAME_DATA_LOADED,
    projectEditNameLoading: false,
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
 * deployments tabs loading data
 *
 * @returns {object} { type, loading }
 */
export const deploymentsTabsDataLoaded = () => {
  return {
    type: actionTypes.DEPLOYMENTS_TABS_DATA_LOADED,
    loading: false,
  };
};

/**
 * deployments tabs loading data
 *
 * @returns {object} { type, loading }
 */
export const deploymentsTabsLoadingData = () => {
  return {
    type: actionTypes.DEPLOYMENTS_TABS_LOADING_DATA,
    loading: true,
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

// // // // // // // // // //

// ** EXPERIMENTS TABS LOADING DATA
/**
 * experiments tabs loading data
 *
 * @returns {object} { type, experimentsTabsLoading }
 */
export const experimentsTabsLoadingData = () => {
  return {
    type: actionTypes.EXPERIMENTS_TABS_LOADING_DATA,
    experimentsTabsLoading: true,
  };
};

// // // // // // // // // //

// ** EXPERIMENTS TABS DATA LOADED
/**
 * experiments tabs loading data
 *
 * @returns {object} { type, experimentsTabsLoading }
 */
export const experimentsTabsDataLoaded = () => {
  return {
    type: actionTypes.EXPERIMENTS_TABS_DATA_LOADED,
    experimentsTabsLoading: false,
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

// ** EXPERIMENT NAME LOADING DATA
/**
 * experiment name loading data
 *
 * @returns {object} { type, experimentNameLoading }
 */
export const experimentNameLoadingData = () => {
  return {
    type: actionTypes.EXPERIMENT_NAME_LOADING_DATA,
    experimentNameLoading: true,
  };
};

// // // // // // // // // //

// ** EXPERIMENT NAME DATA LOADED
/**
 * experiment name loading data
 *
 * @returns {object} { type, experimentNameLoading }
 */
export const experimentNameDataLoaded = () => {
  return {
    type: actionTypes.EXPERIMENT_NAME_DATA_LOADED,
    experimentNameLoading: false,
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

// ** DATASETS LIST LOADING DATA
/**
 * datasets list loading data
 *
 * @returns {object} { type, datasetsListLoading }
 */
export const datasetsListLoadingData = () => {
  return {
    type: actionTypes.DATASETS_LIST_LOADING_DATA,
    datasetsListLoading: true,
  };
};

// // // // // // // // // //

// ** DATASETS LIST DATA LOADED
/**
 * datasets list data loaded
 *
 * @returns {object} { type, datasetsListLoading }
 */
export const datasetsListDataLoaded = () => {
  return {
    type: actionTypes.DATASETS_LIST_DATA_LOADED,
    datasetsListLoading: false,
  };
};

// // // // // // // // // //

// ** DATASET OPERATOR LOADING DATA
/**
 * dataset operator loading data
 *
 * @returns {object} { type, datasetOperatorLoading }
 */
export const datasetOperatorLoadingData = () => {
  return {
    type: actionTypes.DATASET_OPERATOR_LOADING_DATA,
    datasetOperatorLoading: true,
  };
};

// // // // // // // // // //

// ** DATASET OPERATOR DATA LOADED
/**
 * dataset operator loading data
 *
 * @returns {object} { type, datasetOperatorLoading }
 */
export const datasetOperatorDataLoaded = () => {
  return {
    type: actionTypes.DATASET_OPERATOR_DATA_LOADED,
    datasetOperatorLoading: false,
  };
};

// // // // // // // // // //

// ** OPERATOR PARAMETER LOADING DATA
/**
 * operator parameter loading data
 *
 * @returns {object} { type, operatorParameterLoading }
 */
export const operatorParameterLoadingData = () => {
  return {
    type: actionTypes.OPERATOR_PARAMETER_LOADING_DATA,
    operatorParameterLoading: true,
  };
};

// // // // // // // // // //

// ** DATASET OPERATOR DATA LOADED
/**
 * operator parameter data loaded
 *
 * @returns {object} { type, operatorParameterLoading }
 */
export const operatorParameterDataLoaded = () => {
  return {
    type: actionTypes.OPERATOR_PARAMETER_DATA_LOADED,
    operatorParameterLoading: false,
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

// ** OPERATOR RESULTS LOADING DATA
/**
 * operator parameter loading data
 *
 * @returns {object} { type, operatorResultsLoading }
 */
export const operatorMetricsLoadingData = () => {
  return {
    type: actionTypes.OPERATOR_METRICS_LOADING_DATA,
  };
};

// // // // // // // // // //

// ** OPERATOR RESULTS DATA LOADED
/**
 * operator parameter data loaded
 *
 * @returns {object} { type, operatorResultsLoading }
 */
export const operatorMetricsDataLoaded = () => {
  return {
    type: actionTypes.OPERATOR_METRICS_DATA_LOADED,
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
//
//  INFERENCE TEST RESULT MODAL
/**
 * Show inference test result modal
 *
 * @returns {object} { type, newTemplateModalVisible }
 */
export const showInferenceTestResultModal = () => {
  return {
    type: actionTypes.SHOW_EXPERIMENT_INFERENCE_MODAL,
  };
};

/**
 * Hide inference test result modal
 *
 * @returns {object} { type, newTemplateModalVisible }
 */
export const hideInferenceTestResultModal = () => {
  return {
    type: actionTypes.HIDE_EXPERIMENT_INFERENCE_MODAL,
  };
};

/**
 * Inference test result modal loading data
 *
 * @returns {object} { type, inferenceLogsDrawerLoading }
 */
export const inferenceTestResultModalLoadingData = () => {
  return {
    type: actionTypes.EXPERIMENT_INFERENCE_MODAL_LOADING_DATA,
    inferenceTestResultModalLoading: true,
  };
};

/**
 * Inference test result modal data loaded
 *
 * @returns {object} { type, inferenceLogsDrawerLoading }
 */
export const inferenceTestResultModalDataLoaded = () => {
  return {
    type: actionTypes.EXPERIMENT_INFERENCE_MODAL_DATA_LOADED,
    inferenceTestResultModalLoading: false,
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
