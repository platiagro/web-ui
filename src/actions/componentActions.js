import uuidv4 from 'uuid/v4';
import { message } from 'antd';
import * as componentsServices from '../services/componentsApi';
import * as jupyterServices from '../services/jupyterApi';

export const FETCH_COMPONENT_DETAIL_STARTED = 'FETCH_COMPONENT_DETAIL_STARTED';
export const FETCH_COMPONENT_DETAIL = 'FETCH_COMPONENT_DETAIL';
export const FETCH_JUPYTER_NAMESPACES = 'FETCH_JUPYTER_NAMESPACES';
export const UPDATE_COMPONENT_FILE = 'UPDATE_COMPONENT_FILE';
export const UPDATE_COMPONENT_PARAMS = 'UPDATE_COMPONENT_PARAMS';
export const UPDATE_COMPONENT_NAME = 'UPDATE_COMPONENT_NAME';

const fetchStarted = () => {
  return {
    type: FETCH_COMPONENT_DETAIL_STARTED,
  };
};

const setComponentDetail = (detail) => {
  return {
    type: FETCH_COMPONENT_DETAIL,
    detail,
  };
};

export const getComponentDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return componentsServices
      .getComponent(id)
      .then((response) => {
        if (response) {
          const details = { ...response.data.payload };
          if (!details.parameters) {
            details.parameters = [];
          }
          if (details.file) {
            const fileDetails = { uid: uuidv4(), status: 'done' };
            fileDetails.name = details.file.split('/').pop();
            fileDetails.path = `components/${details.uuid}/${fileDetails.name}`;
            fileDetails.url = `${componentsServices.downloadUrl}/${details.uuid}/${fileDetails.name}`;
            details.file = fileDetails;
          } else {
            details.file = null;
          }
          dispatch(setComponentDetail(details));
        }
      })
      .catch((error) => {
        throw error;
      });
  };
};

const setNamespaces = (namespaces) => {
  return {
    type: FETCH_JUPYTER_NAMESPACES,
    namespaces,
  };
};

export const getNamespaces = () => {
  return (dispatch) => {
    return jupyterServices
      .getNamespaces()
      .then((response) => {
        if (response) {
          dispatch(setNamespaces(response.data.namespaces));
        }
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const updateComponentFile = (file) => {
  return {
    type: UPDATE_COMPONENT_FILE,
    file,
  };
};

const setComponentParams = (parameters) => {
  return {
    type: UPDATE_COMPONENT_PARAMS,
    parameters,
  };
};

export const updateComponentParams = (
  id,
  parameters,
  parameterName,
  callback
) => {
  return (dispatch) => {
    return componentsServices
      .updateParameters(id, parameters)
      .then((response) => {
        if (response) {
          if (callback) {
            callback(parameterName, true);
          }
          dispatch(setComponentParams(response.data.payload.parameters));
        }
      })
      .catch((error) => {
        throw error;
      });
  };
};

const setComponentName = (name) => {
  return {
    type: UPDATE_COMPONENT_NAME,
    name,
  };
};

export const updateComponentName = (editableDetails, name, resultCallback) => {
  const { uuid } = editableDetails;
  return (dispatch) => {
    return componentsServices
      .updateComponent(uuid, name)
      .then((response) => {
        if (response) {
          dispatch(setComponentName(name));
        } else if (resultCallback) {
          resultCallback(false);
        }
      })
      .catch((error) => {
        throw error;
      });
  };
};
