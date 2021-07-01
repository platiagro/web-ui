import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Modal, Tooltip } from 'antd';
import {
  SendOutlined,
  GlobalOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import './ShareTaskModal.style.less';

const ShareTaskModal = ({
  isShowingModal,
  isSendingTaskViaEmail,
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
          <Tooltip
            title='Para publicar, todos os campos devem estar preenchidos.'
            placement='bottom'
            // TODO: Remove the zIndex prop to show the tooltip
            // TODO: Create the logic to show or hide this tooltip
            zIndex={-1}
          >
            <Tooltip
              // TODO: Remove this tooltip below when the marketplace exists
              placement='right'
              title='Em breve esta funcionalidade estará disponível!'
            >
              <Button
                shape='round'
                type='default'
                icon={<GlobalOutlined />}
                disabled // TODO: Enable if the marketplace exists
              >
                Publicar no Marketplace
              </Button>
            </Tooltip>
          </Tooltip>
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

          <Button
            type='primary'
            htmlType='submit'
            icon={
              isSendingTaskViaEmail ? <LoadingOutlined /> : <SendOutlined />
            }
          >
            Enviar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

ShareTaskModal.propTypes = {
  isShowingModal: PropTypes.bool.isRequired,
  isSendingTaskViaEmail: PropTypes.bool.isRequired,
  handleHideModal: PropTypes.func.isRequired,
  handleSendTaskCopyToEmail: PropTypes.func.isRequired,
};

export default ShareTaskModal;
