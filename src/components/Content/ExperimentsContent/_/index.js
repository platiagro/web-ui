// CORE LIBS
import React from 'react';
import { Layout } from 'antd';
import { useParams } from 'react-router-dom';

// COMPONENTS
import TasksMenuBlockContainer from '../TasksMenuBlock/_/TasksMenuBlockContainer';
import ExperimentsTabs from '../ExperimentsTabs/_/Container';
import NewExperimentButton from '../NewExperimentButton/Container';
import NewExperimentModal from '../NewExperimentModal/Container';
import CustomDndProvider from 'components/CustomDndProvider';
import FlowDrop from './FlowDrop';

import {
  ChangeRoutePromptContainer,
  CompareResultsModalContainer,
  DataViewModalContainer,
  ExperimentsHeaderContainer,
  OperatorResizableSectionContainer,
  OperatorResultsModalContainer,
  PrepareDeploymentsModalContainer,
} from 'containers';

import './style.less';

const { Footer, Sider, Content } = Layout;

const ExperimentsContent = () => {
  const { experimentId } = useParams();

  const renderFlowContent = () => (
    <Layout style={{ overflow: 'hidden' }}>
      <Sider width={250}>
        <TasksMenuBlockContainer disabled={!experimentId} />
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
      <CustomDndProvider>
        <PrepareDeploymentsModalContainer />
        <CompareResultsModalContainer />
        <DataViewModalContainer />
        <OperatorResultsModalContainer />
        <ExperimentsHeaderContainer />
        {renderFlowContent()}
        <ChangeRoutePromptContainer />
      </CustomDndProvider>
    </>
  );
};

// EXPORT
export default ExperimentsContent;
