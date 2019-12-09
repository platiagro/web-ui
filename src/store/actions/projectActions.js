import * as projectsServices from '../../services/projectsApi';

export const PROJECT_FETCH_DETAIL_STARTED = 'PROJECT_FETCH_DETAIL_STARTED';
export const PROJECT_FETCH_DETAIL = 'PROJECT_FETCH_DETAIL';

const fetchStarted = () => {
  return {
    type: PROJECT_FETCH_DETAIL_STARTED,
  };
};

const setProjectDetail = (detail) => {
  return {
    type: PROJECT_FETCH_DETAIL,
    detail,
  };
};

export const getProjectDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    return projectsServices
      .getProject(id)
      .then((projectResponse) => {
        if (!projectResponse) {
          dispatch(setProjectDetail({}));
        } else {
          projectsServices.getExperimentList(id).then((experimentResponse) => {
            if (!experimentResponse) {
              dispatch(setProjectDetail({}));
            } else {
              const auxDetails = { name: null, uuid: null, experimentList: [] };
              auxDetails.name = projectResponse.data.payload.name;
              auxDetails.uuid = projectResponse.data.payload.uuid;
              auxDetails.experimentList = experimentResponse.data.payload;
              dispatch(setProjectDetail(auxDetails));
            }
          });
        }
      })
      .catch((error) => {
        throw error;
      });
  };
};
