// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { ResizableSection } from 'components';

/**
 * Component to display properties panel.
 */
const PropertiesPanel = (props) => {
  const { resizableContent, tip, title } = props;

  const emptySectionPlaceholder = (
    <p style={{ textAlign: 'center', padding: '20px' }}>
      Selecione uma tarefa para visualizar ou editar os parâmetros.
    </p>
  );

  return (
    <ResizableSection
      placeholder={emptySectionPlaceholder}
      tip={tip}
      title={title || 'Propriedades'}
    >
      {resizableContent}
    </ResizableSection>
  );
};

// PROP TYPES
PropertiesPanel.propTypes = {
  /** Elemento html ou componente react */
  resizableContent: PropTypes.node,
  /** tip */
  tip: PropTypes.string,
  /** title */
  title: PropTypes.string,
};

// DEFAULT PROPS
PropertiesPanel.defaultProps = {
  resizableContent: undefined,
  tip: undefined,
};

// EXPORT DEFAULT
export default PropertiesPanel;
