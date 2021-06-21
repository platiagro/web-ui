import { PROJECTS_TYPES } from 'store/projects';
import { EXPERIMENTS_TYPES } from 'store/projects/experiments';
import experimentRunsActionTypes from 'store/projects/experiments/experimentRuns/actionTypes';

import actionTypes from './actionTypes';

const initialState = {
  compareResultsModal: {
    isVisible: false,
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
  newDeploymentModal: { visible: false, loading: false },
  usingDeploymentsModal: { visible: false },
  operatorDrawer: {
    visible: false,
    isDataset: false,
    title: 'Título Drawer',
  },
  inferenceLogsDrawer: {
    isDataset: false,
    title: 'Título Drawer',
    visible: false,
  },
  template: { loading: false },
  tasksTable: { loading: false },
  tasksMenu: { loading: false },
  deploymentsTabs: {
    loading: false,
    modalVisible: false,
    deploymentOperatorsLoading: false,
  },
  experimentOperators: { loading: false },
  experimentTraining: { loading: false },
  datasetsList: { loading: false },
  operatorResults: {
    showOperatorResults: false,
  },
  prepareDeploymentsModal: { loading: false, visible: false },
  dataViewModal: { isVisible: false, loading: false },
  flowTransform: { x: 0, y: 0, zoom: 1 },
  operatorsDependencies: {
    loading: false,
  },
  prepareDeployments: { loading: false },
  externalDatasetHelperModal: { visible: false },
  logsPanel: { isShowing: false },
};

const uiReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    case actionTypes.VISIBILITY_COMPARE_RESULTS_MODAL:
      return {
        ...state,
        compareResultsModal: {
          ...state.compareResultsModal,
          isVisible: action.isVisible,
        },
      };

    case PROJECTS_TYPES.CREATE_PROJECT_FAIL:
    case PROJECTS_TYPES.UPDATE_PROJECT_FAIL:
      return {
        ...state,
        newProjectModal: {
          ...state.newProjectModal,
          modalValidateStatus: 'error',
          errorMessage: action.payload.errorMessage,
        },
      };

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

    case EXPERIMENTS_TYPES.CREATE_EXPERIMENT_FAIL:
      return {
        ...state,
        newExperimentModal: {
          ...state.newExperimentModal,
          modalValidateStatus: 'error',
          errorMessage: action.errorMessage,
        },
      };

    case actionTypes.SHOW_NEW_EXPERIMENT_MODAL:
      return {
        ...state,
        newExperimentModal: {
          ...state.newExperimentModal,
          visible: action.newExperimentModalVisible,
        },
      };

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

    case actionTypes.SHOW_USING_DEPLOYMENTS_MODAL:
      return {
        ...state,
        usingDeploymentsModal: {
          ...state.usingDeploymentsModal,
          visible: true,
        },
      };

    case actionTypes.HIDE_USING_DEPLOYMENTS_MODAL:
      return {
        ...state,
        usingDeploymentsModal: {
          ...state.usingDeploymentsModal,
          visible: false,
        },
      };

    case actionTypes.HIDE_NEW_TEMPLATE_MODAL:
    case actionTypes.SHOW_NEW_TEMPLATE_MODAL:
      return {
        ...state,
        newTemplateModal: {
          ...state.newTemplateModal,
          visible: action.newTemplateModalVisible,
        },
      };

    case actionTypes.SHOW_OPERATOR_DRAWER:
      return {
        ...state,
        operatorDrawer: { ...state.operatorDrawer, ...action.operatorDrawer },
      };

    case actionTypes.HIDE_OPERATOR_DRAWER:
      return {
        ...state,
        operatorDrawer: {
          ...state.operatorDrawer,
          visible: action.drawerVisible,
        },
      };

    case actionTypes.SHOW_OPERATOR_RESULTS:
    case actionTypes.HIDE_OPERATOR_RESULTS:
      return {
        ...state,
        operatorResults: {
          ...state.operatorResults,
          showOperatorResults: action.showOperatorResults,
        },
      };

    case PROJECTS_TYPES.CREATE_PROJECT_REQUEST:
      return {
        ...state,
        newProjectModal: {
          ...state.newProjectModal,
          modalValidateStatus: null,
          errorMessage: null,
        },
      };

    case actionTypes.TASKS_MENU_LOADING_DATA:
    case actionTypes.TASKS_MENU_DATA_LOADED:
      return {
        ...state,
        tasksMenu: {
          ...state.tasksMenu,
          loading: action.tasksMenuLoading,
        },
      };

    case actionTypes.DEPLOYMENT_OPERATORS_LOADING_DATA:
    case actionTypes.DEPLOYMENT_OPERATORS_DATA_LOADED:
      return {
        ...state,
        deploymentsTabs: {
          ...state.deploymentsTabs,
          deploymentOperatorsLoading: action.deploymentOperatorsLoading,
        },
      };

    case actionTypes.DEPLOYMENTS_TABS_HIDE_MODAL:
    case actionTypes.DEPLOYMENTS_TABS_SHOW_MODAL:
      return {
        ...state,
        deploymentsTabs: {
          ...state.deploymentsTabs,
          modalVisible: action.visible,
          modalErrorMessage: null,
          modalValidateStatus: null,
        },
      };

    case experimentRunsActionTypes.GET_EXPERIMENT_RUN_STATUS_SUCCESS:
      return {
        ...state,
        experimentTraining: {
          ...state.experimentTraining,
          loading: action.experimentIsRunning,
        },
      };

    case actionTypes.EXPERIMENT_TRAINING_LOADING_DATA:
    case actionTypes.EXPERIMENT_TRAINING_DATA_LOADED:
      return {
        ...state,
        experimentTraining: {
          ...state.experimentTraining,
          loading: action.experimentTrainingLoading,
        },
      };

    case actionTypes.EXPERIMENT_DELETE_TRAINING_LOADING_DATA:
    case actionTypes.EXPERIMENT_DELETE_TRAINING_DATA_LOADED:
      return {
        ...state,
        experimentTraining: {
          ...state.experimentTraining,
          deleteLoading: action.experimentDeleteTrainingLoading,
        },
      };

    case actionTypes.EXPERIMENT_OPERATORS_LOADING_DATA:
    case actionTypes.EXPERIMENT_OPERATORS_DATA_LOADED:
      return {
        ...state,
        experimentOperators: {
          ...state.experimentOperators,
          loading: action.experimentOperatorsLoading,
        },
      };

    case actionTypes.TEMPLATE_LOADING_DATA:
    case actionTypes.TEMPLATE_DATA_LOADED:
      return {
        ...state,
        template: {
          ...state.template,
          loading: action.templateLoading,
        },
      };

    case actionTypes.SHOW_DATA_VIEW_MODAL:
    case actionTypes.HIDE_DATA_VIEW_MODAL:
      return {
        ...state,
        dataViewModal: {
          ...state.dataViewModal,
          isVisible: action.isVisible,
        },
      };

    case actionTypes.LOADING_DATA_VIEW_MODAL:
      return {
        ...state,
        dataViewModal: {
          ...state.dataViewModal,
          loading: action.loading,
        },
      };

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

    case actionTypes.SAVE_FLOW_TRANSFORM:
      return {
        ...state,
        flowTransform: action.transform,
      };

    case actionTypes.LOADING_OPERATOR_DEPENDENCIES:
      return {
        ...state,
        operatorsDependencies: {
          ...state.operatorsDependencies,
          loading: action.loading,
          uuid: action.uuid,
        },
      };

    case actionTypes.HIDE_PREPARE_DEPLOYMENTS_MODAL:
    case actionTypes.SHOW_PREPARE_DEPLOYMENTS_MODAL:
      return {
        ...state,
        prepareDeploymentsModal: {
          ...state.prepareDeploymentsModal,
          visible: action.prepareDeploymentsModalVisible,
        },
      };

    case actionTypes.SHOW_DEPLOYMENT_MODAL:
    case actionTypes.HIDE_DEPLOYMENT_MODAL:
      return {
        ...state,
        newDeploymentModal: {
          ...state.newDeploymentModal,
          visible: action.visible,
        },
      };

    case actionTypes.DEPLOYMENT_MODAL_START_LOADING:
    case actionTypes.DEPLOYMENT_MODAL_END_LOADING:
      return {
        ...state,
        newDeploymentModal: {
          ...state.newDeploymentModal,
          loading: action.payload,
        },
      };

    case actionTypes.SHOW_EXTERNAL_DATASET_HELPER_MODAL:
    case actionTypes.HIDE_EXTERNAL_DATASET_HELPER_MODAL:
      return {
        ...state,
        externalDatasetHelperModal: {
          ...state.externalDatasetHelperModal,
          visible: action.visible,
        },
      };

    case actionTypes.PREPARE_DEPLOYMENTS_LOADING_DATA:
    case actionTypes.PREPARE_DEPLOYMENTS_DATA_LOADED:
      return {
        ...state,
        prepareDeployments: {
          ...state.prepareDeployments,
          loading: action.prepareDeploymentsLoading,
        },
      };

    case actionTypes.SHOW_LOGS_PANEL:
    case actionTypes.HIDE_LOGS_PANEL:
      return {
        ...state,
        logsPanel: {
          ...state.logsPanel,
          isShowing: action.isShowing,
        },
      };

    default:
      return state;
  }
};

export default uiReducer;
