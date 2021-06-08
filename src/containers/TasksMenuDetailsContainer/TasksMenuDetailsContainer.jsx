import React from 'react';
import { Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useIsLoading } from 'hooks';
import { UserInfo } from 'components';
import { Selectors, PROJECTS_TYPES } from 'store/projects';

import './style.less';

const { getProject } = Selectors;

// TODO: Componente com nome incoerente, renomear
const TasksMenuDetailsContainer = () => {
  const { projectId } = useParams();

  // TODO: Criar seletores com reselect -> Otimização
  /* eslint-disable-next-line */
  const project = useSelector((state) => getProject(projectId, state));
  const loading = useIsLoading(PROJECTS_TYPES.FETCH_PROJECT_REQUEST);

  const formatedDate = new Date(project.updatedAt).toLocaleString();
  const projectDescription =
    project.description || 'Não há descrição disponível';

  return (
    <div className='project-description'>
      <div className='description'>
        <strong> Descrição </strong>
        {loading ? (
          <Skeleton active title={{ width: 200 }} paragraph={false} />
        ) : (
          <p>{projectDescription}</p>
        )}
      </div>
      <div className='updated'>
        <strong> Última modificação </strong>
        {loading ? (
          <Skeleton active title={{ width: 200 }} paragraph={false} />
        ) : (
          <p>{formatedDate}</p>
        )}
      </div>
      <div className='created'>
        <strong> Criado por </strong>
        {loading ? (
          <Skeleton
            active
            avatar={{ shape: 'circle' }}
            title={{ width: 200 }}
            paragraph={false}
          />
        ) : (
          <UserInfo
            className='user-description'
            avatarBackground='grey'
            name='Usuário Anônimo'
          />
        )}
      </div>
    </div>
  );
};

export default TasksMenuDetailsContainer;
