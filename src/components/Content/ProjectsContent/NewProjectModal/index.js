// CORE LIBS
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Form as LegacyForm } from '@ant-design/compatible';
import { Modal, Input } from 'antd';

/**
 * New Project Modal.
 * This component is responsible for displaying a new project modal.
 *
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.form
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.form
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.form
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.form
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.form
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.form
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.form
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.form
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.form
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.form
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.form
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 */
const NewProjectModal = ({
  visible,
  loading,
  form,
  title,
  record,
  modalValidateStatus,
  errorMessage,
  handleCloseModal,
  handleNewProject,
  handleUpdateProject,
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

      // handling create new project
      if (record !== undefined) {
        handleUpdateProject(record.uuid, values.name, values.description, true);
      } else {
        handleNewProject(values.name, values.description);
      }
    });
  };

  // RENDER
  return (
    // modal component
    <Modal
      visible={visible}
      title={title}
      okText={record ? 'Salvar' : 'Criar'}
      cancelText='Cancelar'
      onCancel={handleCancel}
      onOk={handleSubmit}
      okButtonProps={{
        disabled: hasErrors(getFieldsError()),
        form: 'newProjectForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      confirmLoading={loading}
      destroyOnClose
    >
      {/* form details */}
      <LegacyForm layout='vertical' onSubmit={handleSubmit}>
        <LegacyForm.Item
          label='Qual o nome do seu projeto?'
          validateStatus={status ? modalValidateStatus : undefined}
          help={status ? errorMessage : undefined}
          autoFocus
          onFocus={(e) => e.target.type === 'text' && e.target.select()}
        >
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Por favor insira um nome para o projeto!',
              },
            ],
            initialValue: record?.name ?? 'Novo Projeto',
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
        </LegacyForm.Item>
        <LegacyForm.Item label='Descrição (Opcional):'>
          {getFieldDecorator('description', {
            rules: [
              {
                required: false,
              },
            ],
            initialValue: record?.description,
          })(<Input.TextArea rows={4} />)}
        </LegacyForm.Item>
      </LegacyForm>
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
export default LegacyForm.create({
  name: 'newProjectForm',
  description: 'newProjectForm',
})(NewProjectModal);
