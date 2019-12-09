import * as componentsServices from '../../services/componentsApi';

export const COMPONENTS_ADD = 'COMPONENTS_ADD';
export const COMPONENTS_DELETE = 'COMPONENTS_DELETE';
export const COMPONENTS_FETCH_STARTED = 'COMPONENTS_FETCH_STARTED';
export const COMPONENTS_FETCH = 'COMPONENTS_FETCH';
export const COMPONENTS_TOGGLE_MODAL = 'COMPONENTS_TOGGLE_MODAL';

const dispatchAdd = () => {
  return {
    type: COMPONENTS_ADD,
  };
};

export const addComponent = (name, history) => {
  return (dispatch) => {
    return componentsServices
      .createComponent(name)
      .then((response) => {
        if (response) {
          dispatch(dispatchAdd());
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
    type: COMPONENTS_DELETE,
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
    type: COMPONENTS_FETCH_STARTED,
  };
};

const dispatchFetchComponents = (components) => {
  return {
    type: COMPONENTS_FETCH,
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
    type: COMPONENTS_TOGGLE_MODAL,
  };
};
