// CORE LIBS
import React from 'react';
import { Layout } from 'antd';

// CONTAINERS
import HeaderProjectDetailsContainer from 'containers/HeaderProjectDetailsContainer/index';
import TasksMenuDetailsContainer from 'containers/TasksMenuDetailsContainer/index';
import ProjectDetailContainer from 'containers/ProjectDetailsContainer/index';

import './style.less';

const { Sider, Content } = Layout;

const ProjectsDetailsContent = () => (
  <>
    <HeaderProjectDetailsContainer />
    <Layout style={{ overflow: 'hidden' }}>
      <Sider width='20%'>
        <TasksMenuDetailsContainer />
      </Sider>
      <Content>
        <Layout style={{ height: '100%' }} className='content'>
          <ProjectDetailContainer />
        </Layout>
      </Content>
    </Layout>
  </>
);

export default ProjectsDetailsContent;
