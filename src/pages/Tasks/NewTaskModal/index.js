/* eslint-disable jsx-a11y/no-autofocus */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Select } from 'antd';

const { Option } = Select;

const NewTaskModal = ({
  visible,
  loading,
  templates,
  errorMessage,
  copyTaskRecord,
  modalValidateStatus,
  handleNewTask,
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

  const onValuesChangeForm = (changedValues, allValues) => {
    if (allValues.name === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      handleNewTask(values);
    });
  };

  return (
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
      <Form
        id='newTaskForm'
        layout='vertical'
        form={form}
        preserve={false}
        onValuesChange={onValuesChangeForm}
      >
        <Form.Item
          name='template'
          initialValue={copyTaskRecord.uuid || 'uuid'}
          label='Escolha um exemplo ou template para começar:'
          rules={[
            {
              required: true,
              message:
                'Por favor selecione um exemplo ou template para a tarefa!',
            },
          ]}
        >
          <Select>
            {templates.map((template) => (
              <Option key={template.uuid} value={template.uuid}>
                {template.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name='name'
          label='Qual o nome da sua tarefa?'
          help={status ? errorMessage : undefined}
          validateStatus={status ? modalValidateStatus : undefined}
          initialValue={
            copyTaskRecord.name === undefined
              ? copyTaskRecord.name
              : `${copyTaskRecord.name} cópia`
          }
          rules={[
            {
              required: true,
              message: 'Por favor insira um nome para a tarefa!',
            },
          ]}
          autoFocus
        >
          <Input
            ref={inputNameRef}
            onChange={() => {
              setStatus(null);
            }}
            allowClear
            autoFocus
          />
        </Form.Item>

        <Form.Item
          label='Descrição (opcional):'
          name='description'
          initialValue={copyTaskRecord.description}
        >
          <Input.TextArea />
        </Form.Item>

        <p style={{ marginTop: -5 }}>
          <ExclamationCircleOutlined />

          <span style={{ marginLeft: 10 }}>
            Será aberta uma nova aba contendo dois notebooks para edição,
            experimentação e implantação.
          </span>
        </p>
      </Form>
    </Modal>
  );
};

NewTaskModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  templates: PropTypes.array.isRequired,
  errorMessage: PropTypes.string.isRequired,
  copyTaskRecord: PropTypes.object.isRequired,
  modalValidateStatus: PropTypes.string.isRequired,
  handleNewTask: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};

export default NewTaskModal;
