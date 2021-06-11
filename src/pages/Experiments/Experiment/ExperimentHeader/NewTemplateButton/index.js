import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { ApartmentOutlined } from '@ant-design/icons';

const NewTemplateButton = ({ handleClick, disabled }) => (
  <Button
    type='primary-inverse'
    onClick={handleClick}
    disabled={disabled}
    shape='round'
  >
    <ApartmentOutlined />
    Salvar como template
  </Button>
);

NewTemplateButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default NewTemplateButton;
