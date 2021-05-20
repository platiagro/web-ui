/* eslint-disable jsx-a11y/no-autofocus */

import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';

const EditTaskModal = ({
  visible,
  loading,
  errorMessage,
  initialValues,
  modalValidateStatus,
  handleEditTask,
  handleCloseModal,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [status, setStatus] = useState(null);
  const [form] = Form.useForm();
  const inputNameRef = useRef();

  useEffect(() => {
    if (visible) {
      setTimeout(() => inputNameRef.current.select());
    } else {
      setButtonDisabled(false);
    }
    setStatus(modalValidateStatus);
  }, [form, modalValidateStatus, visible]);

  const onValuesChangeForm = (_, allValues) => {
    if (allValues.name === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      handleEditTask(initialValues.uuid, values);
    });
  };

  return (
    <Modal
      visible={visible}
      okText='Confirmar'
      onOk={handleSubmit}
      cancelText='Cancelar'
      onCancel={handleCloseModal}
      title='Alterar Nome e Descrição'
      okButtonProps={{
        disabled: buttonDisabled,
        loading,
        form: 'newEditTaskForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      <Form
        id='newEditTaskForm'
        form={form}
        preserve={false}
        layout='vertical'
        onValuesChange={onValuesChangeForm}
      >
        <Form.Item
          name='name'
          label='Qual o nome da sua tarefa?'
          initialValue={initialValues?.name}
          help={status ? errorMessage : undefined}
          validateStatus={status ? modalValidateStatus : undefined}
          rules={[
            {
              required: true,
              message: 'Por favor insira um nome para a tarefa!',
            },
          ]}
          autoFocus
        >
          <Input
            allowClear
            autoFocus
            ref={inputNameRef}
            onChange={() => {
              setStatus(null);
            }}
          />
        </Form.Item>

        <Form.Item
          label='Descrição (opcional):'
          name='description'
          initialValue={initialValues?.description}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditTaskModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  modalValidateStatus: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleEditTask: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export default EditTaskModal;
