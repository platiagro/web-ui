import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Button } from 'antd';
import { InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const PopoverTip = ({
  isPopoverBelow,
  popoverTitle,
  popoverText,
  iconType,
}) => {
  const renderPopOverIcon = () => {
    const iconStyle = { lineHeight: '0', margin: '0', padding: '0' };
    if (iconType === 'info') return <InfoCircleOutlined style={iconStyle} />;
    else return <QuestionCircleOutlined style={iconStyle} />;
  };

  return (
    <Popover
      placement={isPopoverBelow ? 'bottomRight' : 'topRight'}
      style={{ margin: '0', padding: '0' }}
      content={<p>{popoverText}</p>}
      title={popoverTitle}
      trigger='hover'
    >
      <Button
        style={{ height: 'auto', color: '#595959', margin: '0', padding: '0' }}
        type='link'
      >
        {renderPopOverIcon()}
      </Button>
    </Popover>
  );
};

PopoverTip.propTypes = {
  isPopoverBelow: PropTypes.bool.isRequired,
  popoverTitle: PropTypes.string.isRequired,
  popoverText: PropTypes.string.isRequired,
  iconType: PropTypes.oneOf(['info', 'question']).isRequired,
};

export default PopoverTip;
