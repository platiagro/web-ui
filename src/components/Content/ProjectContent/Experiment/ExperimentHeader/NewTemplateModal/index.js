// CORE LIBS
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Form, Input, Modal } from 'antd';

/**
 * New Template Modal.
 * This component is responsible for displaying a new template modal.
 */
const NewTemplateModal = ({
  visible,
  loading,
  handleCloseModal,
  handleNewTemplate,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [form] = Form.useForm();
  const inputNameRef = useRef();

  // did mount hook
  useEffect(() => {
    if (visible) {
      setTimeout(() => inputNameRef.current.select());
    } else {
      setButtonDisabled(false);
    }
  }, [visible]);

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
      handleNewTemplate(values.name);
    });
  };

  // RENDER
  return (
    // modal component
    <Modal
      visible={visible}
      title='Novo Template'
      okText='Salvar'
      cancelText='Cancelar'
      onCancel={handleCloseModal}
      onOk={handleSubmit}
      okButtonProps={{
        disabled: buttonDisabled,
        loading,
        form: 'newTemplateForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      {/* form details */}
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

// PROP TYPES
NewTemplateModal.propTypes = {
  /** new template modal visible */
  visible: PropTypes.bool.isRequired,
  /** new template modal close handler */
  handleCloseModal: PropTypes.func.isRequired,
  /** new template modal new template handler */
  handleNewTemplate: PropTypes.func.isRequired,
};

// EXPORT
export default NewTemplateModal;
