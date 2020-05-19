// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  newProjectModal: { visible: false, title: 'Novo Projeto', record: undefined },
  newExperimentModal: { visible: false },
  newTemplateModal: { visible: false },
  drawer: { visible: false, isDataset: false, title: 'Título Drawer' },
  template: { loading: false },
  tasksTable: { loading: false },
  projectsTable: { loading: false },
  projectName: { loading: false },
  componentsMenu: { loading: false },
  experimentsTabs: { loading: false },
  experimentName: { loading: false },
  experimentOperators: { loading: false },
  experimentTarget: { loading: false },
  experimentTraining: { loading: false },
  datasetOperator: { loading: false },
  operatorParameter: { loading: false },
  operatorResults: { loading: false },
};

/**
 * ui reducer
 */
const ui = (state = initialState, action) => {
  switch (action.type) {
    // NEW PROJECT MODAL
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
        },
      };

    // NEW EXPERIMENT MODAL
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
        },
      };

    // NEW TEMPLATE MODAL
    // show new template modal
    case actionTypes.SHOW_NEW_TEMPLATE_MODAL:
      return {
        ...state,
        newTemplateModal: {
          ...state.newTemplateModal,
          visible: action.newTemplateModalVisible,
        },
      };
    // hide new template modal
    case actionTypes.HIDE_NEW_TEMPLATE_MODAL:
      return {
        ...state,
        newTemplateModal: {
          ...state.newTemplateModal,
          visible: action.newTemplateModalVisible,
        },
      };

    // DRAWER
    // show drawer
    case actionTypes.SHOW_DRAWER:
      return {
        ...state,
        drawer: { ...state.drawer, ...action.drawer },
      };
    // hide drawer
    case actionTypes.HIDE_DRAWER:
      return {
        ...state,
        drawer: {
          ...state.drawer,
          visible: action.drawerVisible,
        },
      };

    // TASKS TABLE
    // loading data
    case actionTypes.TASKS_TABLE_LOADING_DATA:
      return {
        ...state,
        tasksTable: { ...state.tasksTable, loading: action.tasksTableLoading },
      };
    // data loaded
    case actionTypes.TASKS_TABLE_DATA_LOADED:
      return {
        ...state,
        tasksTable: { ...state.tasksTable, loading: action.tasksTableLoading },
      };

    // PROJECTS TABLE
    // loading data
    case actionTypes.PROJECTS_TABLE_LOADING_DATA:
      return {
        ...state,
        projectsTable: {
          ...state.projectsTable,
          loading: action.projectsTableLoading,
        },
      };
    // data loaded
    case actionTypes.PROJECTS_TABLE_DATA_LOADED:
      return {
        ...state,
        projectsTable: {
          ...state.projectsTable,
          loading: action.projectsTableLoading,
        },
      };

    // PROJECT NAME
    // loading data
    case actionTypes.PROJECT_NAME_LOADING_DATA:
      return {
        ...state,
        projectName: {
          ...state.projectName,
          loading: action.projectNameLoading,
        },
      };
    // data loaded
    case actionTypes.PROJECT_NAME_DATA_LOADED:
      return {
        ...state,
        projectName: {
          ...state.projectName,
          loading: action.projectNameLoading,
        },
      };

    // COMPONENTS MENU
    // loading data
    case actionTypes.COMPONENTS_MENU_LOADING_DATA:
      return {
        ...state,
        componentsMenu: {
          ...state.componentsMenu,
          loading: action.componentsMenuLoading,
        },
      };
    // data loaded
    case actionTypes.COMPONENTS_MENU_DATA_LOADED:
      return {
        ...state,
        componentsMenu: {
          ...state.componentsMenu,
          loading: action.componentsMenuLoading,
        },
      };

    // EXPERIMENTS TABS
    // loading data
    case actionTypes.EXPERIMENTS_TABS_LOADING_DATA:
      return {
        ...state,
        experimentsTabs: {
          ...state.experimentsTabs,
          loading: action.experimentsTabsLoading,
        },
      };
    // data loaded
    case actionTypes.EXPERIMENTS_TABS_DATA_LOADED:
      return {
        ...state,
        experimentsTabs: {
          ...state.experimentsTabs,
          loading: action.experimentsTabsLoading,
        },
      };

    // EXPERIMENT TARGET
    // loading data
    case actionTypes.EXPERIMENT_TARGET_LOADING_DATA:
      return {
        ...state,
        experimentTarget: {
          ...state.experimentTarget,
          loading: action.experimentTargetLoading,
        },
      };
    // data loaded
    case actionTypes.EXPERIMENT_TARGET_DATA_LOADED:
      return {
        ...state,
        experimentTarget: {
          ...state.experimentTarget,
          loading: action.experimentTargetLoading,
        },
      };

    // EXPERIMENT TRAINING
    // loading data
    case actionTypes.EXPERIMENT_TRAINING_LOADING_DATA:
      return {
        ...state,
        experimentTraining: {
          ...state.experimentTraining,
          loading: action.experimentTrainingLoading,
        },
      };
    // data loaded
    case actionTypes.EXPERIMENT_TRAINING_DATA_LOADED:
      return {
        ...state,
        experimentTraining: {
          ...state.experimentTraining,
          loading: action.experimentTrainingLoading,
        },
      };

    // EXPERIMENT NAME
    // loading data
    case actionTypes.EXPERIMENT_NAME_LOADING_DATA:
      return {
        ...state,
        experimentName: {
          ...state.experimentName,
          loading: action.experimentNameLoading,
        },
      };
    // data loaded
    case actionTypes.EXPERIMENT_NAME_DATA_LOADED:
      return {
        ...state,
        experimentName: {
          ...state.experimentName,
          loading: action.experimentNameLoading,
        },
      };

    // EXPERIMENT OPERATORS
    // loading data
    case actionTypes.EXPERIMENT_OPERATORS_LOADING_DATA:
      return {
        ...state,
        experimentOperators: {
          ...state.experimentOperators,
          loading: action.experimentOperatorsLoading,
        },
      };
    // data loaded
    case actionTypes.EXPERIMENT_OPERATORS_DATA_LOADED:
      return {
        ...state,
        experimentOperators: {
          ...state.experimentOperators,
          loading: action.experimentOperatorsLoading,
        },
      };

    // DATASET OPERATOR
    // loading data
    case actionTypes.DATASET_OPERATOR_LOADING_DATA:
      return {
        ...state,
        datasetOperator: {
          ...state.datasetOperator,
          loading: action.datasetOperatorLoading,
        },
      };
    // data loaded
    case actionTypes.DATASET_OPERATOR_DATA_LOADED:
      return {
        ...state,
        datasetOperator: {
          ...state.datasetOperator,
          loading: action.datasetOperatorLoading,
        },
      };

    // OPERATOR PARAMETER
    // loading data
    case actionTypes.OPERATOR_PARAMETER_LOADING_DATA:
      return {
        ...state,
        operatorParameter: {
          ...state.operatorParameter,
          loading: action.operatorParameterLoading,
        },
      };
    // data loaded
    case actionTypes.OPERATOR_PARAMETER_DATA_LOADED:
      return {
        ...state,
        operatorParameter: {
          ...state.operatorParameter,
          loading: action.operatorParameterLoading,
        },
      };

    // OPERATOR RESULTS
    // loading data
    case actionTypes.OPERATOR_RESULTS_LOADING_DATA:
      return {
        ...state,
        operatorResults: {
          ...state.operatorResults,
          loading: action.operatorResultsLoading,
        },
      };
    // data loaded
    case actionTypes.OPERATOR_RESULTS_DATA_LOADED:
      return {
        ...state,
        operatorResults: {
          ...state.operatorResults,
          loading: action.operatorResultsLoading,
        },
      };

    // TEMPLATE
    // loading data
    case actionTypes.TEMPLATE_LOADING_DATA:
      return {
        ...state,
        template: {
          ...state.template,
          loading: action.templateLoading,
        },
      };
    // data loaded
    case actionTypes.TEMPLATE_DATA_LOADED:
      return {
        ...state,
        template: {
          ...state.template,
          loading: action.templateLoading,
        },
      };

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default ui;
