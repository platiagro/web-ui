// CORE LIBS
import React from 'react';
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
  // getting form utils
  const { getFieldDecorator, getFieldsError } = form;

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

      // resetting form fields
      form.resetFields();
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
      }}
      destroyOnClose
    >
      {/* form details */}
      <Form layout='vertical'>
        <Form.Item
          label='Qual o nome do seu experimento?'
          validateStatus={modalValidateStatus}
          help={errorMessage}
          autoFocus
          onFocus={(e) => e.target.select()}
        >
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Por favor insira um nome para o experimento!',
              },
            ],
            initialValue: 'Novo Experimento',
          })(<Input allowClear autoFocus />)}
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
