/* eslint-disable jsx-a11y/no-autofocus */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Modal } from 'antd';

const NewTemplateModal = ({
  visible,
  loading,
  handleCloseModal,
  handleNewTemplate,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [form] = Form.useForm();
  const inputNameRef = useRef();

  useEffect(() => {
    if (visible) {
      setTimeout(() => inputNameRef.current.select());
    } else {
      setButtonDisabled(false);
    }
  }, [visible]);

  const onValuesChangeForm = (changedValues, allValues) => {
    if (allValues.name === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      handleNewTemplate(values.name);
    });
  };

  return (
    <Modal
      visible={visible}
      title='Novo Template'
      cancelText='Cancelar'
      onCancel={handleCloseModal}
      okText='Salvar'
      onOk={handleSubmit}
      okButtonProps={{
        loading,
        key: 'submit',
        htmlType: 'submit',
        form: 'newTemplateForm',
        disabled: buttonDisabled,
      }}
      destroyOnClose
    >
      <Form
        id='newTemplateForm'
        layout='vertical'
        form={form}
        preserve={false}
        onValuesChange={onValuesChangeForm}
      >
        <Form.Item
          label='Qual o nome do seu template?'
          name='name'
          initialValue='Novo Template'
          rules={[
            {
              required: true,
              message: 'Por favor insira um nome para o template!',
            },
          ]}
          autoFocus
        >
          <Input allowClear autoFocus ref={inputNameRef} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

NewTemplateModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleNewTemplate: PropTypes.func.isRequired,
};

export default NewTemplateModal;
