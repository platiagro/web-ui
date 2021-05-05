import React from 'react';
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';
import { useParams } from 'react-router-dom';

import './style.less';
import { Selectors, PROJECTS_TYPES } from 'store/projects';
import { useIsLoading } from 'hooks';

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
          <p className='user-description'>
            <span className='user-avatar'>A</span>
            <span>Usuário anônimo</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default TasksMenuDetailsContainer;
