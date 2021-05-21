import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Checkbox, Form } from 'antd';

import './style.less';

const PrepareDeploymentsModal = ({
  visible,
  experiments,
  onClose,
  onConfirm,
}) => {
  const [form] = Form.useForm();

  const handleConfirm = () => {
    form.validateFields().then((values) => {
      onConfirm(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title='Preparar para a implantação'
      onOk={handleConfirm}
      onCancel={onClose}
      visible={visible}
    >
      <p>Selecione os fluxos:</p>

      <Form form={form} name='form_in_modal'>
        {experiments.map((e) => (
          <Form.Item key={e.uuid} name={e.uuid} valuePropName='checked'>
            <Checkbox className='ant-checkbox-group-item'>{e.name}</Checkbox>
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

PrepareDeploymentsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  experiments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

PrepareDeploymentsModal.defaultProps = {
  experiments: [],
  onConfirm: () => console.log('on Confirm!'),
};

export default PrepareDeploymentsModal;
