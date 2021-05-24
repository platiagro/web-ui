/* eslint-disable jsx-a11y/no-autofocus */

import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';

const NewProjectModal = ({
  title,
  record,
  visible,
  loading,
  modalValidateStatus,
  errorMessage,
  handleCloseModal,
  handleNewProject,
  handleUpdateProject,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [status, setStatus] = useState(null);
  const [form] = Form.useForm();
  const inputNameRef = useRef();

  useEffect(() => {
    if (visible) setTimeout(() => inputNameRef.current.select());
    else setButtonDisabled(false);

    setStatus(modalValidateStatus);
  }, [modalValidateStatus, visible]);

  const onValuesChangeForm = (_, allValues) => {
    const isNameEmpty = allValues.name === '';
    setButtonDisabled(isNameEmpty);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (record) {
        handleUpdateProject(record.uuid, values.name, values.description, true);
      } else {
        handleNewProject(values.name, values.description);
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
    else if (e.key === 'Escape') handleCloseModal();
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleSubmit}
      cancelText='Cancelar'
      onCancel={handleCloseModal}
      okText={record ? 'Salvar' : 'Criar'}
      okButtonProps={{
        disabled: buttonDisabled,
        loading,
        form: 'newProjectForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      <Form
        id='projectForm'
        form={form}
        preserve={false}
        layout='vertical'
        onValuesChange={onValuesChangeForm}
      >
        <Form.Item
          name='name'
          label='Qual o nome do seu projeto?'
          help={status ? errorMessage : undefined}
          initialValue={record?.name ?? 'Novo Projeto'}
          validateStatus={status ? modalValidateStatus : undefined}
          rules={[
            {
              required: true,
              message: 'Por favor insira um nome para o projeto!',
            },
          ]}
          autoFocus
        >
          <Input
            allowClear
            autoFocus
            ref={inputNameRef}
            onKeyUp={handleKeyPress}
            onChange={() => {
              setStatus(null);
            }}
          />
        </Form.Item>

        <Form.Item
          label='Descrição (Opcional):'
          name='description'
          initialValue={record?.description}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

NewProjectModal.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  record: PropTypes.object.isRequired,
  errorMessage: PropTypes.string.isRequired,
  modalValidateStatus: PropTypes.string.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleNewProject: PropTypes.func.isRequired,
  handleUpdateProject: PropTypes.func.isRequired,
};

export default NewProjectModal;
