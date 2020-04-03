// ACTION TYPES
import actionTypes from './actionTypes';

// INITIAL STATE
const initialState = {
  newProjectModal: { visible: false },
  newExperimentModal: { visible: false },
  drawer: { visible: false, isDataset: false, title: 'Título Drawer' },
  tasksTable: { loading: false },
  projectsTable: { loading: false },
  projectName: { loading: false },
  componentsMenu: { loading: false },
  experimentsTabs: { loading: false },
  experimentName: { loading: false },
  experimentOperators: { loading: false },
  datasetOperator: { loading: false },
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
        },
      };
    // hide new project modal
    case actionTypes.HIDE_NEW_PROJECT_MODAL:
      return {
        ...state,
        newProjectModal: {
          ...state.newProjectModal,
          visible: action.newProjectModalVisible,
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

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default ui;
