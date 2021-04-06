// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import ContentHeader from 'components/ContentHeader/_/index';
import AccountInfo from 'components/ContentHeader/AccountInfo';
import PageHeaderDropdown from 'components/ContentHeader/PageHeaderDropdown';
import {
  CompareResultsButton,
  PrepareDeploymentsButton,
} from 'components/Buttons';

// ACTIONS
import {
  editProjectNameRequest,
  fetchProjectRequest,
} from 'store/project/actions';

import {
  changeVisibilityCompareResultsModal,
  showPrepareDeploymentsModal,
} from 'store/ui/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleEditProjectName: (projectId, newName) =>
      dispatch(editProjectNameRequest(projectId, newName)),
    handleFetchProject: (projectId) =>
      dispatch(fetchProjectRequest(projectId, routerProps)),
    handleCompareResultsClick: () => {
      dispatch(changeVisibilityCompareResultsModal(true));
    },
    handlePrepareDeploymentsModalOpen: () => {
      dispatch(showPrepareDeploymentsModal());
    },
  };
};

// STATES
const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
    loading: state.uiReducer.projectName.loading,
    prepareDeploymentsLoading: state.uiReducer.prepareDeployments.loading,
  };
};

/**
 * Experiments Header Container.
 * This component is responsible for create a logic container for experiments content
 * header with route control.
 *
 * @param props
 */
const ExperimentsHeaderContainer = (props) => {
  const {
    project,
    loading,
    prepareDeploymentsLoading,
    handleEditProjectName,
    handleFetchProject,
    handleCompareResultsClick,
    handlePrepareDeploymentsModalOpen,
  } = props;
  const { projectId } = useParams();
  const history = useHistory();

  // HANDLERS
  const goBackHandler = () => history.push(`/projetos/${projectId}`);
  const editProjectNameHandler = (newProjectName) =>
    handleEditProjectName(projectId, newProjectName);
  const handlePrepareDeploymentsClick = () =>
    handlePrepareDeploymentsModalOpen();

  // HOOKS
  useEffect(() => {
    // fetch project if project details is null
    if (!project.uuid) {
      handleFetchProject(projectId);
    }
  }, [handleFetchProject, project, projectId]);

  // SET TARGET ROUTE FOR PAGE HEADER DROPDOWN
  const target = `/projetos/${projectId}/pre-implantacao`;

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
          <div className='headerButtons'>
            <CompareResultsButton
              disabled={loading}
              onClick={handleCompareResultsClick}
            />
            <PrepareDeploymentsButton
              disabled={loading}
              loading={prepareDeploymentsLoading}
              onClick={handlePrepareDeploymentsClick}
            />
          </div>
          <AccountInfo />
        </>
      }
    />
  );
};

// EXPORT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExperimentsHeaderContainer)
);
