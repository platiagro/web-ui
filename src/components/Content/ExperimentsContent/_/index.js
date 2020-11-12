// CORE LIBS
import React from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// COMPONENTS
import TasksMenuBlock from '../TasksMenuBlock/_/Container';
import ExperimentsTabs from '../ExperimentsTabs/_/Container';
import NewExperimentButton from '../NewExperimentButton/Container';
import NewExperimentModal from '../NewExperimentModal/Container';

import {
  ChangeRoutePromptContainer,
  CompareResultsModalContainer,
  DataViewModalContainer,
  HeaderExperimentsContentContainer,
  OperatorResizableSectionContainer,
  OperatorResultsModalContainer,
} from 'containers';

import FlowDrop from './FlowDrop';

import { Layout } from 'antd';
import './style.less';

const { Footer, Sider, Content } = Layout;

const ExperimentsContent = () => {
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
        <CompareResultsModalContainer />
        <DataViewModalContainer />
        <OperatorResultsModalContainer />
        <HeaderExperimentsContentContainer />
        {renderFlowContent()}
        <ChangeRoutePromptContainer />
      </DndProvider>
    </>
  );
};

// EXPORT
export default ExperimentsContent;
