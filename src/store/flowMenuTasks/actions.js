// ACTION TYPES
import actionTypes from './actionTypes';

// MOCKS
// flow menu tasks mock
import flowMenuTasksMock from '../../components/Content/ProjectContent/ComponentsMenuBlock/_/_componentsMock';

// ACTIONS
/**
 * fetch experiment flow menu tasks action
 * @returns {type, flowMenuTasks}
 */
const fetchFlowMenuTasks = () => ({
  type: actionTypes.FETCH_FLOW_MENU_TASKS,
  flowMenuTasks: flowMenuTasksMock,
});

// EXPORT DEFAULT
export default fetchFlowMenuTasks;
