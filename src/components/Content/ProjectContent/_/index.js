// CORE LIBS
import React from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// COMPONENTS
import ContentHeaderProjectContentContainer from '../../ContentHeader/_/ContentHeaderProjectContentContainer';
import TasksMenuBlock from '../TasksMenuBlock/_/Container';
import ExperimentsTabs from '../ExperimentsTabs/_/Container';
import NewExperimentButton from '../NewExperimentButton/Container';
import NewExperimentModal from '../NewExperimentModal/Container';

import {
  CompareResultsModalContainer,
  OperatorResizableSectionContainer,
  OperatorResultsModalContainer,
  DataViewModalContainer,
  ChangeRoutePromptContainer,
} from 'containers';

import FlowDrop from './FlowDrop';

import { Layout } from 'antd';
import './style.less';

const { Footer, Sider, Content } = Layout;

const ProjectContent = () => {
  const { experimentId } = useParams();

  const renderFlowContent = () => (
    <Layout style={{ overflow: 'hidden' }}>
      <Sider width={250}>
        <TasksMenuBlock disabled={!experimentId} />
      </Sider>
      <Content>
        <Layout style={{ height: '100%' }}>
          <Content style={{ display: 'flex' }}>
            <FlowDrop />
            <OperatorResizableSectionContainer />
          </Content>
          <Footer style={{ padding: 0 }}>
            <div className='custom-experiment-tabs'>
              <ExperimentsTabs />
              <NewExperimentButton />
              <NewExperimentModal />
            </div>
          </Footer>
        </Layout>
      </Content>
    </Layout>
  );

  // RENDER
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {/* compare results modal container */}
        <CompareResultsModalContainer />
        {/* data view modal container */}
        <DataViewModalContainer />
        {/* operator results modal */}
        <OperatorResultsModalContainer />
        {/* Header from project content(name and rename) */}
        <ContentHeaderProjectContentContainer />
        {/* render flow */}
        {renderFlowContent()}
        {/* change route prompt */}
        <ChangeRoutePromptContainer />
      </DndProvider>
    </>
  );
};

// EXPORT
export default ProjectContent;
