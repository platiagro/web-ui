import {
  EXPERIMENTS_SET_ACTIVE_KEY,
  EXPERIMENTS_ADD_EXPERIMENT,
} from '../actions/experimentsTabsActions';

const initalState = {
  activeKey: null,
};

export default function experimentsTabsReducer(state = initalState, action) {
  switch (action.type) {
    case EXPERIMENTS_SET_ACTIVE_KEY:
      return { activeKey: action.activeKey };
    case EXPERIMENTS_ADD_EXPERIMENT:
      return { activeKey: action.uuid };
    default:
      return state;
  }
}
