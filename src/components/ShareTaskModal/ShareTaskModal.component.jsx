import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Modal } from 'antd';
import { SendOutlined, GlobalOutlined } from '@ant-design/icons';

import './ShareTaskModal.style.less';

const ShareTaskModal = ({
  isShowingModal,
  handleHideModal,
  handleSendTaskCopyToEmail,
}) => {
  const emailRef = useRef(null);

  const getValues = () => {
    const email = emailRef.current?.state?.value || '';

    return {
      email,
    };
  };

  const handleValidateEmail = () => {
    const { email } = getValues();
    if (email.trim()) return true;
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleSendTaskCopyToEmail && handleValidateEmail()) {
      const { email } = getValues();
      handleSendTaskCopyToEmail(email);
    }
  };

  return (
    <Modal
      wrapClassName='share-task-modal'
      visible={isShowingModal}
      onCancel={handleHideModal}
      title='Compartilhar Tarefa'
      bodyStyle={{ padding: '16px' }}
      footerStyle={{ textAlign: 'left' }}
      footer={
        <div className='share-task-modal-footer'>
          <Button
            shape='round'
            type='default'
            icon={<GlobalOutlined />}
            disabled // TODO: Enable if the marketplace exists
          >
            Publicar no Marketplace
          </Button>
        </div>
      }
      centered
    >
      <form onSubmit={handleSubmit} noValidate>
        <label className='share-task-modal-label' htmlFor='shareTaskEmail'>
          Enviar uma cópia para o e-mail:
        </label>

        <div className='share-task-modal-input-container'>
          <Input
            ref={emailRef}
            type='email'
            size='middle'
            id='shareTaskEmail'
            placeholder='Ex: e-mail@email.com'
          />

          <Button type='primary' htmlType='submit' icon={<SendOutlined />}>
            Enviar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

ShareTaskModal.propTypes = {
  isShowingModal: PropTypes.bool.isRequired,
  handleHideModal: PropTypes.func.isRequired,
  handleSendTaskCopyToEmail: PropTypes.func.isRequired,
};

export default ShareTaskModal;
