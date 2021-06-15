import React from 'react';
import PropTypes from 'prop-types';

import { ResizableSection } from 'components';

import './PropertiesPanel.component.less';

const PropertiesPanel = ({ children, tip, title }) => {
  return (
    <ResizableSection
      tip={tip}
      title={title || 'Propriedades'}
      placeholder={
        <p className='propertiesPanelEmptySectionPlaceholder'>
          Selecione uma tarefa para visualizar ou editar os parâmetros.
        </p>
      }
    >
      {children}
    </ResizableSection>
  );
};

PropertiesPanel.propTypes = {
  children: PropTypes.node,
  tip: PropTypes.string,
  title: PropTypes.string,
};

PropertiesPanel.defaultProps = {
  resizableContent: undefined,
  tip: undefined,
};

export default PropertiesPanel;
