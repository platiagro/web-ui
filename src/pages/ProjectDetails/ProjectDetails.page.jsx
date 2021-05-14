import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  Actions as projectsActions,
  Selectors as projectsSelectors,
} from 'store/projects';

import {
  HeaderProjectDetailsContainer,
  TasksMenuDetailsContainer,
  ProjectDetailsContainer,
} from 'containers';

import './ProjectDetails.style.less';

const projectSelector = (projectId) => (state) => {
  return projectsSelectors.getProject(projectId, state);
};

const ProjectDetails = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const project = useSelector(projectSelector(projectId));

  useEffect(() => {
    if (project.uuid === '') {
      dispatch(projectsActions.fetchProjectRequest(projectId, history));
    }
  }, [dispatch, history, project.uuid, projectId]);

  return (
    <>
      <HeaderProjectDetailsContainer />

      <Layout style={{ overflow: 'hidden' }}>
        <Layout.Sider width='20%'>
          <TasksMenuDetailsContainer />
        </Layout.Sider>

        <Layout.Content>
          <Layout style={{ height: '100%' }} className='content'>
            <ProjectDetailsContainer />
          </Layout>
        </Layout.Content>
      </Layout>
    </>
  );
};

export default ProjectDetails;
