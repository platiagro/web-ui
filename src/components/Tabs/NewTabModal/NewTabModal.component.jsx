// CORE LIBS
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Form, Input, Modal } from 'antd';

/**
 * This component is responsible for displaying a new tab modal.
 */
const NewTabModal = (props) => {
  const {
    errorMessage,
    handleCloseModal,
    handleNewTab,
    itemLabel,
    initialValue,
    loading,
    modalValidateStatus,
    ruleMessage,
    title,
    visible,
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
      handleNewTab(values.name);
    });
  };

  // RENDER
  return (
    // modal component
    <Modal
      visible={visible}
      title={title}
      okText='Criar'
      cancelText='Cancelar'
      onCancel={handleCloseModal}
      onOk={handleSubmit}
      okButtonProps={{
        disabled: buttonDisabled,
        loading,
        form: 'newTabForm',
        key: 'submit',
        htmlType: 'submit',
      }}
      destroyOnClose
    >
      {/* form details */}
      <Form
        id='newTabForm'
        layout='vertical'
        form={form}
        preserve={false}
        onValuesChange={onValuesChangeForm}
      >
        <Form.Item
          label={itemLabel}
          name='name'
          initialValue={initialValue}
          rules={[
            {
              required: true,
              message: ruleMessage,
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
            onChange={() => {
              // remove current status
              setStatus(null);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

// PROP TYPES
NewTabModal.propTypes = {
  /** modal error message */
  errorMessage: PropTypes.string,
  /** is loading */
  loading: PropTypes.string,
  /** modal close handler */
  handleCloseModal: PropTypes.func.isRequired,
  /** modal new tab handler */
  handleNewTab: PropTypes.func.isRequired,
  /** modal validate status */
  modalValidateStatus: PropTypes.string,
  /** modal item label */
  itemLabel: PropTypes.string,
  /** modal rule message */
  ruleMessage: PropTypes.string,
  /** modal title */
  title: PropTypes.string,
  /** modal visible */
  visible: PropTypes.bool.isRequired,
};

// EXPORT
export default NewTabModal;
