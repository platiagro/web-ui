import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const TooltipTip = ({ isTooltipBelow, tooltipText, iconType }) => {
  const renderToolTipIcon = () => {
    const iconStyle = { lineHeight: '0', margin: '0', padding: '0' };
    if (iconType === 'info') return <InfoCircleOutlined style={iconStyle} />;
    else return <QuestionCircleOutlined style={iconStyle} />;
  };

  return (
    <Tooltip
      placement={isTooltipBelow ? 'bottomRight' : 'topRight'}
      style={{ margin: '0', padding: '0' }}
      title={tooltipText}
      trigger='hover'
    >
      {renderToolTipIcon()}
    </Tooltip>
  );
};

TooltipTip.propTypes = {
  isTooltipBelow: PropTypes.bool.isRequired,
  tooltipText: PropTypes.string.isRequired,
  iconType: PropTypes.oneOf(['info', 'question']).isRequired,
};

export default TooltipTip;
