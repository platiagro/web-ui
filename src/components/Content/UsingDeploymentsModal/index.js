import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const deploymentsModal = ({ visible, handleCloseModal, title, children }) => {
  // Function to handle modal cancel
  const handleCancel = () => {
    // closing modal
    handleCloseModal();
  };

  // RENDER
  return (
    // modal component
    <Modal
      visible={visible}
      title={title}
      onOk={handleCancel}
      onCancel={handleCancel}
    >
      {/* Text details */}
      {children}
    </Modal>
  );
};

// PROP TYPES
deploymentsModal.propTypes = {
  /** new project modal visible */
  visible: PropTypes.bool.isRequired,
  /** new project modal close handler */
  handleCloseModal: PropTypes.func.isRequired,
};

// EXPORT
export default deploymentsModal;
