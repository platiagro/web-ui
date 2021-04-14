// CORE LIBS
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import ContentHeader from 'components/ContentHeader/_';
import AccountInfo from 'components/ContentHeader/AccountInfo';
import PageHeaderDropdown from 'components/ContentHeader/PageHeaderDropdown';

// ACTIONS
import { Actions as projectsActions, Selectors } from 'store/Projects';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  const { updateProjectRequest, fetchProjectRequest } = projectsActions;

  return {
    handleEditProjectName: (projectId, newName) =>
      dispatch(updateProjectRequest(projectId, { name: newName })),
    handleFetchProject: (projectId) =>
      dispatch(fetchProjectRequest(projectId, routerProps)),
  };
};

// STATE
const mapStateToProps = (state, ownProps) => {
  const { getProject } = Selectors;

  const { projectId } = ownProps.match.params;

  return {
    project: getProject(projectId, state),
  };
};

/**
 * Deployments Header Container.
 * This components is responsible for create a logic container
 * for deployments header with route control.
 *
 * @param {*} props Container props
 *
 * @returns {DeploymentsHeaderContainer} Container
 */
const DeploymentsHeaderContainer = (props) => {
  const { project, handleEditProjectName, handleFetchProject } = props;

  const { projectId } = useParams();
  const history = useHistory();
  const isFirstRender = useRef(true);

  // HANDLERS
  const goBackHandler = () => history.push(`/projetos/${projectId}`);
  const editProjectNameHandler = (newProjectname) =>
    handleEditProjectName(projectId, newProjectname);

  // HOOKS
  useEffect(() => {
    // TODO: Mover essa lógica de requisição para a página Projects

    // fetch project if project details is null
    if (project.uuid === '' && isFirstRender.current) {
      handleFetchProject(projectId);
      isFirstRender.current = false;
    }
  }, [handleFetchProject, project, projectId]);

  // SET TARGET ROUTE FOR PAGE HEADER DROPDOWN
  const target = `/projetos/${projectId}/experimentos`;

  // RENDER
  return (
    <ContentHeader
      title={project.name}
      subTitle={
        <>
          <PageHeaderDropdown type='deployment' target={target} />
        </>
      }
      customSubTitle='Meus projetos'
      handleGoBack={goBackHandler}
      handleSubmit={editProjectNameHandler}
      extra={
        <>
          {/* FIXME: missing deployment buttons */}
          <AccountInfo />
        </>
      }
    />
  );
};

DeploymentsHeaderContainer.propTypes = {
  /** Project object */
  project: PropTypes.object.isRequired,
  /** Action to edit project name */
  handleEditProjectName: PropTypes.func.isRequired,
  /** Action to fetch project */
  handleFetchProject: PropTypes.func.isRequired,
};

// EXPORT DEFAULT
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeploymentsHeaderContainer)
);
