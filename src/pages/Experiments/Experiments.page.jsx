import React, { useEffect } from 'react';
import { Layout, notification } from 'antd';
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

import NewExperimentButton from './NewExperimentButton/NewExperimentButtonContainer';
import NewExperimentModal from './NewExperimentModal/NewExperimentModalContainer';
import ExperimentsTabs from './ExperimentsTabs/ExperimentTabsContainer';
import TasksMenuBlock from './TasksMenuBlock/TasksMenuBlockContainer';
import FlowDrop from './FlowDrop';

import './Experiments.style.less';

const Experiments = () => {
  const { experimentId } = useParams();

  useEffect(() => {
    return () => {
      // Destroy operator status notifications when leave experiment page
      notification.destroy();
    };
  }, []);

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

export default Experiments;
