// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Modal, Form, Input } from 'antd';

/**
 * New Template Modal.
 * This component is responsible for displaying a new template modal.
 */
const NewTemplateModal = ({
  visible,
  loading,
  handleCloseModal,
  handleNewTemplate,
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

      // handling create new template
      handleNewTemplate(values.name);

      // resetting form fields
      form.resetFields();
    });
  };

  // RENDER
  return (
    // modal component
    <Modal
      visible={visible}
      title='Novo Template'
      okText='Salvar'
      cancelText='Cancelar'
      onCancel={handleCancel}
      onOk={handleSubmit}
      okButtonProps={{
        disabled: hasErrors(getFieldsError()),
        loading,
        form: 'newTemplateForm',
        key: 'submit',
        htmlType: 'submit'
      }}
      destroyOnClose
    >
      {/* form details */}
      <Form id='newTemplateForm' layout='vertical'>
        <Form.Item label='Qual o nome do seu template?'
          autoFocus
          onFocus={(e) => e.target.select()}
        >
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Por favor insira um nome para o template!',
              },
            ],
            initialValue: 'Novo Template',
          })(<Input allowClear autoFocus />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

// PROP TYPES
NewTemplateModal.propTypes = {
  /** new template modal visible */
  visible: PropTypes.bool.isRequired,
  /** new template modal close handler */
  handleCloseModal: PropTypes.func.isRequired,
  /** new template modal new template handler */
  handleNewTemplate: PropTypes.func.isRequired,
  /** new template modal form */
  form: PropTypes.objectOf(PropTypes.any).isRequired,
};

// EXPORT
export default Form.create({ name: 'newTemplateForm' })(NewTemplateModal);
