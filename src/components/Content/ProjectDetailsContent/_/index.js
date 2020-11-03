// CORE LIBS
import React from 'react';
import { Layout } from 'antd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import './style.less';

// COMPONENTS
import ContentHeaderProjectDetailsContainer from '../../ContentHeader/_/ContentHeaderProjectDetailsContainer';
import TasksMenuDetails from '../../ProjectContent/TasksMenuBlock/TasksMenuDetails/Container';
import ProjectDetailContainer from '../../ProjectDetailsContent/Container';

// IMAGES
//import experiment from '../src/assets/experiment.svg';

const { Sider, Content } = Layout;

const ProjectsDetailsContent = () => {
   
  const renderFlowContent = () => (
   

    <Layout style={{ overflow: 'hidden'}}>
      <Sider width={250}    
       className={'detailsMenu'} id="menudetails"
      >
      <TasksMenuDetails/>
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
    {/**<ContentHeaderProjectDetailsContainer />*/}
    <DndProvider backend={HTML5Backend}>
    <ContentHeaderProjectDetailsContainer />
    {renderFlowContent()}
    </DndProvider>
   
 </>
  )
}

export default ProjectsDetailsContent;