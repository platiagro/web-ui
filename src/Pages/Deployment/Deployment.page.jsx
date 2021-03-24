import React from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';

import {
  MonitoringPanelContainer,
  DeploymentsHeaderContainer,
  DeploymentsTabsContainer,
  DeploymentToolbarContainer,
  DeploymentFlowContainer,
} from 'containers';

import './Deployment.style.less';

/**
 * Pagina de pré-implantação/implantação.
 */
function Deployment() {
  // FIXME: Adicionar containers
  // FIXME: Criar Layout
  return (
    <ReactFlowProvider>
      <div className='deploymentPage'>
        <div className='contentBlock'>
          <DeploymentsHeaderContainer />
          <div className='deploymentContent'>
            <div className='flowContent'>
              <div className='options'>
                <DeploymentToolbarContainer />
              </div>
              <div className='flow'>
                <DeploymentFlowContainer />
              </div>
              <div className='monitoring'>
                <MonitoringPanelContainer />
              </div>
              <div className='parameters'>parametros</div>
            </div>
            <DeploymentsTabsContainer />
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default Deployment;
