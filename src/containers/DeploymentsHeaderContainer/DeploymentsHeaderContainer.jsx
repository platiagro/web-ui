// CORE LIBS
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, useParams, withRouter } from "react-router-dom";

// COMPONENTS
import ContentHeader from 'components/Content/ContentHeader/_';
import AccountInfo from 'components/Content/ContentHeader/AccountInfo';
import PageHeaderDropdown from 'components/Content/ContentHeader/PageHeaderDropdown';

// ACTIONS
import {
  editProjectNameRequest, fetchProjectRequest,
} from 'store/project/actions';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleEditProjectName: (projectId, newName) =>
      dispatch(editProjectNameRequest(projectId + newName)),
    handleFetchProject: (projectId) =>
      dispatch(fetchProjectRequest(projectId, routerProps)),
  };
};

// STATE
const mapStateToProps = (state) => {
  return {
    project: state.projectReducer,
  };
};

/**
 * Deployments Header Container.
 * This components is responsible for create a logic container
 * for deployments header with route control.
 *
 * @param {*} props Container props
 */
const DeploymentsHeaderContainer = (props) => {
  const { project, handleEditProjectName, handleFetchProject } = props;

  const { projectId } = useParams();
  const history = useHistory();

  // HANDLERS
  const goBackHandler = () => history.push(`/projetos/${projectId}`);
  const editProjectNameHandler = (newProjectname) =>
    handleEditProjectName(projectId, newProjectname);

  // HOOKS
  useEffect(() => {
    // fetch project if project details is null
    if (!project.uuid) {
      handleFetchProject(projectId);
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
      handleGoBack={ goBackHandler }
      handleSubmit={ editProjectNameHandler }
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DeploymentsHeaderContainer)
)