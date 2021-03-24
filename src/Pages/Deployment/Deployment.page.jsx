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
      <div className='deployment-page'>
        <DeploymentsHeaderContainer />

        <div className='deployment-page-body'>
          <div className="deployment-page-body-left">
            <div className='deployment-page-body-options'>
              <DeploymentToolbarContainer />
            </div>

            <div className='deployment-page-body-flow'>
              <DeploymentFlowContainer />
            </div>

            <div className='deployment-page-body-monitoring'>
              <MonitoringPanelContainer />
            </div>
          </div>

          <div className='deployment-page-body-right'>
            {/* TODO: Aqui fica o container de parâmetros */}
            Parameters
          </div>
        </div>

        <DeploymentsTabsContainer />
      </div>
    </ReactFlowProvider>
  );
}

export default Deployment;
