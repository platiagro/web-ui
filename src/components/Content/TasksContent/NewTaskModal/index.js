// CORE LIBS
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon as LegacyIcon, Form as LegacyForm } from '@ant-design/compatible';
import { Modal, Input, Select } from 'antd';

// SELECT COMPONENTS
const { Option } = Select;

/**
 * New Task Modal.
 * This component is responsible for displaying a new task modal.
 *
 * @param root0
 * @param root0.visible
 * @param root0.templates
 * @param root0.form
 * @param root0.loading
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewTask
 * @param root0
 * @param root0.visible
 * @param root0.templates
 * @param root0.form
 * @param root0.loading
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewTask
 * @param root0
 * @param root0.visible
 * @param root0.templates
 * @param root0.form
 * @param root0.loading
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewTask
 * @param root0
 * @param root0.visible
 * @param root0.templates
 * @param root0.form
 * @param root0.loading
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewTask
 * @param root0
 * @param root0.visible
 * @param root0.templates
 * @param root0.form
 * @param root0.loading
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewTask
 * @param root0
 * @param root0.visible
 * @param root0.templates
 * @param root0.form
 * @param root0.loading
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewTask
 * @param root0
 * @param root0.visible
 * @param root0.templates
 * @param root0.form
 * @param root0.loading
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewTask
 * @param root0
 * @param root0.visible
 * @param root0.templates
 * @param root0.form
 * @param root0.loading
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewTask
 * @param root0
 * @param root0.visible
 * @param root0.templates
 * @param root0.form
 * @param root0.loading
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewTask
 */
const NewTaskModal = ({
  visible,
  templates,
  form,
  loading,
  modalValidateStatus,
  errorMessage,
  handleCloseModal,
  handleNewTask,
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
      handleNewTask(values);
    });
  };

  // RENDER
  return (
    // modal component
    <Modal
      visible={visible}
      title='Nova Tarefa'
      okText='Criar Notebooks'
      cancelText='Cancelar'
      onCancel={handleCancel}
      onOk={handleSubmit}
      okButtonProps={{
        disabled: hasErrors(getFieldsError()),
        form: 'newTaskForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      confirmLoading={loading}
      destroyOnClose
    >
      {/* form details */}
      <LegacyForm id='newTaskForm' layout='vertical'>
        {/* templates */}
        <LegacyForm.Item label='Escolha um exemplo ou template para começar:'>
          {/* configuring template radio input */}
          {getFieldDecorator('template', {
            rules: [
              {
                required: true,
                message:
                  'Por favor selecione um exemplo ou template para a tarefa!',
              },
            ],
            initialValue: 'uuid', // this is "template em branco" uuid,
          })(
            // template dropdown select
            <Select>
              {/* template options */}
              {templates.map((template) => (
                <Option key={template.uuid} value={template.uuid}>
                  {template.name}
                </Option>
              ))}
            </Select>
          )}
        </LegacyForm.Item>
        {/* name */}
        <LegacyForm.Item
          label='Qual o nome da sua tarefa?'
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
            initialValue: 'Nova tarefa',
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
          {getFieldDecorator('description')(<Input.TextArea />)}
        </LegacyForm.Item>
        {/* warning */}
        <p style={{ marginTop: -5 }}>
          {/* warning icon */}
          <LegacyIcon type='exclamation-circle' />
          {/* warning description */}
          <span style={{ marginLeft: 10 }}>
            Será aberta uma nova aba contendo dois notebooks para edição,
            experimentação e implantação.
          </span>
        </p>
      </LegacyForm>
    </Modal>
  );
};

// PROP TYPES
NewTaskModal.propTypes = {
  /** new task modal visible */
  visible: PropTypes.bool.isRequired,
  /**  new task modal templates list */
  templates: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** new task modal close handler */
  handleCloseModal: PropTypes.func.isRequired,
  /** new task modal new task handler */
  handleNewTask: PropTypes.func.isRequired,
  /** new task modal form */
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  /** is loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default LegacyForm.create({ name: 'newTaskForm' })(NewTaskModal);
