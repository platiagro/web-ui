import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

// UI LIBS 
import { Form, Input, Modal } from 'antd';

/**
 * This component is responsible for displaying a new template modal.
 * 
 * @param {object} props Component props
 * 
 * @returns {SaveTemplateModal} Component
 * 
 * @component 
 */
const SaveTemplateModal = (props) => {
  const { visible, loading, handleCloseModal, handleSaveTemplate } = props;

  const [buttonDisabled, setButtonDisabled] = useState();
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
  // function to enable or disabel submit button
  const onValuesChangeForm = (changedValues, allValues) => {
    if (allValues.name === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };
  // function to handle form submit
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        handleSaveTemplate(values.name);
      });
  };

  // RENDER
  return (
    <Modal
      visible={visible}
      title='Novo Template'
      okText='Salvar'
      onOk={handleSubmit}
      cancelText='Cancelar'
      onCancel={handleCloseModal}
      okButtonProps={{
        disabled: buttonDisabled,
        loading,
        form: 'saveTemplateForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      {/* form details */}
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
            }
          ]}
        >
          <Input allowClear ref={inputNameRef} />
        </Form.Item>
      </Form>
    </Modal>
  )
};

// PROP TYPES
SaveTemplateModal.propTypes = {
  /** save template modal visible */
  visible: PropTypes.bool.isRequired,
  /** save template modal close handler */
  handleCloseModal: PropTypes.func.isRequired,
  /** save template modal new template handle*/
  handleSaveTemplate: PropTypes.func.isRequired
};

// EXPORT
export default SaveTemplateModal;
