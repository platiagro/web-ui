// CORE LIBS
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Form as LegacyForm } from '@ant-design/compatible';
import { Modal, Input } from 'antd';

/**
 * New Experiment Modal.
 * This component is responsible for displaying a new experiment modal.
 *
 * @param root0
 * @param root0.form
 * @param root0.loading
 * @param root0.visible
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewExperiment
 * @param root0
 * @param root0.form
 * @param root0.loading
 * @param root0.visible
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewExperiment
 * @param root0
 * @param root0.form
 * @param root0.loading
 * @param root0.visible
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewExperiment
 * @param root0
 * @param root0.form
 * @param root0.loading
 * @param root0.visible
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewExperiment
 * @param root0
 * @param root0.form
 * @param root0.loading
 * @param root0.visible
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewExperiment
 * @param root0
 * @param root0.form
 * @param root0.loading
 * @param root0.visible
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewExperiment
 * @param root0
 * @param root0.form
 * @param root0.loading
 * @param root0.visible
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewExperiment
 * @param root0
 * @param root0.form
 * @param root0.loading
 * @param root0.visible
 * @param root0.modalValidateStatus
 * @param root0.errorMessage
 * @param root0.handleCloseModal
 * @param root0.handleNewExperiment
 */
const NewExperimentModal = ({
  form,
  loading,
  visible,
  modalValidateStatus,
  errorMessage,
  handleCloseModal,
  handleNewExperiment,
}) => {
  const [status, setStatus] = useState(null);
  const { getFieldDecorator, getFieldsError } = form;

  // did mount hook
  useEffect(() => {
    setStatus(modalValidateStatus);
  }, [modalValidateStatus]);

  // FUNCTIONS
  // Function used to check if form has errors
  const hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  };
  // Function to handle modal cancel
  const handleCancel = () => {
    // resetting form fields
    form.resetFields();
    // closing modal
    handleCloseModal();
  };
  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // validating form fields
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // handling create new experiment
      handleNewExperiment(values.name);
    });
  };

  // RENDER
  return (
    // modal component
    <Modal
      visible={visible}
      title='Novo Experimento'
      okText='Criar'
      cancelText='Cancelar'
      onCancel={handleCancel}
      onOk={handleSubmit}
      okButtonProps={{
        disabled: hasErrors(getFieldsError()),
        loading,
        form: 'newExperimentForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      {/* form details */}
      <LegacyForm layout='vertical' onSubmit={handleSubmit}>
        <LegacyForm.Item
          label='Qual o nome do seu experimento?'
          validateStatus={status ? modalValidateStatus : undefined}
          help={status ? errorMessage : undefined}
          autoFocus
          onFocus={(e) => e.target.type === 'text' && e.target.select()}
        >
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Por favor insira um nome para o experimento!',
              },
            ],
            initialValue: 'Novo Experimento',
          })(
            <Input
              allowClear
              autoFocus
              onChange={() => {
                // remove current status
                setStatus(null);
              }}
            />
          )}
        </LegacyForm.Item>
      </LegacyForm>
    </Modal>
  );
};

// PROP TYPES
NewExperimentModal.propTypes = {
  /** new experiment modal visible */
  visible: PropTypes.bool.isRequired,
  /** new experiment modal close handler */
  handleCloseModal: PropTypes.func.isRequired,
  /** new experiment modal new experiment handler */
  handleNewExperiment: PropTypes.func.isRequired,
  /** new experiment modal form */
  form: PropTypes.objectOf(PropTypes.any).isRequired,
};

// EXPORT
export default LegacyForm.create({ name: 'newExperimentForm' })(
  NewExperimentModal
);
