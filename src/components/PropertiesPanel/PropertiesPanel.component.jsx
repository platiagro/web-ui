import React from 'react';
import PropTypes from 'prop-types';

import { ResizableSection } from 'components';

import './PropertiesPanel.component.less';

const PropertiesPanel = ({
  tip,
  title,
  children,
  isEditingTitle,
  isSavingNewTitle,
  isShowingEditIcon,
  handleStartEditing,
  handleCancelEditing,
  handleSaveModifiedTitle,
}) => {
  return (
    <ResizableSection
      tip={tip}
      title={title || 'Propriedades'}
      isEditingTitle={isEditingTitle}
      isSavingNewTitle={isSavingNewTitle}
      isShowingEditIcon={isShowingEditIcon}
      handleStartEditing={handleStartEditing}
      handleCancelEditing={handleCancelEditing}
      handleSaveModifiedTitle={handleSaveModifiedTitle}
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
  tip: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  isEditingTitle: PropTypes.bool,
  isSavingNewTitle: PropTypes.bool,
  isShowingEditIcon: PropTypes.bool,
  handleStartEditing: PropTypes.func,
  handleCancelEditing: PropTypes.func,
  handleSaveModifiedTitle: PropTypes.func,
};

PropertiesPanel.defaultProps = {
  tip: undefined,
  title: undefined,
  children: undefined,
  isEditingTitle: false,
  isSavingNewTitle: false,
  isShowingEditIcon: true,
  handleStartEditing: undefined,
  handleCancelEditing: undefined,
  handleSaveModifiedTitle: undefined,
};

export default PropertiesPanel;
