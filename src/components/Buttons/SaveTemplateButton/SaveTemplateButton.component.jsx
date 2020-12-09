// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI COMPONENTS
import { PartitionOutlined } from '@ant-design/icons';
import { Button } from 'uiComponents';

/**
 * A button to save deployment template.
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
  } = props;

  // rendering componentSaveTemplateButton
  return (
    <Button type='primary-inverse' shape='round' handleClick={onClick}>
      <PartitionOutlined /> Salvar como template
    </Button>
  );
};

// PROP TYPES
SaveTemplateButton.propTypes = {
  /** */
  onClick: PropTypes.func.isRequired

};

// EXPORT DEFAULT
export default SaveTemplateButton;