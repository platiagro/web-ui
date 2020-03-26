// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Modal, Form, Input } from 'antd';

/**
 * Edit Task Modal.
 * This component is responsible for displaying a edit task modal.
 */
const EditTaskModal = ({
  visible,
  initialValues,
  handleCloseModal,
  handleEditTask,
  loading,
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
      handleEditTask(initialValues.uuid, values);
    });
  };

  // RENDER
  return (
    // modal component
    <Modal
      visible={visible}
      title='Alterar Nome e Descrição'
      okText='Confirmar'
      cancelText='Cancelar'
      onCancel={handleCancel}
      onOk={handleSubmit}
      okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
      confirmLoading={loading}
    >
      {/* form details */}
      <Form layout='vertical'>
        {/* name */}
        <Form.Item label='Nome da tarefa?'>
          {/* configuring name input */}
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Por favor insira um nome para a tarefa!',
              },
            ],
            initialValue: initialValues.name,
            // name input
          })(<Input allowClear autoFocus />)}
        </Form.Item>
        {/* description */}
        <Form.Item label='Descrição (opcional):'>
          {/* description text area */}
          {getFieldDecorator('description', {
            initialValue: initialValues.description,
          })(<Input.TextArea />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

// PROP TYPES
EditTaskModal.propTypes = {
  /** edit task modal visible */
  visible: PropTypes.bool.isRequired,
  /**  edit task modal templates list */
  initialValues: PropTypes.objectOf(PropTypes.any).isRequired,
  /** edit task modal close handler */
  handleCloseModal: PropTypes.func.isRequired,
  /** edit task modal edit task handler */
  handleEditTask: PropTypes.func.isRequired,
  /** edit task modal form */
  form: PropTypes.objectOf(PropTypes.any).isRequired,
};

// EXPORT
export default Form.create({ name: 'editTaskForm' })(EditTaskModal);
