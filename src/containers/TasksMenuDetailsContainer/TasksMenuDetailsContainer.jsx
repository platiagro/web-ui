import React, { useMemo } from 'react';
import { Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useIsLoading } from 'hooks';
import { UserInfoContainer } from 'containers';
import { Selectors, PROJECTS_TYPES } from 'store/projects';

import './style.less';

const projectSelector = (projectId) => (state) => {
  return Selectors.getProject(projectId, state);
};

const TasksMenuDetailsContainer = () => {
  const { projectId } = useParams();

  const project = useSelector(projectSelector(projectId));
  const loading = useIsLoading(PROJECTS_TYPES.FETCH_PROJECT_REQUEST);

  const formattedDate = useMemo(() => {
    return new Date(project.updatedAt).toLocaleString();
  }, [project.updatedAt]);

  const projectDescription = useMemo(() => {
    return project.description || 'Não há descrição disponível';
  }, [project.description]);

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
          <p>{formattedDate}</p>
        )}
      </div>

      <div className='created'>
        <strong> Criado por </strong>
        {loading ? (
          <Skeleton
            paragraph={false}
            title={{ width: 200 }}
            avatar={{ shape: 'circle' }}
            active
          />
        ) : (
          <UserInfoContainer
            avatarBackground='grey'
            className='user-description'
          />
        )}
      </div>
    </div>
  );
};

export default TasksMenuDetailsContainer;
