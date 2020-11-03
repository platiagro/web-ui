// CORE LIBS
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import ContentHeader from './index';
import AccountInfo from '../AccountInfo';

// ACTIONS
import {
  fetchProjectRequest,
  editProjectNameRequest,
} from '../../../../store/project/actions';

import { deleteSelectedProjects } from '../../../../store/projects/actions';

import { Button, Tooltip, Popconfirm } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

// DISPATCHS
const mapDispatchToProps = (dispatch, routerProps) => {
  return {
    handleFetchProject: (projectId) =>
      dispatch(fetchProjectRequest(projectId, routerProps)),
    handleEditProjectName: (projectId, newName) =>
      dispatch(editProjectNameRequest(projectId, newName)),
    handleDeleteSelectedProjects: (searchText, selectedProjects) =>
      dispatch(deleteSelectedProjects(searchText, selectedProjects)),
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
    handleFetchProject,
    handleEditProjectName,
    handleDeleteSelectedProjects,
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
    handleDeleteSelectedProjects(project.name, project);
    history.push('/projetos');
  };

  // RENDER
  return (
    <ContentHeader
      title={project.name}
      subTitle='Meus projetos'
      handleGoBack={goBackHandler}
      handleSubmit={editProjectNameHandler}
      extra={
        <>
          <Tooltip placement='bottom' title={'Excluir projeto'}>
            <Popconfirm
              title='Você tem certeza que deseja excluir esse projeto?'
              onConfirm={() => {console.log('Im i')}}
              okText='Sim'
              cancelText='Não'
            >
              <Button
                icon={<DeleteOutlined />}
                className={'bottonDelete'}
               type={'link'}
              />
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
