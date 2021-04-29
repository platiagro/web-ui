import React from 'react';
import { Layout } from 'antd';

import HeaderProjectDetailsContainer from 'containers/HeaderProjectDetailsContainer/index';
import TasksMenuDetailsContainer from 'containers/TasksMenuDetailsContainer/index';
import ProjectDetailsContainer from 'containers/ProjectDetailsContainer/index';

import './ProjectDetails.style.less';

const ProjectDetails = () => (
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

export default ProjectDetails;
