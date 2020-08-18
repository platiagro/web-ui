// CORE LIBS
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Form, Input, Modal } from 'antd';

/**
 * New Project Modal.
 * This component is responsible for displaying a new project modal.
 *
 * @component
 * @param {object} props Component props
 * @returns {NewProjectModal} React component
 */
const NewProjectModal = (props) => {
  // destructuring props
  const {
    visible,
    loading,
    title,
    record,
    modalValidateStatus,
    errorMessage,
    handleCloseModal,
    handleNewProject,
    handleUpdateProject,
    beforeSubmit,
  } = props;

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
  }, [modalValidateStatus, visible]);

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
      // handling create new project
      if (record !== undefined) {
        handleUpdateProject(record.uuid, values.name, values.description, true);
      } else {
        handleNewProject(values.name, values.description);
      }
    });
  };

  // FUNCTION KEYS
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  // RENDER
  return (
    // modal component
    <Modal
      visible={visible}
      title={title}
      okText={record ? 'Salvar' : 'Criar'}
      cancelText='Cancelar'
      onCancel={handleCloseModal}
      onOk={handleSubmit}
      okButtonProps={{
        disabled: buttonDisabled,
        loading,
        form: 'newProjectForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      {/* form details */}
      <Form
        id='projectForm'
        layout='vertical'
        form={form}
        preserve={false}
        onValuesChange={onValuesChangeForm}
      >
        <Form.Item
          label='Qual o nome do seu projeto?'
          name='name'
          initialValue={record?.name ?? 'Novo Projeto'}
          rules={[
            {
              required: true,
              message: 'Por favor insira um nome para o projeto!',
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
            onKeyUp={handleKeyPress}
            onChange={() => {
              // remove current status
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

// PROP TYPES
NewProjectModal.propTypes = {
  /** new project modal visible */
  visible: PropTypes.bool.isRequired,
  /** new project modal close handler */
  handleCloseModal: PropTypes.func.isRequired,
  /** new project modal new project handler */
  handleNewProject: PropTypes.func.isRequired,
  /** is loading */
  loading: PropTypes.bool.isRequired,
};

// EXPORT
export default NewProjectModal;
