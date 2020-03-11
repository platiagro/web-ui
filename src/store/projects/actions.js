// ACTION TYPES
import actionTypes from './actionTypes';

// MOCKS
// projects mocks
import projectsMock from '../../components/Content/ProjectsContent/_/_projectsMock';

// ACTIONS
/**
 * fetch projects action
 * @returns {type, projects}
 */
const fetchProjects = () => ({
  type: actionTypes.FETCH_PROJECTS,
  projects: projectsMock,
});

// EXPORT
export default { fetchProjects };
