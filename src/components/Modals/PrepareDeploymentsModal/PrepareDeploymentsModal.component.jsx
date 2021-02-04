// CORE LIBS
import PropTypes from 'prop-types';
import React from 'react';

// UI LIBS
import { Modal, Checkbox, Form } from 'antd';
import './style.less';

const PrepareDeploymentsModal = (props) => {
  const { visible, experiments, onClose, onConfirm } = props;
  const [form] = Form.useForm();

  const handleConfirm = () => {
    form.validateFields().then((values) => {
      onConfirm(values);
    });
  };

  return (
    <Modal
      visible={visible}
      title='Preparar para a implantação'
      onOk={handleConfirm}
      onCancel={onClose}
    >
      <p>Selecione os fluxos:</p>

      <Form form={form} name='form_in_modal'>
        {experiments.map((e) => (
          <Form.Item name={e.uuid} valuePropName='checked'>
            <Checkbox key={e.uuid} className='ant-checkbox-group-item'>
              {e.name}
            </Checkbox>
          </Form.Item>
        ))}
      </Form>
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

// DEFAULT PROPS
PrepareDeploymentsModal.defaultProps = {
  experiments: [],
  onConfirm: () => console.log('on Confirm!'),
};

export default PrepareDeploymentsModal;
