import React from 'react';

import './styles.less';

const ImplantedExperimentsEmptyPlaceholder = () => {
  return (
    <div className='implantedExperimentsEmptyPlaceholderContainer'>
      <div className='implantedExperimentsEmptyPlaceholder'>
        <h3>Nenhum fluxo foi implantado</h3>
        <p>
          Implante um <strong>experimento</strong> para começar
        </p>
      </div>
    </div>
  );
};

export default ImplantedExperimentsEmptyPlaceholder;
