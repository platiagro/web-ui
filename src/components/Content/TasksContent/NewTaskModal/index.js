// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Modal, Form, Input, Radio, Icon } from 'antd';

/**
 * New Task Modal.
 * This component is responsible for displaying a new task modal.
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
  // getting form utils
  const { getFieldDecorator, getFieldsError, setFieldsValue } = form;

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
      form.resetFields();
    });
  };
  // function to change template and reflect in name
  const changeTemplate = (e, f) => {
    setFieldsValue({ name: e.target.label });
    return e.target.value;
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
      okButtonProps={{ disabled: hasErrors(getFieldsError()) }}
      confirmLoading={loading}
    >
      {/* form details */}
      <Form layout='vertical'>
        {/* templates */}
        <Form.Item label='Escolha um exemplo ou template para começar:'>
          {/* configuring template radio input */}
          {getFieldDecorator('template', {
            rules: [
              {
                required: true,
                message:
                  'Por favor selecione um exemplo ou template para a tarefa!',
              },
            ],
            initialValue: templates.length > 0 ? templates[0].uuid : '',
            getValueFromEvent: changeTemplate,
          })(
            // template radio input group
            <Radio.Group
              style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}
            >
              {/* template radio options */}
              {templates.map((template) => (
                <Radio
                  key={template.uuid}
                  value={template.uuid}
                  label={template.name}
                >
                  {template.name}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </Form.Item>
        {/* name */}
        <Form.Item
          label='Qual o nome da sua tarefa?'
          validateStatus={modalValidateStatus}
          help={errorMessage}
        >
          {/* configuring name input */}
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Por favor insira um nome para a tarefa!',
              },
            ],
            initialValue: templates.length > 0 ? templates[0].name : '',
            // name input
          })(<Input allowClear autoFocus />)}
        </Form.Item>
        {/* description */}
        <Form.Item label='Descrição (opcional):'>
          {/* description text area */}
          {getFieldDecorator('description')(<Input.TextArea />)}
        </Form.Item>
        {/* warning */}
        <p style={{ marginTop: -5 }}>
          {/* warning icon */}
          <Icon type='exclamation-circle' />
          {/* warning description */}
          <span style={{ marginLeft: 10 }}>
            Será aberta uma nova aba contendo dois notebooks para edição,
            experimentação e implantação.
          </span>
        </p>
      </Form>
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
export default Form.create({ name: 'newTaskForm' })(NewTaskModal);
