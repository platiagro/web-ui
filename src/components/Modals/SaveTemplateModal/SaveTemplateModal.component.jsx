import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';

const SaveTemplateModal = ({ visible, loading, onClose, onConfirm }) => {
  const [buttonDisabled, setButtonDisabled] = useState();
  const [form] = Form.useForm();
  const inputNameRef = useRef();

  useEffect(() => {
    if (visible) setTimeout(() => inputNameRef.current.select());
    else setButtonDisabled(false);
  }, [visible]);

  const onValuesChangeForm = (_, allValues) => {
    const isNameEmpty = allValues.name === '';
    setButtonDisabled(isNameEmpty);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onConfirm(values.name);
    });
  };

  return (
    <Modal
      visible={visible}
      title='Novo Template'
      okText='Salvar'
      onOk={handleSubmit}
      cancelText='Cancelar'
      onCancel={onClose}
      okButtonProps={{
        disabled: buttonDisabled,
        loading,
        form: 'saveTemplateForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      <Form
        id='saveTemplateForm'
        layout='vertical'
        form={form}
        preserve={false}
        onValuesChange={onValuesChangeForm}
      >
        <Form.Item
          label='Qual o nome do seu template?'
          name='name'
          initialValue='Novo Template'
          rule={[
            {
              required: true,
              message: 'Por favor insira um nome para o template!',
            },
          ]}
        >
          <Input allowClear ref={inputNameRef} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

SaveTemplateModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default SaveTemplateModal;
