/**
 * Actions for component page
 */
import { message } from 'antd';
import uuidv4 from 'uuid/v4';
import * as componentsServices from '../../services/componentsApi';
import * as jupyterServices from '../../services/jupyterApi';

export const COMPONENT_FETCH_DETAIL_STARTED = 'COMPONENT_FETCH_DETAIL_STARTED';
export const COMPONENT_FETCH_DETAIL = 'COMPONENT_FETCH_DETAIL';
export const COMPONENT_FETCH_NAMESPACES = 'COMPONENT_FETCH_NAMESPACES';
export const COMPONENT_UPDATE_FILE = 'COMPONENT_UPDATE_FILE';
export const COMPONENT_UPDATE_PARAMS = 'COMPONENT_UPDATE_PARAMS';
export const COMPONENT_UPDATE_NAME = 'COMPONENT_UPDATE_NAME';

/**
 * Function to dispatch action COMPONENT_FETCH_DETAIL_STARTED
 */
export const fetchStarted = () => {
  return {
    type: COMPONENT_FETCH_DETAIL_STARTED,
  };
};

/**
 * Function to dispatch action COMPONENT_FETCH_DETAIL
 * @param {Object} detail
 */
export const setComponentDetail = (detail) => {
  return {
    type: COMPONENT_FETCH_DETAIL,
    detail,
  };
};

/**
 * Function to fetch component detail and dispatch to reducer
 * @param {String} id
 */
export const getComponentDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return componentsServices.getComponent(id).then((response) => {
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
    });
  };
};

/**
 * Function to dispatch action COMPONENT_FETCH_NAMESPACES
 * @param {Object[]} namespaces
 */
export const setNamespaces = (namespaces) => {
  return {
    type: COMPONENT_FETCH_NAMESPACES,
    namespaces,
  };
};

/**
 * Function to fetch jupyter namespaces and dispatch to reducer
 */
export const getNamespaces = () => {
  return (dispatch) => {
    return jupyterServices.getNamespaces().then((response) => {
      if (response) {
        dispatch(setNamespaces(response.data.namespaces));
      }
    });
  };
};

/**
 * Function to dispatch action COMPONENT_UPDATE_FILE
 * @param {Object} file
 */
export const updateComponentFile = (file) => {
  return {
    type: COMPONENT_UPDATE_FILE,
    file,
  };
};

/**
 * Function to dispatch action COMPONENT_UPDATE_PARAMS
 * @param {Object[]} parameters
 */
export const setComponentParams = (parameters) => {
  return {
    type: COMPONENT_UPDATE_PARAMS,
    parameters,
  };
};

/**
 * Function to add new parameter and dispatch to reducer
 * @param {String} id
 * @param {Object[]} parameters
 * @param {Object} newParameter
 */
export const addParam = (id, parameters, newParameter) => {
  let checkParameters = true;
  parameters.forEach((parameter) => {
    if (parameter.name === newParameter.name) {
      checkParameters = false;
    }
  });

  if (checkParameters) {
    const newParameters = [...parameters, newParameter];
    newParameters.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      return 1;
    });
    return (dispatch) => {
      return componentsServices
        .updateParameters(id, newParameters)
        .then((response) => {
          if (response) {
            dispatch(setComponentParams(response.data.payload.parameters));
            return true;
          }
          return false;
        });
    };
  }
  message.error('Já existe parâmetro com esse nome adicionado');
  return false;
};

/**
 * Function to remove parameter and dispatch to reducer
 * @param {String} id
 * @param {Object[]} parameters
 * @param {Object} removedParameter
 */
export const removeParam = (id, parameters, removedParameter) => {
  const index = parameters.indexOf(removedParameter, 0);
  if (index > -1) {
    const newParameters = [...parameters];
    newParameters.splice(index, 1);
    return (dispatch) => {
      return componentsServices
        .updateParameters(id, newParameters)
        .then((response) => {
          if (response) {
            dispatch(setComponentParams(response.data.payload.parameters));
            return true;
          }
          return false;
        });
    };
  }
  message.error(`Erro ao remover parâmetro ${removedParameter.name}`);
  return false;
};

/**
 * Function to dispatch action COMPONENT_UPDATE_NAME
 * @param {String} name
 */
export const setComponentName = (name) => {
  return {
    type: COMPONENT_UPDATE_NAME,
    name,
  };
};

/**
 * Function to update name and dispatch to reducer
 * @param {Object} editableDetails
 * @param {String} name
 */
export const updateComponentName = (editableDetails, name) => {
  const { uuid } = editableDetails;
  return (dispatch) => {
    return componentsServices.updateComponent(uuid, name).then((response) => {
      if (response) {
        dispatch(setComponentName(name));
        return true;
      }
      return false;
    });
  };
};
