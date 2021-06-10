import React from 'react';
import { useParams } from 'react-router';
import { ReactFlowProvider } from 'react-flow-renderer';

import {
  DeploymentLogsPanelContainer,
  MonitoringPanelContainer,
  DeploymentsHeaderContainer,
  DeploymentsTabsContainer,
  DeploymentToolbarContainer,
  DeploymentFlowContainer,
  PropertiesResizableContainer,
} from 'containers';

import useRedirectToError404 from './useRedirectToError404';

import './Deployment.style.less';

const Deployment = () => {
  const { deploymentId } = useParams();

  useRedirectToError404(deploymentId);

  return (
    <ReactFlowProvider>
      <div className='deployment-page'>
        <DeploymentsHeaderContainer />

        <div className='deployment-page-body'>
          <div className='deployment-page-body-left'>
            <div className='deployment-page-body-options'>
              <DeploymentToolbarContainer />
            </div>

            <div className='deployment-page-body-flow'>
              <DeploymentFlowContainer />
            </div>

            <div className='deployment-page-body-bottom'>
              <MonitoringPanelContainer />
              <DeploymentLogsPanelContainer />
            </div>
          </div>

          <PropertiesResizableContainer />
        </div>

        <DeploymentsTabsContainer />
      </div>
    </ReactFlowProvider>
  );
};

export default Deployment;
