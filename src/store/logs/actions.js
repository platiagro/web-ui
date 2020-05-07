// ACTION TYPES
import actionTypes from './actionTypes';
import actionTypesUi from '../ui/actionTypes';

// SERVICES
import logsApi from 'services/LogsApi';

//ACTIONS
import { showDrawer } from '../ui/actions';

// ACTIONS
/**
 * get train experiment status request action
 * @returns {Function}
 */
export const getDeployExperimentLogs = (deployId) => (dispatch) => {
  logsApi.getDeployExperimentLogs(deployId).then((res) => {
    dispatch({
      type: actionTypes.GET_DEPLOYMENT_LOGS,
      payload: res.data.log,
    });
    dispatch(showDrawer('Logs', false));
  });
};
