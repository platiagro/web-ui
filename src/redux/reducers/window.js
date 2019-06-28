import { ADAPT_LAYOUT, TOGGLE_DRAWER } from '../actionTypes';

const initialState = {
  drawer: {
    dismissible: true,
    open: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADAPT_LAYOUT:
      const dismissible = action.payload.width > 920 ? false : true;
      return {
        ...state,
        drawer: {
          ...state.drawer,
          dismissible: dismissible,
        }
      };
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawer: {
          ...state.drawer,
          open: !state.drawer.open,
        }
      };
    default:
      return state;
  }
};
