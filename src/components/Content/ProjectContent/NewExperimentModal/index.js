// CORE LIBS
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Modal, Form, Input } from 'antd';

/**
 * New Experiment Modal.
 * This component is responsible for displaying a new experiment modal.
 */
const NewExperimentModal = ({
  form,
  loading,
  visible,
  modalValidateStatus,
  errorMessage,
  handleCloseModal,
  handleNewExperiment,
}) => {
  const [status, setStatus] = useState(null);
  const { getFieldDecorator, getFieldsError } = form;

  // did mount hook
  useEffect(() => {
    setStatus(modalValidateStatus);
  }, [modalValidateStatus]);

  // FUNCTIONS
  // Function used to check if form has errors
  const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  };
  // Function to handle modal cancel
  const handleCancel = () => {
    // resetting form fields
    form.resetFields();
    // closing modal
    handleCloseModal();
  };
  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // validating form fields
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // handling create new experiment
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
      onCancel={handleCancel}
      onOk={handleSubmit}
      okButtonProps={{
        disabled: hasErrors(getFieldsError()),
        loading,
        form: 'newExperimentForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      {/* form details */}
      <Form layout='vertical' onSubmit={handleSubmit}>
        <Form.Item
          label='Qual o nome do seu experimento?'
          validateStatus={status ? modalValidateStatus : undefined}
          help={status ? errorMessage : undefined}
          autoFocus
          onFocus={(e) => e.target.type === 'text' && e.target.select()}
        >
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Por favor insira um nome para o experimento!',
              },
            ],
            initialValue: 'Novo Experimento',
          })(
            <Input
              allowClear
              autoFocus
              onChange={() => {
                // remove current status
                setStatus(null);
              }}
            />
          )}
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
  /** new experiment modal form */
  form: PropTypes.objectOf(PropTypes.any).isRequired,
};

// EXPORT
export default Form.create({ name: 'newExperimentForm' })(NewExperimentModal);
