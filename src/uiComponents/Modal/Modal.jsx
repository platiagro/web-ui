import React from 'react';
import PropTypes from 'prop-types';
import { Modal as AntModal } from 'antd';

import './Modal.less';

const Modal = ({
  bodyStyle,
  children,
  className,
  closeButtonText,
  footer,
  handleClose,
  isFullScreen,
  isVisible,
  title,
  width,
}) => {
  const modalClassName = `${className} ${
    isFullScreen ? 'modalFullScreen' : ''
  }`;

  return (
    <AntModal
      cancelButtonProps={{ style: { display: 'none' } }}
      className={modalClassName}
      okText={closeButtonText}
      onCancel={handleClose}
      bodyStyle={bodyStyle}
      visible={isVisible}
      onOk={handleClose}
      footer={footer}
      title={title}
      width={width}
      centered
    >
      {children}
    </AntModal>
  );
};

Modal.propTypes = {
  bodyStyle: PropTypes.object,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeButtonText: PropTypes.string,
  footer: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Modal.defaultProps = {
  className: '',
};

export default Modal;
