import React from 'react';
import PropTypes from 'prop-types';
import { InfoCircleOutlined } from '@ant-design/icons';

import './style.less';

const InfoButton = ({ onClick, disabled, active }) => {
  const getClassName = () => {
    if (disabled) return 'info-button-disabled';
    else if (active) return 'info-button-active';
    return 'info-button';
  };

  return (
    <button className={getClassName()} onClick={onClick} disabled={disabled}>
      <InfoCircleOutlined />
      Info
    </button>
  );
};

InfoButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

InfoButton.defaultProps = {
  active: false,
  disabled: false,
};

export default InfoButton;
