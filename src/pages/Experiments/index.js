import React from 'react';
import { Layout } from 'antd';
import { useParams } from 'react-router-dom';

import CustomDndProvider from 'components/CustomDndProvider';
import {
  ChangeRoutePromptContainer,
  CompareResultsModalContainer,
  DataViewModalContainer,
  ExperimentsHeaderContainer,
  OperatorResizableSectionContainer,
  OperatorResultsModalContainer,
  PrepareDeploymentsModalContainer,
} from 'containers';

import TasksMenuBlock from './TasksMenuBlock/TasksMenuBlockContainer';
import NewExperimentButton from './NewExperimentButton/Container';
import NewExperimentModal from './NewExperimentModal/Container';
import ExperimentsTabs from './ExperimentsTabs/Container';
import FlowDrop from './FlowDrop';

import './style.less';

const ExperimentsContent = () => {
  const { experimentId } = useParams();

  return (
    <CustomDndProvider>
      <PrepareDeploymentsModalContainer />
      <CompareResultsModalContainer />
      <DataViewModalContainer />
      <OperatorResultsModalContainer />
      <ExperimentsHeaderContainer />

      <Layout style={{ overflow: 'hidden' }}>
        <Layout.Sider width={250}>
          <TasksMenuBlock disabled={!experimentId} />
        </Layout.Sider>

        <Layout.Content>
          <Layout style={{ height: '100%' }}>
            <Layout.Content style={{ display: 'flex' }}>
              <FlowDrop />
              <OperatorResizableSectionContainer />
            </Layout.Content>

            <Layout.Footer style={{ padding: 0 }}>
              <div className='custom-experiment-tabs'>
                <ExperimentsTabs />
                <NewExperimentButton />
                <NewExperimentModal />
              </div>
            </Layout.Footer>
          </Layout>
        </Layout.Content>
      </Layout>

      <ChangeRoutePromptContainer />
    </CustomDndProvider>
  );
};

export default ExperimentsContent;
