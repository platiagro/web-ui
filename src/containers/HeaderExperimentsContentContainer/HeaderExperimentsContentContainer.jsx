// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import ContentHeader from 'components/Content/ContentHeader/_/index';
import AccountInfo from 'components/Content/ContentHeader/AccountInfo';
import ExperimentButtonsContainer from 'components/Content/ContentHeader/ExperimentButtons/Container';

// ACTIONS
import { editProjectNameRequest } from 'store/project/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
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
 * Content Header Experiments Content Container.
 * This component is responsible for create a logic container for experiments content
 * header with route control.
 */
const HeaderExperimentsContentContainer = (props) => {
  const { project, handleEditProjectName } = props;
  const { projectId } = useParams();
  const history = useHistory();

  // HANDLERS
  const goBackHandler = () => history.push(`/projetos/${projectId}`);
  const editProjectNameHandler = (newProjectName) =>
    handleEditProjectName(projectId, newProjectName);

  // RENDER
  return (
    <ContentHeader
      title={project.name}
      subTitle='Meus projetos'
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
