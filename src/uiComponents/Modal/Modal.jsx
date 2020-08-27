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
  // destructuring props
  const {
    children,
    closeButtonText,
    handleClose,
    isFullScreen,
    isVisible,
    title,
    className,
  } = props;

  // modal class name
  const modalClassName = `${className} ${
    isFullScreen ? 'modalFullScreen' : ''
  }`;

  // rendering component
  return (
    <AntModal
      title={title}
      visible={isVisible}
      onOk={handleClose}
      onCancel={handleClose}
      okText={closeButtonText}
      cancelButtonProps={{ style: { display: 'none' } }}
      className={modalClassName}
      centered
    >
      {children}
    </AntModal>
  );
};

// PROP TYPES
Modal.propTypes = {
  /** Modal child node content */
  children: PropTypes.node.isRequired,
  /** Modal close button text */
  closeButtonText: PropTypes.string.isRequired,
  /** Modal close handler */
  handleClose: PropTypes.func.isRequired,
  /** Modal is full screen */
  isFullScreen: PropTypes.bool.isRequired,
  /** Modal is visible */
  isVisible: PropTypes.bool.isRequired,
  /** Modal header title */
  title: PropTypes.string.isRequired,
  /** Modal css class */
  className: PropTypes.string,
};

Modal.defaultProps = {
  /** Modal css class */
  className: '',
};

// EXPORT DEFAULT
export default Modal;
