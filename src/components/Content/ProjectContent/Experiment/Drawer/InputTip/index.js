// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

/**
 * Input Tip.
 * This component is responsible for displaying input tip.
 */
const InputTip = ({ tip, width = 150 }) => (
  // popover component
  <Popover
    overlayStyle={{
      width,
    }}
    content={tip}
    trigger='click'
  >
    {/* icon component */}
    <QuestionCircleOutlined
      style={{ marginLeft: 10, float: 'right', marginTop: '5px' }}
    />
  </Popover>
);

// PROP TYPES
InputTip.propTypes = {
  /** input tip node */
  tip: PropTypes.node.isRequired,
};

// EXPORT
export default InputTip;
