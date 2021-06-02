import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const NotebooksExplanationModal = ({ isShowingModal, handleHideModal }) => {
  // TODO: Add a good explanation here

  return (
    <Modal
      wrapClassName='notebooks-explanation-modal'
      title='Saiba Mais Sobre Notebooks'
      bodyStyle={{ padding: '24px' }}
      okText='Ok'
      onOk={handleHideModal}
      visible={isShowingModal}
      onCancel={handleHideModal}
      cancelButtonProps={{
        style: { display: 'none' },
      }}
      centered
    >
      As tarefas na PlatIAgro têm dois Notebooks Jupyter associados a elas, um
      específico para a etapa de Experimentação e outro para a etapa de
      Pré-implantação, com características próprias para cada cenário.
    </Modal>
  );
};

NotebooksExplanationModal.propTypes = {
  isShowingModal: PropTypes.bool.isRequired,
  handleHideModal: PropTypes.func.isRequired,
};

export default NotebooksExplanationModal;
