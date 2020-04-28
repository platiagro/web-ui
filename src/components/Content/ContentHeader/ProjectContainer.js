// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// COMPONENTS
import ContentHeader from './index';

// ACTIONS
import {
  fetchProjectRequest,
  editProjectNameRequest,
} from '../../../store/project/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchProject: (projectId) => dispatch(fetchProjectRequest(projectId)),
    handleEditProjectName: (projectId, newName) =>
      dispatch(editProjectNameRequest(projectId, newName)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return { project: state.project, loading: state.ui.projectName.loading };
};

/**
 * Content Header Project Container.
 * This component is responsible for create a logic container for project content
 * header with route control.
 */
const ContentHeaderProjectContainer = ({
  project,
  loading,
  handleFetchProject,
  handleEditProjectName,
}) => {
  // CONSTANTS
  // getting history
  const history = useHistory();
  // getting project uuid
  const { projectId } = useParams();

  // HOOKS
  // did mount hook
  useEffect(() => {
    // fetching projects
    handleFetchProject(projectId);
  }, []);

  // HANDLERS
  // go back
  const goBackHandler = () => history.goBack();
  // edit project name
  const editProjectNameHandler = (newProjectName) =>
    handleEditProjectName(projectId, newProjectName);

  // RENDER
  return (
    <ContentHeader
      title={project.name}
      handleGoBack={goBackHandler}
      handleSubmit={editProjectNameHandler}
      loading={loading}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentHeaderProjectContainer);
