// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import ContentHeader from 'components/ContentHeader/_';
import AccountInfo from 'components/ContentHeader/AccountInfo';

// ACTIONS
import {
  fetchProjectRequest,
  editProjectNameRequest,
} from 'store/project/actions';

import { Actions as projectsActions } from 'store/Projects';

import { Button, Tooltip, Popconfirm } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

import './style.less';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  const { deleteProject } = projectsActions;

  return {
    handleFetchProject: (projectId) =>
      dispatch(fetchProjectRequest(projectId, routerProps)),
    handleEditProjectName: (projectId, newName) =>
      dispatch(editProjectNameRequest(projectId, newName)),
    handleDeleteProject: (searchText, selectedProjects) =>
      dispatch(deleteProject(searchText, selectedProjects)),
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
const ContentHeaderProjectDetailsContainer = (props) => {
  // destructuring props
  const {
    project,
    loading,
    handleFetchProject,
    handleEditProjectName,
    handleDeleteProject,
  } = props;

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

  const handleClick = () => {
    handleDeleteProject(project.name, projectId);
    goBackHandler();
    window.location.reload();
  };

  // RENDER
  return (
    <ContentHeader
      title={project.name}
      loading={loading}
      customSubTitle='Meus projetos'
      handleGoBack={goBackHandler}
      handleSubmit={editProjectNameHandler}
      extra={
        <>
          <Tooltip placement='bottom' title={'Excluir projeto'}>
            <Popconfirm
              title='Você tem certeza que deseja excluir esse projeto?'
              onConfirm={handleClick}
              okText='Sim'
              cancelText='Não'
            >
              <Button icon={<DeleteOutlined />} className='buttonDelete' />
            </Popconfirm>
          </Tooltip>
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
  )(ContentHeaderProjectDetailsContainer)
);
