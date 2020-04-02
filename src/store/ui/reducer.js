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

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default ui;
