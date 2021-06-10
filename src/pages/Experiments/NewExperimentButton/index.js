import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

import './style.less';

const NewExperimentButton = ({ handleClick, disabled }) => {
  return (
    <Button
      disabled={disabled}
      onClick={handleClick}
      size='small'
      type='add'
      icon={<PlusOutlined />}
      className='new-tab-button'
    />
  );
};

NewExperimentButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default NewExperimentButton;
