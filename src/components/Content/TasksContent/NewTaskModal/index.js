// CORE LIBS
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Select } from 'antd';

// SELECT COMPONENTS
const { Option } = Select;

/**
 * New Task Modal.
 * This component is responsible for displaying a new task modal.
 */
const NewTaskModal = ({
  visible,
  templates,
  loading,
  modalValidateStatus,
  errorMessage,
  handleCloseModal,
  handleNewTask,
  copyTaskRecord,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [status, setStatus] = useState(null);
  const [form] = Form.useForm();
  const inputNameRef = useRef();

  // did mount hook
  useEffect(() => {
    if (visible) {
      setTimeout(() => inputNameRef.current.select());
    } else {
      setButtonDisabled(false);
    }
    setStatus(modalValidateStatus);
  }, [form, modalValidateStatus, visible]);

  // FUNCTIONS
  // function to enable or disable submit button
  const onValuesChangeForm = (changedValues, allValues) => {
    if (allValues.name === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };
  // Function to handle form submit
  const handleSubmit = () => {
    form.validateFields().then((values) => {
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
      onCancel={handleCloseModal}
      onOk={handleSubmit}
      okButtonProps={{
        disabled: buttonDisabled,
        loading,
        form: 'newTaskForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      {/* form details */}
      <Form
        id='newTaskForm'
        layout='vertical'
        form={form}
        preserve={false}
        onValuesChange={onValuesChangeForm}
      >
        {/* templates */}
        <Form.Item
          label='Escolha um exemplo ou template para começar:'
          name='template'
          initialValue={copyTaskRecord.uuid}
          rules={[
            {
              required: true,
              message:
                'Por favor selecione um exemplo ou template para a tarefa!',
            },
          ]}
        >
          {/*template dropdown select */}
          <Select>
            {/* template options */}
            {templates.map((template) => (
              <Option key={template.uuid} value={template.uuid}>
                {template.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* name */}
        <Form.Item
          label='Qual o nome da sua tarefa?'
          name='name'
          initialValue={`${copyTaskRecord.name} cópia`}
          rules={[
            {
              required: true,
              message: 'Por favor insira um nome para a tarefa!',
            },
          ]}
          validateStatus={status ? modalValidateStatus : undefined}
          help={status ? errorMessage : undefined}
          autoFocus
        >
          <Input
            allowClear
            autoFocus
            ref={inputNameRef}
            onChange={() => {
              // remove current status
              setStatus(null);
            }}
          />
        </Form.Item>
        {/* description */}
        <Form.Item
          label='Descrição (opcional):'
          name='description'
          initialValue={copyTaskRecord.description}
        >
          {/* description text area */}
          <Input.TextArea />
        </Form.Item>
        {/* warning */}
        <p style={{ marginTop: -5 }}>
          {/* warning icon */}
          <ExclamationCircleOutlined />
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
  /** is loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default NewTaskModal;
