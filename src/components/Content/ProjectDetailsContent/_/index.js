// CORE LIBS
import React from 'react';
import { Layout } from 'antd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import './style.less';

// CONTAINERS
import HeaderProjectDetailsContainer from 'containers/HeaderProjectDetailsContainer/index';
import TasksMenuDetailsContainer from 'containers/TasksMenuDetailsContainer/index';
import ProjectDetailContainer from 'containers/ProjectDetailsContainer/index';

const { Sider, Content } = Layout;

const ProjectsDetailsContent = () => {
   
  const renderFlowContent = () => (
   

    <Layout style={{ overflow: 'hidden'}}>
      <Sider width={250}    
       className={'detailsMenu'} id="menudetails"
      >
      <TasksMenuDetailsContainer/>
      </Sider>
      <Content>
        <Layout style={{ height: '100%' }} className={'content'}>
         <ProjectDetailContainer/>
          
        </Layout>
      </Content>
    </Layout>
  );

  return(
   // fragment
   <>
    <DndProvider backend={HTML5Backend}>
    <HeaderProjectDetailsContainer />
    {renderFlowContent()}
    </DndProvider>
   
 </>
  )
}

export default ProjectsDetailsContent;