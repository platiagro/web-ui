// REACT LIBS
import React from 'react';

// STYLES
import './styles.less';

/**
 * Implanted experiments empty placeholder.
 *
 * @returns {ImplantedExperimentsEmptyPlaceholder} Component
 * @component
 * @example
 * return <ImplantedExperimentsEmptyPlaceholder />;
 */
const ImplantedExperimentsEmptyPlaceholder = () => {
  // rendering component
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

// EXPORT DEFAULT
export default ImplantedExperimentsEmptyPlaceholder;
