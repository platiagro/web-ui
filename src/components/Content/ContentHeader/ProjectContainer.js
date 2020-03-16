// CORE LIBS
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

// COMPONENTS
import ContentHeader from './index';

// ACTIONS
import { fetchProject, editProjectName } from '../../../store/project/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  return {
    handleFetchProject: (projectUuid) => dispatch(fetchProject(projectUuid)),
    handleEditProjectName: (newName) =>
      dispatch(editProjectName(null, newName)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return { project: state.project };
};

/**
 * Content Header Project Container.
 * This component is responsible for create a logic container for project content
 * header with route control.
 */
const ContentHeaderProjectContainer = ({
  project,
  handleFetchProject,
  handleEditProjectName,
}) => {
  // CONSTANTS
  // getting history
  const history = useHistory();
  // getting project uuid
  const { projectUuid } = useParams();

  console.log(projectUuid);

  // HOOKS
  // did mount hook
  useLayoutEffect(() => {
    // fetching projects
    handleFetchProject(projectUuid);
  }, []);

  // HANDLERS
  // go back
  const goBackHandler = () => history.goBack();

  // RENDER
  return (
    <ContentHeader
      title={project.name}
      editable
      handleGoBack={goBackHandler}
      handleSubmit={handleEditProjectName}
    />
  );
};

// EXPORT
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentHeaderProjectContainer);
