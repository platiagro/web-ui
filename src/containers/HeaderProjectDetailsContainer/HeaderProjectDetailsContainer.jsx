// CORE LIBS
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams, withRouter } from 'react-router-dom';

// COMPONENTS
import ContentHeader from 'components/ContentHeader/_';
import AccountInfo from 'components/ContentHeader/AccountInfo';

import { Actions as projectsActions, Selectors } from 'store/Projects';

import { Button, Tooltip, Popconfirm } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

import './style.less';

// DISPATCHS
const mapDispatchToProps = (dispatch) => {
  const { deleteProjectsRequest, updateProjectRequest } = projectsActions;

  return {
    handleEditProjectName: (projectId, newName) =>
      dispatch(updateProjectRequest(projectId, { name: newName })),
    handleDeleteProject: (projectId) =>
      dispatch(deleteProjectsRequest([projectId])),
  };
};

// STATES
const mapStateToProps = (state, ownProps) => {
  const { getProject, getIsLoading } = Selectors;

  const { projectId } = ownProps.match.params;

  return {
    project: getProject(projectId, state),
    loading: getIsLoading(state),
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
    handleEditProjectName,
    handleDeleteProject,
  } = props;

  // CONSTANTS
  // getting history
  const history = useHistory();
  // getting project uuid
  const { projectId } = useParams();

  // HANDLERS
  // go back
  const goBackHandler = () => history.push('/projetos');
  // edit project name
  const editProjectNameHandler = (newProjectName) =>
    handleEditProjectName(projectId, newProjectName);

  const handleClick = () => {
    handleDeleteProject(projectId);
    goBackHandler();
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
