// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { ResizableSection } from 'components';

// STYLES
import './PropertiesPanel.component.less';

/**
 * Component to display properties panel.
 */
const PropertiesPanel = (props) => {
  const { children, tip, title } = props;

  const emptySectionPlaceholder = (
    <p className='propertiesPanelEmptySectionPlaceholder'>
      Selecione uma tarefa para visualizar ou editar os parâmetros.
    </p>
  );

  return (
    <ResizableSection
      placeholder={emptySectionPlaceholder}
      tip={tip}
      title={title || 'Propriedades'}
    >
      {children}
    </ResizableSection>
  );
};

// PROP TYPES
PropertiesPanel.propTypes = {
  /** Elemento html ou componente react */
  children: PropTypes.node,
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
