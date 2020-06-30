// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Popover } from 'antd';

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
    <Icon
      style={{ marginLeft: 10, float: 'right', marginTop: '5px' }}
      type='question-circle'
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
