import React from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';

import DeploymentsHeaderContainer from 'containers/DeploymentsHeaderContainer';
import DeploymentsTabsContainer from 'containers/DeploymentsTabsContainer';
import DeploymentToolbarContainer from 'containers/DeploymentToolbarContainer';
import DeploymentFlowContainer from 'containers/DeploymentFlowContainer';

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
        <div className='menu'>menu</div>
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
              <div className='monitoring'>monitoramento</div>
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
