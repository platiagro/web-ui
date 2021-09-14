import React from 'react';

import ContentHeaderContainer from 'components/ContentHeader/ContentHeaderContainer';
import { ChangePasswordModal } from 'components'
import { UserProfileDataContainer } from 'containers'

import UserProfilePhoto from './UserProfilePhoto'

import { useBooleanState } from 'hooks';

import './UserProfile.style.less';

const UserProfile = () => {

  const [
    isChangePasswordModal,
    handleShowChangePasswordModal,
    handleHideChangePasswordModal,
  ] = useBooleanState(false);


  return (
    <div className='user-profile-page'>
      <ChangePasswordModal
        handleHideModal={handleHideChangePasswordModal}
        isShowingModal={isChangePasswordModal}
      />

      <ContentHeaderContainer
        title='Minha conta'
        editable={false}
        backIcon={false}
      />

      <div className='user-profile-page-content'>
        <div className='user-profile-page-content-photo'>
          <UserProfilePhoto />
        </div>
        <div className='user-profile-page-content-data'>
          <UserProfileDataContainer
            handleShowChangePasswordModal={handleShowChangePasswordModal}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
