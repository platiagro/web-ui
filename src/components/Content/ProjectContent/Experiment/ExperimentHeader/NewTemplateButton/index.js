// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { ApartmentOutlined } from '@ant-design/icons';
import { Button } from 'antd';

/**
 * New Template Button.
 * This component is responsible for show new template button.
 */
const NewTemplateButton = ({ handleClick, disabled }) => (
  // button component
  <Button
    disabled={disabled}
    onClick={handleClick}
    className='ant-btn-oval'
    type='primary-inverse'
  >
    <ApartmentOutlined />
    Salvar como template
  </Button>
);

// PROP TYPES
NewTemplateButton.propTypes = {
  /** new template button is disabled */
  disabled: PropTypes.bool.isRequired,
  /** new template button click function */
  handleClick: PropTypes.func.isRequired,
};

// EXPORT
export default NewTemplateButton;
