// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import ContentHeader from 'components/Content/ContentHeader/_/index';
import AccountInfo from 'components/Content/ContentHeader/AccountInfo';
import PageHeaderDropdown from 'components/Content/ContentHeader/PageHeaderDropdown';
import ExperimentButtonsContainer from 'components/Content/ContentHeader/ExperimentButtons/Container';

// ACTIONS
import {
  editProjectNameRequest,
  fetchProjectRequest,
} from 'store/project/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleEditProjectName: (projectId, newName) =>
      dispatch(editProjectNameRequest(projectId, newName)),
    handleFetchProject: (projectId) =>
      dispatch(fetchProjectRequest(projectId, routerProps)),
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
 * Content Header Experiments Content Container.
 * This component is responsible for create a logic container for experiments content
 * header with route control.
 *
 * @param props
 */
const HeaderExperimentsContentContainer = (props) => {
  const { project, handleEditProjectName, handleFetchProject } = props;
  const { projectId } = useParams();
  const history = useHistory();

  // HANDLERS
  const goBackHandler = () => history.push(`/projetos/${projectId}`);
  const editProjectNameHandler = (newProjectName) =>
    handleEditProjectName(projectId, newProjectName);

  // HOOKS
  useEffect(() => {
    // fetch project if project details is null
    if (!project.uuid) {
      handleFetchProject(projectId);
    }
  }, [handleFetchProject, project, projectId]);

  // SET TARGET ROUTE FOR PAGE HEADER DROPDOWN
  const target = `/projetos/${projectId}/pre-implantacao`

  // RENDER
  return (
    <ContentHeader
      title={project.name}
      subTitle={
        <>
          <PageHeaderDropdown type='experiment' target={target} />
        </>
      }
      customSubTitle='Meus projetos'
      handleGoBack={goBackHandler}
      handleSubmit={editProjectNameHandler}
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderExperimentsContentContainer)
);
