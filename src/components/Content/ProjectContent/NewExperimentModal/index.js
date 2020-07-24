// CORE LIBS
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Form, Input, Modal } from 'antd';

/**
 * New Experiment Modal.
 * This component is responsible for displaying a new experiment modal.
 */
const NewExperimentModal = ({
  loading,
  visible,
  modalValidateStatus,
  errorMessage,
  handleCloseModal,
  handleNewExperiment,
}) => {
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
    setStatus(modalValidateStatus);
  }, [modalValidateStatus, visible]);

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
      handleNewExperiment(values.name);
    });
  };

  // RENDER
  return (
    // modal component
    <Modal
      visible={visible}
      title='Novo Experimento'
      okText='Criar'
      cancelText='Cancelar'
      onCancel={handleCloseModal}
      onOk={handleSubmit}
      okButtonProps={{
        disabled: buttonDisabled,
        loading,
        form: 'newExperimentForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      {/* form details */}
      <Form
        id='newExperimentForm'
        layout='vertical'
        form={form}
        preserve={false}
        onValuesChange={onValuesChangeForm}
      >
        <Form.Item
          label='Qual o nome do seu experimento?'
          name='name'
          initialValue='Novo Experimento'
          rules={[
            {
              required: true,
              message: 'Por favor insira um nome para o experimento!',
            },
          ]}
          validateStatus={status ? modalValidateStatus : undefined}
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
NewExperimentModal.propTypes = {
  /** new experiment modal visible */
  visible: PropTypes.bool.isRequired,
  /** new experiment modal close handler */
  handleCloseModal: PropTypes.func.isRequired,
  /** new experiment modal new experiment handler */
  handleNewExperiment: PropTypes.func.isRequired,
};

// EXPORT
export default NewExperimentModal;
