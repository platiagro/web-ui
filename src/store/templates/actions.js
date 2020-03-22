// ACTION TYPES
import actionTypes from './actionTypes';

// SERVICES
import templatesApi from '../../services/TemplatesApi';

// MOCKS
// templates mock
const templatesMock = [
  {
    uuid: '0',
    name: 'Template 0',
  },
  {
    uuid: '1',
    name: 'Template 1',
  },
  {
    uuid: '2',
    name: 'Template 2',
  },
];

// ACTIONS
// ** FETCH TEMPLATES
/**
 * fetch templates success action
 * @param {Object} response
 * @returns {Object} { type, templates }
 */
const fetchTemplatesSuccess = (response) => {
  // getting templates from response
  const templates = response.data;

  return {
    type: actionTypes.FETCH_TEMPLATES_SUCCESS,
    templates: templatesMock,
  };
};

/**
 * fetch templates fail action
 * @param {Object} error
 * @returns {Object} { type, errorMessage }
 */
const fetchTemplatesFail = (error) => {
  // getting error message
  const errorMessage = error.message;

  return {
    type: actionTypes.FETCH_TEMPLATES_FAIL,
    errorMessage,
  };
};

/**
 * fetch templates request action
 * @returns {Function}
 */
const fetchTemplatesRequest = () => (dispatch) => {
  // dispatching request action
  dispatch({
    type: actionTypes.FETCH_TEMPLATES_REQUEST,
  });

  // fetching templates
  templatesApi
    .listTemplates()
    .then((response) => dispatch(fetchTemplatesSuccess(response)))
    .catch((error) => dispatch(fetchTemplatesFail(error)));
};

// // // // // // // // // //

export default fetchTemplatesRequest;
