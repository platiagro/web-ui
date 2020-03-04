// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Modal, Form, Input, Radio } from 'antd';

/**
 * New Task Modal.
 * This component is responsible for displaying a new task modal.
 */
const NewTaskModal = ({
  visible,
  templates,
  handleCloseModal,
  handleNewTask,
  form,
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
    });
  };
  const changeTemplate = (e, f) => {
    setFieldsValue({ name: e.target.label });
    return e.target.value;
  };

  // TODO: corrigir envio ao pressionar enter
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
    >
      {/* form details */}
      <Form layout='vertical'>
        {/* templates */}
        <Form.Item label='Escolha um exemplo ou template para começar:'>
          {getFieldDecorator('template', {
            rules: [
              {
                required: true,
                message:
                  'Por favor selecione um exemplo ou template para a tarefa!',
              },
            ],
            initialValue: templates[0].uuid,
            getValueFromEvent: changeTemplate,
          })(
            <Radio.Group
              style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}
            >
              {templates.map((template) => (
                <Radio value={template.uuid} label={template.name}>
                  {template.name}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </Form.Item>
        {/* name */}
        <Form.Item label='Qual o nome da sua tarefa?'>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Por favor insira um nome para a tarefa!',
              },
            ],
            initialValue: templates[0].name,
          })(<Input allowClear autoFocus />)}
        </Form.Item>
        <Form.Item label='Descrição (opcional):'>
          {getFieldDecorator('description')(<Input.TextArea />)}
        </Form.Item>
      </Form>
    </Modal>
  );
};

// PROP TYPES
NewTaskModal.propTypes = {
  /** new project modal visible */
  visible: PropTypes.bool.isRequired,
  /** new project modal close handler */
  handleCloseModal: PropTypes.func.isRequired,
  /** new project modal new project handler */
  handleNewTask: PropTypes.func.isRequired,
  /** new project modal form */
  form: PropTypes.objectOf(PropTypes.any).isRequired,
};

// EXPORT
export default Form.create({ name: 'newProjectForm' })(NewTaskModal);
