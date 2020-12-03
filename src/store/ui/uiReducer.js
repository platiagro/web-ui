// ACTION TYPES
import actionTypes from './actionTypes';
import projectActionTypes from '../project/actionTypes';
import experimentActionTypes from '../experiments/actionTypes';

// INITIAL STATE
const initialState = {
  compareResultsModal: {
    addIsLoading: false,
    deleteIsLoading: false,
    isVisible: false,
    loading: false,
  },
  newProjectModal: {
    visible: false,
    title: 'Novo Projeto',
    record: undefined,
    modalValidateStatus: null,
    errorMessage: null,
  },
  newExperimentModal: {
    visible: false,
    modalValidateStatus: null,
    errorMessage: null,
  },
  newTemplateModal: { visible: false },
  newDeploymentsModal: { visible: false },
  operatorDrawer: {
    visible: false,
    isDataset: false,
    title: 'Título Drawer',
  },
  inferenceLogsDrawer: {
    loading: false,
    isDataset: false,
    title: 'Título Drawer',
    visible: false,
  },
  template: { loading: false },
  tasksTable: { loading: false },
  projectsTable: { loading: false },
  projectName: { loading: false },
  tasksMenu: { loading: false },
  experimentsTabs: { loading: false },
  experimentName: { loading: false },
  experimentOperators: { loading: false },
  experimentTraining: { loading: false },
  datasetsList: { loading: false },
  datasetOperator: { loading: false },
  operatorParameter: { loading: false },
  operatorResults: {
    downloadDatasetLoading: false,
    loading: false,
    showOperatorResults: false,
  },
  operatorMetrics: { loading: false },
  implantedExperiments: { loading: false },
  inferenceTestResultModal: { loading: false, visible: false },
  projectEditName: { loading: false },
  dataViewModal: { isVisible: false, loading: false },
  flowTransform: { x: 0, y: 0, zoom: 1 },
  operatorsDependencies: {
    loading: false,
  },
};

const uiReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    // COMPARE RESULTS MODAL
    case actionTypes.ADD_COMPARE_RESULT_LOADER:
      return {
        ...state,
        compareResultsModal: {
          ...state.compareResultsModal,
          addIsLoading: action.addIsLoading,
        },
      };
    case actionTypes.DELETE_COMPARE_RESULT_LOADER:
      return {
        ...state,
        compareResultsModal: {
          ...state.compareResultsModal,
          deleteIsLoading: action.deleteIsLoading,
        },
      };
    case actionTypes.VISIBILITY_COMPARE_RESULTS_MODAL:
      return {
        ...state,
        compareResultsModal: {
          ...state.compareResultsModal,
          isVisible: action.isVisible,
        },
      };
    case actionTypes.LOADING_COMPARE_RESULTS_MODAL:
      return {
        ...state,
        compareResultsModal: {
          ...state.compareResultsModal,
          loading: action.loading,
        },
      };

    // NEW PROJECT MODAL
    case projectActionTypes.CREATE_PROJECT_FAIL:
    case projectActionTypes.EDIT_PROJECT_NAME_FAIL:
      return {
        ...state,
        newProjectModal: {
          ...state.newProjectModal,
          modalValidateStatus: 'error',
          errorMessage: action.errorMessage,
        },
      };
    // show new project modal
    case actionTypes.SHOW_NEW_PROJECT_MODAL:
      return {
        ...state,
        newProjectModal: {
          ...state.newProjectModal,
          visible: action.newProjectModalVisible,
          title: 'Novo projeto',
          record: undefined,
        },
      };
    case actionTypes.SHOW_EDIT_PROJECT_MODAL:
      return {
        ...state,
        newProjectModal: {
          ...state.newProjectModal,
          visible: action.newProjectModalVisible,
          title: 'Editar projeto',
          record: action.newProjectModalRecord,
        },
      };
    // hide new project modal
    case actionTypes.HIDE_NEW_PROJECT_MODAL:
      return {
        ...state,
        newProjectModal: {
          ...state.newProjectModal,
          visible: action.newProjectModalVisible,
          record: undefined,
          modalValidateStatus: null,
          errorMessage: null,
        },
      };

    // NEW EXPERIMENT MODAL
    case experimentActionTypes.CREATE_EXPERIMENT_FAIL:
      return {
        ...state,
        newExperimentModal: {
          ...state.newExperimentModal,
          modalValidateStatus: 'error',
          errorMessage: action.errorMessage,
        },
      };
    // show new experiment modal
    case actionTypes.SHOW_NEW_EXPERIMENT_MODAL:
      return {
        ...state,
        newExperimentModal: {
          ...state.newExperimentModal,
          visible: action.newExperimentModalVisible,
        },
      };
    // hide new experiment modal
    case actionTypes.HIDE_NEW_EXPERIMENT_MODAL:
      return {
        ...state,
        newExperimentModal: {
          ...state.newExperimentModal,
          visible: action.newExperimentModalVisible,
          modalValidateStatus: null,
          errorMessage: null,
        },
      };

    // show DeploymentsModal
    case actionTypes.SHOW_USING_DEPLOYMENTS_MODAL:
      return {
        ...state,
        newDeploymentsModal: {
          ...state.newDeploymentsModal,
          visible: true,
        },
      };
    // hide DeploymentsModal
    case actionTypes.HIDE_USING_DEPLOYMENTS_MODAL:
      return {
        ...state,
        newDeploymentsModal: {
          ...state.newDeploymentsModal,
          visible: false,
        },
      };

    // NEW TEMPLATE MODAL
    case actionTypes.HIDE_NEW_TEMPLATE_MODAL: // hide new template modal
    case actionTypes.SHOW_NEW_TEMPLATE_MODAL: // show new template modal
      return {
        ...state,
        newTemplateModal: {
          ...state.newTemplateModal,
          visible: action.newTemplateModalVisible,
        },
      };

    // DRAWER
    // show drawer
    case actionTypes.SHOW_OPERATOR_DRAWER:
      return {
        ...state,
        operatorDrawer: { ...state.operatorDrawer, ...action.operatorDrawer },
      };
    // hide drawer
    case actionTypes.HIDE_OPERATOR_DRAWER:
      return {
        ...state,
        operatorDrawer: {
          ...state.operatorDrawer,
          visible: action.drawerVisible,
        },
      };

    // OPERATOR RESULTS
    case actionTypes.SHOW_OPERATOR_RESULTS: // show operator results
    case actionTypes.HIDE_OPERATOR_RESULTS: // hide operator results
      return {
        ...state,
        operatorResults: {
          ...state.operatorResults,
          showOperatorResults: action.showOperatorResults,
        },
      };

    // TASKS TABLE
    case actionTypes.TASKS_TABLE_LOADING_DATA: // loading data
    case actionTypes.TASKS_TABLE_DATA_LOADED: // data loaded
      return {
        ...state,
        tasksTable: { ...state.tasksTable, loading: action.tasksTableLoading },
      };

    // PROJECTS TABLE
    case actionTypes.PROJECTS_TABLE_LOADING_DATA: // loading data
    case actionTypes.PROJECTS_TABLE_DATA_LOADED: // data loaded
      return {
        ...state,
        newProjectModal: {
          ...state.newProjectModal,
          modalValidateStatus: null,
          errorMessage: null,
        },
        projectsTable: {
          ...state.projectsTable,
          loading: action.projectsTableLoading,
        },
      };

    // PROJECT NAME
    case actionTypes.PROJECT_NAME_LOADING_DATA: // loading data
    case actionTypes.PROJECT_NAME_DATA_LOADED: // data loaded
      return {
        ...state,
        projectName: {
          ...state.projectName,
          loading: action.projectNameLoading,
        },
      };

    // PROJECT EDIT NAME
    case actionTypes.PROJECT_EDIT_NAME_LOADING_DATA: // loading data
    case actionTypes.PROJECT_EDIT_NAME_DATA_LOADED: // data loaded
      return {
        ...state,
        projectEditName: {
          ...state.projectEditName,
          loading: action.projectEditNameLoading,
        },
      };

    // TASKS MENU
    case actionTypes.TASKS_MENU_LOADING_DATA: // loading data
    case actionTypes.TASKS_MENU_DATA_LOADED: // data loaded
      return {
        ...state,
        tasksMenu: {
          ...state.tasksMenu,
          loading: action.tasksMenuLoading,
        },
      };

    // EXPERIMENTS TABS
    case actionTypes.EXPERIMENTS_TABS_LOADING_DATA: // loading data
    case actionTypes.EXPERIMENTS_TABS_DATA_LOADED: // data loaded
      return {
        ...state,
        newExperimentModal: {
          ...state.newExperimentModal,
          modalValidateStatus: null,
          errorMessage: null,
        },
        experimentsTabs: {
          ...state.experimentsTabs,
          loading: action.experimentsTabsLoading,
        },
      };

    // EXPERIMENT TRAINING
    case actionTypes.EXPERIMENT_TRAINING_LOADING_DATA: // loading data
    case actionTypes.EXPERIMENT_TRAINING_DATA_LOADED: // data loaded
      return {
        ...state,
        experimentTraining: {
          ...state.experimentTraining,
          loading: action.experimentTrainingLoading,
        },
      };

    // EXPERIMENT DELETE TRAINING
    case actionTypes.EXPERIMENT_DELETE_TRAINING_LOADING_DATA: // loading data
    case actionTypes.EXPERIMENT_DELETE_TRAINING_DATA_LOADED: // data loaded
      return {
        ...state,
        experimentTraining: {
          ...state.experimentTraining,
          deleteLoading: action.experimentDeleteTrainingLoading,
        },
      };

    // EXPERIMENT NAME
    case actionTypes.EXPERIMENT_NAME_LOADING_DATA: // loading data
    case actionTypes.EXPERIMENT_NAME_DATA_LOADED: // data loaded
      return {
        ...state,
        experimentName: {
          ...state.experimentName,
          loading: action.experimentNameLoading,
        },
      };

    // EXPERIMENT OPERATORS
    case actionTypes.EXPERIMENT_OPERATORS_LOADING_DATA: // loading data
    case actionTypes.EXPERIMENT_OPERATORS_DATA_LOADED: // data loaded
      return {
        ...state,
        experimentOperators: {
          ...state.experimentOperators,
          loading: action.experimentOperatorsLoading,
        },
      };

    // DATASETS LIST
    case actionTypes.DATASETS_LIST_LOADING_DATA: // loading data
    case actionTypes.DATASETS_LIST_DATA_LOADED: // data loaded
      return {
        ...state,
        datasetsList: {
          ...state.datasetsList,
          loading: action.datasetsListLoading,
        },
      };

    // DATASET OPERATOR
    case actionTypes.DATASET_OPERATOR_LOADING_DATA: // loading data
    case actionTypes.DATASET_OPERATOR_DATA_LOADED: // data loaded
      return {
        ...state,
        datasetOperator: {
          ...state.datasetOperator,
          loading: action.datasetOperatorLoading,
        },
      };

    // OPERATOR PARAMETER

    case actionTypes.OPERATOR_PARAMETER_LOADING_DATA: // loading data
    case actionTypes.OPERATOR_PARAMETER_DATA_LOADED: // data loaded
      return {
        ...state,
        operatorParameter: {
          ...state.operatorParameter,
          loading: action.operatorParameterLoading,
        },
      };

    // OPERATOR RESULTS
    case actionTypes.OPERATOR_RESULTS_LOADING_DATA: // loading data
    case actionTypes.OPERATOR_RESULTS_DATA_LOADED: // data loaded
      return {
        ...state,
        operatorResults: {
          ...state.operatorResults,
          loading: action.operatorResultsLoading,
        },
      };

    // OPERATOR RESULTS DOWNLOAD DATASET
    case actionTypes.OPERATOR_RESULTS_DOWNLOAD_DATASET_LOADING: // loading data
    case actionTypes.OPERATOR_RESULTS_DOWNLOAD_DATASET_LOADED: // data loaded
      return {
        ...state,
        operatorResults: {
          ...state.operatorResults,
          downloadDatasetLoading: action.downloadDatasetLoading,
        },
      };

    // OPERATOR METRICS
    // loading data
    case actionTypes.OPERATOR_METRICS_LOADING_DATA:
      return {
        ...state,
        operatorMetrics: {
          ...state.operatorMetrics,
          loading: true,
        },
      };
    // data loaded
    case actionTypes.OPERATOR_METRICS_DATA_LOADED:
      return {
        ...state,
        operatorMetrics: {
          ...state.operatorMetrics,
          loading: false,
        },
      };

    // TEMPLATE
    case actionTypes.TEMPLATE_LOADING_DATA: // loading data
    case actionTypes.TEMPLATE_DATA_LOADED: // data loaded
      return {
        ...state,
        template: {
          ...state.template,
          loading: action.templateLoading,
        },
      };

    // IMPLANTED EXPERIMENT
    case actionTypes.IMPLANTED_EXPERIMENTS_LOADING_DATA: // loading data
    case actionTypes.IMPLANTED_EXPERIMENTS_DATA_LOADED: // data loaded
      return {
        ...state,
        implantedExperiments: {
          ...state.implantedExperiments,
          loading: action.implantedExperimentsLoading,
        },
      };

    // DATA VIEW MODAL
    case actionTypes.SHOW_DATA_VIEW_MODAL: // show data view modal
    case actionTypes.HIDE_DATA_VIEW_MODAL: // hide data view modal
      return {
        ...state,
        dataViewModal: {
          ...state.dataViewModal,
          isVisible: action.isVisible,
        },
      };
    // DATA VIEW MODAL LOADING
    case actionTypes.LOADING_DATA_VIEW_MODAL: // show data view modal
      return {
        ...state,
        dataViewModal: {
          ...state.dataViewModal,
          loading: action.loading,
        },
      };

    // EXPERIMENT INFERENCE MODAL
    case actionTypes.SHOW_EXPERIMENT_INFERENCE_MODAL:
      return {
        ...state,
        inferenceTestResultModal: {
          ...state.inferenceTestResultModal,
          visible: true,
        },
      };
    case actionTypes.HIDE_EXPERIMENT_INFERENCE_MODAL:
      return {
        ...state,
        inferenceTestResultModal: {
          ...state.inferenceTestResultModal,
          visible: false,
        },
      };
    case actionTypes.EXPERIMENT_INFERENCE_MODAL_LOADING_DATA:
    case actionTypes.EXPERIMENT_INFERENCE_MODAL_DATA_LOADED:
      return {
        ...state,
        inferenceTestResultModal: {
          ...state.inferenceTestResultModal,
          loading: action.inferenceTestResultModalLoading,
        },
      };

    // INFERENCE LOGS DRAWER
    case actionTypes.SHOW_INFERENCE_LOGS_DRAWER:
      return {
        ...state,
        inferenceLogsDrawer: {
          ...state.inferenceLogsDrawer,
          ...action.inferenceLogsDrawer,
        },
      };
    case actionTypes.HIDE_INFERENCE_LOGS_DRAWER:
      return {
        ...state,
        inferenceLogsDrawer: {
          ...state.inferenceLogsDrawer,
          visible: action.drawerVisible,
        },
      };
    case actionTypes.INFERENCE_LOGS_DRAWER_LOADING_DATA:
    case actionTypes.INFERENCE_LOGS_DRAWER_DATA_LOADED:
      return {
        ...state,
        inferenceLogsDrawer: {
          ...state.inferenceLogsDrawer,
          loading: action.inferenceLogsDrawerLoading,
        },
      };
    //SAVE OFFSET OF FLOW AREA
    case actionTypes.SAVE_FLOW_TRANSFORM:
      return {
        ...state,
        flowTransform: action.transform,
      };
    //OPERATORS LOADING
    case actionTypes.LOADING_OPERATOR_DEPENDENCIES:
      return {
        ...state,
        operatorsDependencies: {
          ...state.operatorsDependencies,
          loading: action.loading,
          uuid: action.uuid,
        },
      };
    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default uiReducer;
