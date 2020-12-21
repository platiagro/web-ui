// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI COMPONENTS
import { PartitionOutlined } from '@ant-design/icons';
import { Button } from 'uiComponents';

/**
 * A button to save oeprators template.
 * 
 * @param {*} props Component props
 * 
 * @returns {SaveTemplateButton} Component
 * 
 * @component
 */
const SaveTemplateButton = (props) => {
  // destructuring propsSaveTemplateButton
  const { 
    onClick,
    disabled
  } = props;

  // rendering componentSaveTemplateButton
  return (
    <Button 
      type='primary-inverse'
      shape='round' 
      handleClick={onClick}
      isDisabled={disabled}
    >
      <PartitionOutlined />
      Salvar como template
    </Button>
  );
};

// PROP TYPES
SaveTemplateButton.propTypes = {
  /** click function */
  onClick: PropTypes.func.isRequired,
  /** save template button is disabled */
  disabled: PropTypes.bool.isRequired,
};

// EXPORT DEFAULT
export default SaveTemplateButton;