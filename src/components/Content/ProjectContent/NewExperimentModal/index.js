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
  visible,
  handleCloseModal,
  handleNewExperiment,
  form,
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
      handleNewExperiment(values.name);

      handleCancel();
    });
  };

  // TODO: corrigir envio ao pressionar enter
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
      okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
    >
      {/* form details */}
      <Form layout='vertical'>
        <Form.Item label='Qual o nome do seu experimento?'>
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
