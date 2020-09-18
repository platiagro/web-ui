// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// ANTD UI LIB COMPONENTS
import { Popconfirm as AntPopconfirm } from 'antd';

/**
 * Simple popconfirm based in Ant Design popconfirm.
 *
 * https://ant.design/components/popconfirm/
 *
 * @param {object} props Component props
 *
 * @returns {Popconfirm} Component
 *
 * @component
 */
const Popconfirm = (props) => {
  // destructuring props
  const { title, handleConfirm, okText, cancelText, children } = props;

  // rendering component
  return (
    <AntPopconfirm
      title={title}
      onConfirm={handleConfirm}
      okText={okText}
      cancelText={cancelText}
    >
      {children}
    </AntPopconfirm>
  );
};

// PROP TYPES
Popconfirm.propTypes = {
  /** Popconfirm cancel button text */
  cancelText: PropTypes.any,
  /** Popconfirm action element / button */
  children: PropTypes.any,
  /** Popconfirm confirmation handler */
  handleConfirm: PropTypes.any,
  /** Popconfirm ok / confirm / submit button text */
  okText: PropTypes.any,
  /** Popconfirm text */
  title: PropTypes.any,
};

// DEFAULT PROPS
Popconfirm.defaultProps = {};

// EXPORT DEFAULT
export default Popconfirm;
