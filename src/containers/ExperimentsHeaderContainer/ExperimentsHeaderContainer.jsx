// CORE LIBS
import React from 'react';
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

import {
  changeVisibilityCompareResultsModal,
  showPrepareDeploymentsModal,
} from 'store/ui/actions';

import { Actions as projectsActions, Selectors } from 'store/Projects';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  const { updateProjectRequest } = projectsActions;

  return {
    handleEditProjectName: (projectId, newName) =>
      dispatch(updateProjectRequest(projectId, { name: newName })),
    handleCompareResultsClick: () => {
      dispatch(changeVisibilityCompareResultsModal(true));
    },
    handlePrepareDeploymentsModalOpen: () => {
      dispatch(showPrepareDeploymentsModal());
    },
  };
};

// STATES
const mapStateToProps = (state, ownProps) => {
  const { getProject, getIsLoading } = Selectors;

  const { projectId } = ownProps.match.params;

  return {
    project: getProject(projectId, state),
    loading: getIsLoading(state),
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
      loading={loading}
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
