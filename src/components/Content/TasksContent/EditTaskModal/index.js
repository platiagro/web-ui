// CORE LIBS
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Form as LegacyForm } from '@ant-design/compatible';
import { Modal, Input } from 'antd';

/**
 * Edit Task Modal.
 * This component is responsible for displaying a edit task modal.
 *
 * @param root0
 * @param root0.visible
 * @param root0.initialValues
 * @param root0.handleCloseModal
 * @param root0.handleEditTask
 * @param root0.loading
 * @param root0.form
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0
 * @param root0.visible
 * @param root0.initialValues
 * @param root0.handleCloseModal
 * @param root0.handleEditTask
 * @param root0.loading
 * @param root0.form
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0
 * @param root0.visible
 * @param root0.initialValues
 * @param root0.handleCloseModal
 * @param root0.handleEditTask
 * @param root0.loading
 * @param root0.form
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0
 * @param root0.visible
 * @param root0.initialValues
 * @param root0.handleCloseModal
 * @param root0.handleEditTask
 * @param root0.loading
 * @param root0.form
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0
 * @param root0.visible
 * @param root0.initialValues
 * @param root0.handleCloseModal
 * @param root0.handleEditTask
 * @param root0.loading
 * @param root0.form
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0
 * @param root0.visible
 * @param root0.initialValues
 * @param root0.handleCloseModal
 * @param root0.handleEditTask
 * @param root0.loading
 * @param root0.form
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0
 * @param root0.visible
 * @param root0.initialValues
 * @param root0.handleCloseModal
 * @param root0.handleEditTask
 * @param root0.loading
 * @param root0.form
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0
 * @param root0.visible
 * @param root0.initialValues
 * @param root0.handleCloseModal
 * @param root0.handleEditTask
 * @param root0.loading
 * @param root0.form
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0
 * @param root0.visible
 * @param root0.initialValues
 * @param root0.handleCloseModal
 * @param root0.handleEditTask
 * @param root0.loading
 * @param root0.form
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 */
const EditTaskModal = ({
  visible,
  initialValues,
  handleCloseModal,
  handleEditTask,
  loading,
  form,
  modalValidateStatus,
  errorMessage,
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
      okButtonProps={{
        disabled: hasErrors(getFieldsError()),
        form: 'newEditTaskForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      confirmLoading={loading}
      destroyOnClose
    >
      {/* form details */}
      <LegacyForm id='newEditTaskForm' layout='vertical'>
        {/* name */}
        <LegacyForm.Item
          label='Nome da tarefa?'
          validateStatus={status ? modalValidateStatus : undefined}
          help={status ? errorMessage : undefined}
          autoFocus
          onFocus={(e) => e.target.type === 'text' && e.target.select()}
        >
          {/* configuring name input */}
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Por favor insira um nome para a tarefa!',
              },
            ],
            initialValue: initialValues?.name,
            // name input
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
        {/* description */}
        <LegacyForm.Item label='Descrição (opcional):'>
          {/* description text area */}
          {getFieldDecorator('description', {
            initialValue: initialValues?.description,
          })(<Input.TextArea />)}
        </LegacyForm.Item>
      </LegacyForm>
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
  /** is loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default LegacyForm.create({ name: 'editTaskForm' })(EditTaskModal);
