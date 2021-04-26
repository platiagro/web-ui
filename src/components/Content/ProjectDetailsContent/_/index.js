// CORE LIBS
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Actions as projectsActions, Selectors } from 'store/Projects';

// CONTAINERS
import HeaderProjectDetailsContainer from 'containers/HeaderProjectDetailsContainer/index';
import TasksMenuDetailsContainer from 'containers/TasksMenuDetailsContainer/index';
import ProjectDetailsContainer from 'containers/ProjectDetailsContainer/index';

import './style.less';

const { Sider, Content } = Layout;

// DISPATCHS
const mapDispatchToProps = (dispatch, ownProps) => {
  const { fetchProjectRequest } = projectsActions;

  const { projectId } = ownProps.match.params;

  return {
    fetchProject: () => dispatch(fetchProjectRequest(projectId, ownProps)),
  };
};

// STATES
const mapStateToProps = (state, ownProps) => {
  const { getProject } = Selectors;

  const { projectId } = ownProps.match.params;

  return {
    project: getProject(projectId, state),
  };
};

// TODO: Transformar em page
const ProjectsDetailsContent = (props) => {
  const { fetchProject, project } = props;

  useEffect(() => {
    if (project.uuid === '') {
      fetchProject();
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectsDetailsContent)
);
