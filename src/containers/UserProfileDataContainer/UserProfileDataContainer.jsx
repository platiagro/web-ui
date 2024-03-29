import React from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUserData } from 'store/userProfile'

const UserProfileDataContainer = ({ handleShowChangePasswordModal }) => {
  const userData = useSelector(getUserData);

  return (
    <div className='user-profile-data-form'>
      <div>
        <b>Nome</b>
        <span>{userData?.userName}</span>
      </div>

      <div>
        <b>E-mail</b>
        <span>{userData?.userEmail}</span>
      </div>

      <div>
        <b>Login</b>
        <span>{userData?.userLogin}</span>
      </div>

      <div>
        <b>Senha</b>
        <Button onClick={handleShowChangePasswordModal} shape="round" type='primary-inverse'>Trocar senha</Button>
      </div >
    </div>
  )
}

UserProfileDataContainer.propTypes = {
  handleShowChangePasswordModal: PropTypes.func.isRequired,
};

export default UserProfileDataContainer
