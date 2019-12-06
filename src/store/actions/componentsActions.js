import * as componentsServices from '../../services/componentsApi';

export const ADD_COMPONENT = 'ADD_COMPONENT';
export const DELETE_COMPONENT = 'DELETE_COMPONENT';
export const FETCH_COMPONENTS_STARTED = 'FETCH_COMPONENTS_STARTED';
export const FETCH_COMPONENTS = 'FETCH_COMPONENTS';
export const TOGGLE_MODAL_VISIBILITY = 'MODAL_VISIBILITY';

const dispatchAdd = () => {
  return {
    type: ADD_COMPONENT,
  };
};

export const addComponent = (name, history) => {
  return (dispatch) => {
    return componentsServices
      .createComponent(name)
      .then((response) => {
        dispatch(dispatchAdd());
        if (response) {
          history.push(`/components/${response.data.payload.uuid}`);
        }
      })
      .catch((error) => {
        throw error;
      });
  };
};

const dispatchDelete = (id) => {
  return {
    type: DELETE_COMPONENT,
    id,
  };
};

export const deleteComponent = (id) => {
  return (dispatch) => {
    return componentsServices
      .deleteComponent(id)
      .then((response) => {
        if (response) {
          dispatch(dispatchDelete(id));
        }
      })
      .catch((error) => {
        throw error;
      });
  };
};

const fetchStarted = () => {
  return {
    type: FETCH_COMPONENTS_STARTED,
  };
};

const dispatchFetchComponents = (components) => {
  return {
    type: FETCH_COMPONENTS,
    components,
  };
};

export const fetchComponents = () => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return componentsServices
      .getAllComponents()
      .then((response) => {
        dispatch(dispatchFetchComponents(response.data.payload));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL_VISIBILITY,
  };
};
