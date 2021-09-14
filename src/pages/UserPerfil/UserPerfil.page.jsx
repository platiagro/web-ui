import React from 'react';

import ContentHeaderContainer from 'components/ContentHeader/ContentHeaderContainer';
import { ChangePasswordModal } from 'components'
import { UserPerfilDataContainer } from 'containers'

import UserPerfilPhoto from './UserPerfilPhoto'

import { useBooleanState } from 'hooks';

import './UserPerfil.style.less';

const UserPerfil = () => {

  const [
    isChangePasswordModal,
    handleShowChangePasswordModal,
    handleHideChangePasswordModal,
  ] = useBooleanState(false);


  return (
    <div className='user-perfil-page'>
      <ChangePasswordModal
        handleHideModal={handleHideChangePasswordModal}
        isShowingModal={isChangePasswordModal}
      />

      <ContentHeaderContainer
        title='Minha conta'
        editable={false}
        backIcon={false}
      />

      <div className='user-perfil-page-content'>
        <div className='user-perfil-page-content-photo'>
          <UserPerfilPhoto />
        </div>
        <div className='user-perfil-page-content-data'>
          <UserPerfilDataContainer
            handleShowChangePasswordModal={handleShowChangePasswordModal}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPerfil;
