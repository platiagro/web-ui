import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ContentHeader from 'components/ContentHeader/_';
import AccountInfo from 'components/ContentHeader/AccountInfo';

import { Actions as projectsActions, Selectors } from 'store/projects';

import { Button, Tooltip, Popconfirm } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

import './style.less';

const { getProject, getIsLoading } = Selectors;
const { deleteProjectsRequest, updateProjectRequest } = projectsActions;

/**
 * Content Header Project Container.
 *
 * This component is responsible for create a logic container for project content
 * header with route control.
 */
const ContentHeaderProjectDetailsContainer = () => {
  const history = useHistory();
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const loading = useSelector(getIsLoading);

  // TODO: Criar seletores com reselect -> Otimização
  /* eslint-disable-next-line */
  const project = useSelector((state) => getProject(projectId, state));

  const goBackHandler = () => history.push('/projetos');
  const editProjectNameHandler = (newProjectName) =>
    dispatch(updateProjectRequest(projectId, { name: newProjectName }));

  const handleClick = () => {
    dispatch(deleteProjectsRequest([projectId]));
    goBackHandler();
  };

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

export default ContentHeaderProjectDetailsContainer;
