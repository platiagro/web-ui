/* eslint-disable jsx-a11y/no-autofocus */

import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';

const NewExperimentModal = ({
  loading,
  visible,
  errorMessage,
  modalValidateStatus,
  handleCloseModal,
  handleNewExperiment,
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
  }, [modalValidateStatus, visible]);

  const onValuesChangeForm = (_, allValues) => {
    const isNameEmpty = allValues.name === '';
    setButtonDisabled(isNameEmpty);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      handleNewExperiment(values.name);
    });
  };

  return (
    <Modal
      okText='Criar'
      visible={visible}
      onOk={handleSubmit}
      cancelText='Cancelar'
      title='Novo Experimento'
      onCancel={handleCloseModal}
      okButtonProps={{
        loading,
        key: 'submit',
        htmlType: 'submit',
        disabled: buttonDisabled,
        form: 'newExperimentForm',
      }}
      destroyOnClose
    >
      <Form
        id='newExperimentForm'
        form={form}
        preserve={false}
        layout='vertical'
        onValuesChange={onValuesChangeForm}
      >
        <Form.Item
          name='name'
          initialValue='Novo Experimento'
          label='Qual o nome do seu experimento?'
          help={status ? errorMessage : undefined}
          validateStatus={status ? modalValidateStatus : undefined}
          rules={[
            {
              required: true,
              message: 'Por favor insira um nome para o experimento!',
            },
          ]}
          autoFocus
        >
          <Input
            ref={inputNameRef}
            onChange={() => {
              setStatus(null);
            }}
            autoFocus
            allowClear
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

NewExperimentModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  modalValidateStatus: PropTypes.string.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleNewExperiment: PropTypes.func.isRequired,
};

export default NewExperimentModal;
