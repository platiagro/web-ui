import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Modal, Tooltip } from 'antd';

import './ChangePasswordModal.style.less';

const ChangePasswordModal = ({
  isShowingModal,
  handleHideModal,
}) => {

  return (
    <Modal
      wrapClassName='change-password-modal'
      visible={isShowingModal}
      onCancel={handleHideModal}
      title='Trocar senha'
      bodyStyle={{ padding: '16px' }}
      footerStyle={{ textAlign: 'left' }}
      footer={
        <div className='change-password-modal-footer'>
          <Button
            shape='round'
            type='default'
            onClick={handleHideModal}
          >
            Cancelar
          </Button>
          <Tooltip
            title='Para publicar, todos os campos devem estar preenchidos.'
            placement='bottom'
            zIndex={-1}
          >
            <Tooltip
              // TODO: Remove this tooltip below when change password exists
              placement='right'
              title='Em breve esta funcionalidade estará disponível!'
            >
              <Button
                shape='round'
                type='default'
                disabled // TODO: Enable if change password exists
              >
                Confirmar
              </Button>
            </Tooltip>
          </Tooltip>
        </div>
      }
      centered
    >
      <form noValidate>

        <label className='change-password-modal-label' htmlFor='changePassoword'>
          Senha atual
        </label>

        <div className='change-password-modal-input-container'>
          <Input
            size='middle'
            id='currentPassword'
          />
        </div>

        <label className='change-password-modal-label' htmlFor='changePassoword'>
          Nova senha
        </label>

        <div className='change-password-modal-input-container'>
          <Input
            size='middle'
            id='newPassword'
          />
        </div>

        <label className='change-password-modal-label' htmlFor='changePassoword'>
          Confirmação de senha
        </label>

        <div className='change-password-modal-input-container'>
          <Input
            size='middle'
            id='newPasswordConfirmed'
            placeholder='Repita a senha nova'
          />
        </div>
      </form>
    </Modal>
  );
};

ChangePasswordModal.propTypes = {
  isShowingModal: PropTypes.bool.isRequired,
  handleHideModal: PropTypes.func.isRequired,
};

export default ChangePasswordModal;
