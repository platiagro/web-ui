// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Form as LegacyForm } from '@ant-design/compatible';
import { Modal, Input } from 'antd';

/**
 * New Template Modal.
 * This component is responsible for displaying a new template modal.
 *
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.handleCloseModal
 * @param root0.handleNewTemplate
 * @param root0.form
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.handleCloseModal
 * @param root0.handleNewTemplate
 * @param root0.form
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.handleCloseModal
 * @param root0.handleNewTemplate
 * @param root0.form
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.handleCloseModal
 * @param root0.handleNewTemplate
 * @param root0.form
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.handleCloseModal
 * @param root0.handleNewTemplate
 * @param root0.form
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.handleCloseModal
 * @param root0.handleNewTemplate
 * @param root0.form
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
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      {/* form details */}
      <LegacyForm id='newTemplateForm' layout='vertical'>
        <LegacyForm.Item
          label='Qual o nome do seu template?'
          autoFocus
          onFocus={(e) => e.target.type === 'text' && e.target.select()}
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
        </LegacyForm.Item>
      </LegacyForm>
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
export default LegacyForm.create({ name: 'newTemplateForm' })(NewTemplateModal);
