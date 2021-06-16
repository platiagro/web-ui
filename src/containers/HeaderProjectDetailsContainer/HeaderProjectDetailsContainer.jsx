import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Tooltip, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { useIsLoading } from 'hooks';
import ContentHeader from 'components/ContentHeader';
import AccountInfo from 'components/ContentHeader/AccountInfo';
import {
  Actions as projectsActions,
  Selectors,
  PROJECTS_TYPES,
} from 'store/projects';

import './style.less';

const { deleteProjectsRequest, updateProjectRequest } = projectsActions;

const projectSelector = (projectId) => (state) => {
  return Selectors.getProject(projectId, state);
};

const HeaderProjectDetailsContainer = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useIsLoading(
    PROJECTS_TYPES.DELETE_PROJECTS_REQUEST,
    PROJECTS_TYPES.UPDATE_PROJECT_REQUEST
  );

  const project = useSelector(projectSelector(projectId));

  const handleGoBack = () => {
    history.push('/projetos');
  };

  const handleEditProjectName = (newProjectName) => {
    dispatch(updateProjectRequest(projectId, { name: newProjectName }));
  };

  const handleDeleteProjectConfirmation = () => {
    dispatch(deleteProjectsRequest([projectId]));
    handleGoBack();
  };

  return (
    <ContentHeader
      loading={loading}
      title={project.name}
      customSubTitle='Meus projetos'
      handleGoBack={handleGoBack}
      handleSubmit={handleEditProjectName}
      extra={
        <>
          <Tooltip placement='bottom' title={'Excluir projeto'}>
            <Popconfirm
              title='Você tem certeza que deseja excluir esse projeto?'
              onConfirm={handleDeleteProjectConfirmation}
              cancelText='Não'
              okText='Sim'
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

export default HeaderProjectDetailsContainer;
