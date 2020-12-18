// CORE LIBS
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Form, Input, Modal } from 'antd';

/**
 * This component is responsible for displaying deployments new tab modal.
 */
const DeploymentsNewTabModal = (props) => {
  const {
    errorMessage,
    loading,
    onClose,
    onConfirm,
    validateStatus,
    visible,
  } = props;
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [status, setStatus] = useState(null);
  const [form] = Form.useForm();
  const inputNameRef = useRef();

  // did mount hook
  useEffect(() => {
    if (visible) {
      setTimeout(() => inputNameRef.current.select());
    } else {
      setButtonDisabled(false);
    }
    setStatus(validateStatus);
  }, [validateStatus, visible]);

  // FUNCTIONS
  // function to enable or disable submit button
  const onValuesChangeForm = (changedValues, allValues) => {
    if (allValues.name === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };
  // Function to handle form submit
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onConfirm(values.name);
    });
  };

  // RENDER
  return (
    // modal component
    <Modal
      visible={visible}
      title='Novo Monitoramento'
      okText='Criar'
      cancelText='Cancelar'
      onCancel={onClose}
      onOk={handleSubmit}
      okButtonProps={{
        disabled: buttonDisabled,
        loading,
        form: 'newDeploymentTabForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      {/* form details */}
      <Form
        id='newDeploymentTabForm'
        layout='vertical'
        form={form}
        preserve={false}
        onValuesChange={onValuesChangeForm}
      >
        <Form.Item
          label='Qual o nome do seu monitoramento?'
          name='name'
          initialValue='Novo monitoramento'
          rules={[
            {
              required: true,
              message: 'Por favor insira um nome para o monitoramento!',
            },
          ]}
          validateStatus={status ? validateStatus : undefined}
          help={status ? errorMessage : undefined}
          autoFocus
        >
          <Input
            allowClear
            autoFocus
            ref={inputNameRef}
            onChange={() => {
              // remove current status
              setStatus(null);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

// PROP TYPES
DeploymentsNewTabModal.propTypes = {
  /** modal error message */
  errorMessage: PropTypes.string,
  /** is loading */
  loading: PropTypes.string,
  /** modal close handler */
  onClose: PropTypes.func.isRequired,
  /** modal confirm handler */
  onConfirm: PropTypes.func.isRequired,
  /** modal validate status */
  validateStatus: PropTypes.string,
  /** modal visible */
  visible: PropTypes.bool.isRequired,
};

// EXPORT
export default DeploymentsNewTabModal;
