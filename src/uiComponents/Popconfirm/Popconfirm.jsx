import React from 'react';
import PropTypes from 'prop-types';
import { Popconfirm as AntPopconfirm } from 'antd';

const Popconfirm = ({ title, handleConfirm, okText, cancelText, children }) => {
  return (
    <AntPopconfirm
      title={title}
      okText={okText}
      cancelText={cancelText}
      onConfirm={handleConfirm}
    >
      {children}
    </AntPopconfirm>
  );
};

Popconfirm.propTypes = {
  cancelText: PropTypes.any,
  children: PropTypes.any,
  handleConfirm: PropTypes.any,
  okText: PropTypes.any,
  title: PropTypes.any,
};

export default Popconfirm;
