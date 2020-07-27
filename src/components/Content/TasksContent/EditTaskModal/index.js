// CORE LIBS
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Form, Input, Modal } from 'antd';

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
  modalValidateStatus,
  errorMessage,
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
      onCancel={handleCloseModal}
      onOk={handleSubmit}
      okButtonProps={{
        disabled: buttonDisabled,
        loading,
        form: 'newEditTaskForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      {/* form details */}
      <Form
        id='newEditTaskForm'
        layout='vertical'
        form={form}
        preserve={false}
        onValuesChange={onValuesChangeForm}
      >
        {/* name */}
        <Form.Item
          label='Qual o nome da sua tarefa?'
          name='name'
          initialValue={initialValues?.name}
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
          initialValue={initialValues?.description}
        >
          {/* description text area */}
          <Input.TextArea />
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
  /** is loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default EditTaskModal;
