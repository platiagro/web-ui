import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const UsingDeploymentsModal = (props) => {
  const { visible, handleCloseModal, title, children } = props;

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
  handleCloseModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
};

UsingDeploymentsModal.propTypes = {
  title: undefined,
  children: undefined,
};

export default UsingDeploymentsModal;
