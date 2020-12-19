import React from 'react';

import DeploymentsHeaderContainer from 'containers/DeploymentsHeaderContainer';
import DeploymentsTabsContainer from 'containers/DeploymentsTabsContainer';

import './Deployment.style.less';

/**
 * Pagina de pré-implantação/implantação.
 */
function Deployment() {
  // FIXME: Adicionar containers
  // FIXME: Criar Layout
  return (
    <div className='deploymentPage'>
      <div className='menu'>menu</div>
      <div className='contentBlock'>
      <DeploymentsHeaderContainer />
        <div className='deploymentContent'>
          <div className='flowContent'>
            <div className='options'>opcoes</div>
            <div className='flow'>fluxo</div>
            <div className='monitoring'>monitoramento</div>
            <div className='parameters'>parametros</div>
          </div>
          <DeploymentsTabsContainer />
        </div>
      </div>
    </div>
  );
}

export default Deployment;
