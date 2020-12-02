// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIB COMPONENTS
import { Modal as AntModal } from 'antd';

// STYLES
import './Modal.less';

/**
 * Simple closeable modal based in Ant Design modal.
 *
 * @param {object} props Component props
 *
 * @returns {Modal} Component
 *
 * @component
 *
 * @example
 * // modal child html content
 * const childHtmlContent = <p>Html Content</p>;
 * // modal footer close button text
 * const closeButtonText = 'Close Button Text';
 * // modal close handler
 * const handleClose = () => alert('handleClose');
 * // modal is full screen
 * const isFullScreen = true;
 * // modal is visible
 * const isVisible = true;
 * // modal header title
 * const title = 'This is a modal title!';
 *
 * return (
 *  <Modal
 *    closeButtonText={closeButtonText}
 *    handleClose={handleClose}
 *    isFullScreen={isFullScreen}
 *    isVisible={isVisible}
 *    title={title}
 *  >
 *    {childHtmlContent}
 *  </Modal>
 * );
 */
const Modal = (props) => {
  const {
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
  } = props;

  // modal class name
  const modalClassName = `${className} ${
    isFullScreen ? 'modalFullScreen' : ''
  }`;

  // rendering component
  return (
    <AntModal
      bodyStyle={bodyStyle}
      cancelButtonProps={{ style: { display: 'none' } }}
      centered
      className={modalClassName}
      footer={footer}
      onCancel={handleClose}
      onOk={handleClose}
      okText={closeButtonText}
      title={title}
      visible={isVisible}
      width={width}
    >
      {children}
    </AntModal>
  );
};

// PROP TYPES
Modal.propTypes = {
  /** Modal body style props */
  bodyStyle: PropTypes.object,
  /** Modal child node content */
  children: PropTypes.node.isRequired,
  /** Modal css class */
  className: PropTypes.string,
  /** Modal close button text */
  closeButtonText: PropTypes.string,
  /** Modal footer node content */
  footer: PropTypes.node,
  /** Modal close handler */
  handleClose: PropTypes.func.isRequired,
  /** Modal is full screen */
  isFullScreen: PropTypes.bool.isRequired,
  /** Modal is visible */
  isVisible: PropTypes.bool.isRequired,
  /** Modal header title */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  /** Modal width */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Modal.defaultProps = {
  /** Modal css class */
  className: '',
};

// EXPORT DEFAULT
export default Modal;
