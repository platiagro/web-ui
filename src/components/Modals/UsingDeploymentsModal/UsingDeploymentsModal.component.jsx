import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const UsingDeploymentsModal = ({
  title,
  visible,
  children,
  handleCloseModal,
}) => {
  return (
    <Modal
      width='800px'
      title={title}
      visible={visible}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      cancelButtonProps={{ style: { display: 'none' }, disabled: true }}
    >
      {children}
    </Modal>
  );
};

UsingDeploymentsModal.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node,
  handleCloseModal: PropTypes.func.isRequired,
};

UsingDeploymentsModal.propTypes = {
  title: undefined,
  children: undefined,
};

export default UsingDeploymentsModal;
