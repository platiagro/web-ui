// CORE LIBS
import PropTypes from 'prop-types';
import React from 'react';

// UI LIBS
import { Modal, Checkbox } from 'antd';
import './style.less';

const PrepareDeploymentsModal = (props) => {
  const { visible, experiments, onClose, onConfirm } = props;
  return (
    <Modal
      visible={visible}
      title='Preparar para a implantação'
      onOk={onConfirm}
      onCancel={onClose}
    >
      <p>Selecione os fluxos:</p>

      {experiments.map((e) => (
        <Checkbox key={e.uuid} className='ant-checkbox-group-item'>
          {e.name}
        </Checkbox>
      ))}
    </Modal>
  );
};

// PROP TYPES
PrepareDeploymentsModal.propTypes = {
  /** modal visible */
  visible: PropTypes.bool.isRequired,
  /** is loading */
  loading: PropTypes.string,
  /** experiments list */
  experiments: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** modal close handler */
  onClose: PropTypes.func.isRequired,
  /** modal confirm handler */
  onConfirm: PropTypes.func.isRequired,
};

export default PrepareDeploymentsModal;
