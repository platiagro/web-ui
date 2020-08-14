// CORE LIBS
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Form, Input, Modal } from 'antd';

/**
 * New Project Modal.
 * This component is responsible for displaying a new project modal.
 *
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0.beforeSubmit
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0.beforeSubmit
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0.beforeSubmit
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0.beforeSubmit
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0.beforeSubmit
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0.beforeSubmit
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0.beforeSubmit
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0.beforeSubmit
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0.beforeSubmit
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0.beforeSubmit
 * @param root0
 * @param root0.visible
 * @param root0.loading
 * @param root0.title
 * @param root0.record
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewProject
 * @param root0.handleUpdateProject
 * @param root0.beforeSubmit
 */
const NewProjectModal = ({
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
      e.currentTarget.blur();
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
            onBlur={handleSubmit}
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
