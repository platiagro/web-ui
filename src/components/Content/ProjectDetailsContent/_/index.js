import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Actions as projectsActions, Selectors } from 'store/projects';

import HeaderProjectDetailsContainer from 'containers/HeaderProjectDetailsContainer/index';
import TasksMenuDetailsContainer from 'containers/TasksMenuDetailsContainer/index';
import ProjectDetailsContainer from 'containers/ProjectDetailsContainer/index';

import './style.less';

const { Sider, Content } = Layout;

const { getProject } = Selectors;
const { fetchProjectRequest } = projectsActions;

// TODO: Transformar em page
const ProjectsDetailsContent = () => {
  const { projectId } = useParams();
  // TODO: Criar seletores com reselect -> Otimização
  /* eslint-disable-next-line */
  const project = useSelector((state) => getProject(projectId, state));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (project.uuid === '') {
      dispatch(fetchProjectRequest(projectId, history));
    }
    // component did mount
    /* eslint-disable-next-line */
  }, []);

  return (
    <>
      <HeaderProjectDetailsContainer />
      <Layout style={{ overflow: 'hidden' }}>
        <Sider width='20%'>
          <TasksMenuDetailsContainer />
        </Sider>
        <Content>
          <Layout style={{ height: '100%' }} className='content'>
            <ProjectDetailsContainer />
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default ProjectsDetailsContent;
