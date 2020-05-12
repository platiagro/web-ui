// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Modal, Form, Input } from 'antd';

/**
 * New Project Modal.
 * This component is responsible for displaying a new project modal.
 */
const NewProjectModal = ({
  visible,
  loading,
  handleCloseModal,
  handleNewProject,
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

      // handling create new project
      handleNewProject(values.name);

      // resetting form fields
      form.resetFields();
    });
  };

  // RENDER
  return (
    // modal component
    <Modal
      visible={visible}
      title='Novo Projeto'
      okText='Criar'
      cancelText='Cancelar'
      onCancel={handleCancel}
      onOk={handleSubmit}
      okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
      confirmLoading={loading}
    >
      {/* form details */}
      <Form layout='vertical'>
        <Form.Item label='Qual o nome do seu projeto?'>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Por favor insira um nome para o projeto!',
              },
            ],
            initialValue: 'Novo Projeto',
          })(<Input allowClear autoFocus />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

// PROP TYPES
NewProjectModal.propTypes = {
  /** new project modal visible */
  visible: PropTypes.bool.isRequired,
  /** new project modal close handler */
  handleCloseModal: PropTypes.func.isRequired,
  /** new project modal new project handler */
  handleNewProject: PropTypes.func.isRequired,
  /** new project modal form */
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  /** is loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default Form.create({ name: 'newProjectForm' })(NewProjectModal);
