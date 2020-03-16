// ACTION TYPES
import actionTypes from './actionTypes';

// MOCKS
// experiment flow tasks mock
import flowMock from '../../components/Content/ProjectContent/Experiment/ExperimentFlow/_/_flowMock';
// task mock
const taskMock = {
  componentTitle: 'Tarefa 17',
  key: 'tarefa17',
  uuid: 'tarefa17',
  icon: 'database',
  iconTheme: 'filled',
  status: '',
  settedUp: false,
  selected: false,
};

// ACTIONS
/**
 * fetch experiment flow tasks action
 * @param {string} experimentUuid
 * @returns {type, flowTasks}
 */
export const fetchFlowTasks = (experimentUuid) => ({
  type: actionTypes.FETCH_FLOW_TASKS,
  flowTasks: flowMock,
});

/**
 * add experiment flow task action
 * @param {string} experimentUuid
 * @param {Object} task
 * @returns {type, flowTasks}
 */
export const addFlowTask = (experimentUuid, task) => ({
  type: actionTypes.ADD_FLOW_TASK,
  flowTasks: [...flowMock, taskMock],
});

/**
 * remove experiment flow task action
 * @param {string} experimentUuid
 * @param {string} taskUuid
 * @returns {type, flowTasks}
 */
export const removeFlowTask = (experimentUuid, taskUuid) => ({
  type: actionTypes.REMOVE_FLOW_TASK,
  flowTasks: flowMock.filter((task) => task.uuid !== taskUuid),
});

/**
 * set experiment flow task params action
 * @param {string} experimentUuid
 * @param {string} taskUuid
 * @param {Object} taskParams
 * @returns {type, flowTasks}
 */
export const setFlowTaskParams = (experimentUuid, taskUuid, taskParams) => ({
  type: actionTypes.SET_FLOW_TASK_PARAMS,
  flowTasks: flowMock.map((task) =>
    task.uuid !== 'tarefa07' ? task : { ...task, settedUp: true }
  ),
});
