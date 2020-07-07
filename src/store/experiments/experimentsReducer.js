// UI LIBS
import { message } from 'antd';

// ACTION TYPES
import actionTypes from './actionTypes';
import experimentActionTypes from '../experiment/actionTypes';

// UTILS
import utils from '../../utils';

// INITIAL STATE
const initialState = [];

/**
 * experiments reducer
 */
const experimentsReducer = (state = initialState, action = undefined) => {
  switch (action.type) {
    //reset initial fetch of experiments
    case actionTypes.CLEAR_ALL_EXPERIMENTS:
      return [];
    // SUCCESS
    // experiments
    // fetch experiments success
    case actionTypes.FETCH_EXPERIMENTS_SUCCESS:
      return [...action.experiments];
    // organize experiments success
    case actionTypes.ORGANIZE_EXPERIMENTS_SUCCESS:
      return [
        ...utils.organizeExperiments(
          state,
          action.dragExperimentId,
          action.hoverExperimentId
        ),
      ];

    // experiment
    // create experiment success
    case experimentActionTypes.CREATE_EXPERIMENT_SUCCESS:
      return [...state, action.experiment];
    // edit experiment name success
    case experimentActionTypes.EDIT_EXPERIMENT_NAME_SUCCESS:
      return [
        ...state.map((experiment) =>
          experiment.uuid !== action.experiment.uuid
            ? experiment
            : { ...experiment, name: action.experiment.name }
        ),
      ];
    // delete experiment success
    case experimentActionTypes.DELETE_EXPERIMENT_SUCCESS:
      return [...utils.deleteExperiment(state, action.experimentId)];

    // // // // // // //

    // FAIL
    // experiments
    // fetch experiments fail
    case actionTypes.FETCH_EXPERIMENTS_FAIL:
      return message.error(action.errorMessage);
    // organize experiments fail
    case actionTypes.ORGANIZE_EXPERIMENTS_FAIL:
      return message.error(action.errorMessage);

    // // // // // // //

    // DEFAULT
    default:
      return state;
  }
};

// EXPORT
export default experimentsReducer;
