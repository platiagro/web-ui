// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import ContentHeader from './index';
import AccountInfo from '../AccountInfo';
import ExperimentButtonsContainer from '../ExperimentButtons/Container';

// ACTIONS
import {
  fetchProjectRequest,
  editProjectNameRequest,
} from '../../../../store/project/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleFetchProject: (projectId) =>
      dispatch(fetchProjectRequest(projectId, routerProps)),
    handleEditProjectName: (projectId, newName) =>
      dispatch(editProjectNameRequest(projectId, newName)),
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
    loading: state.uiReducer.projectName.loading,
  };
};

/**
 * Content Header Project Container.
 * This component is responsible for create a logic container for project content
 * header with route control.
 *
 * @param props
 */
const ContentHeaderProjectContainer = (props) => {
  // destructuring props
  const { project, loading, handleFetchProject, handleEditProjectName } = props;

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
  }, [handleFetchProject, projectId]);

  // HANDLERS
  // go back
  const goBackHandler = () => history.push('/projetos');
  // edit project name
  const editProjectNameHandler = (newProjectName) =>
    handleEditProjectName(projectId, newProjectName);

  // RENDER
  return (
    <ContentHeader
      title={project.name}
      subTitle='Meus projetos'
      handleGoBack={goBackHandler}
      handleSubmit={editProjectNameHandler}
      loading={loading}
      extra={
        <>
          <ExperimentButtonsContainer />
          <AccountInfo />
        </>
      }
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContentHeaderProjectContainer)
);
