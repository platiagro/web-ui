// CORE LIBS
import PropTypes from 'prop-types';
import React from 'react';

// UI LIBS
import { Modal } from 'antd';

const UsingDeploymentsModal = (props) => {
  const { visible, handleCloseModal, title, children } = props;
  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <Modal
      visible={visible}
      title={title}
      onOk={handleCancel}
      onCancel={handleCancel}
      width='800px'
      cancelButtonProps={{ style: { display: 'none' }, disabled: true }}
    >
      {/* Text details */}
      {children}
    </Modal>
  );
};

// PROP TYPES
UsingDeploymentsModal.propTypes = {
  /** new project modal close handler */
  handleCloseModal: PropTypes.func.isRequired,
  /** new project modal visible */
  visible: PropTypes.bool.isRequired,
};

// EXPORT
export default UsingDeploymentsModal;
