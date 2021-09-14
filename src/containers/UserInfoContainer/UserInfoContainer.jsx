import React, { useEffect } from 'react'
import { UserInfo } from 'components'
import PropTypes from 'prop-types';
import { getName, getUserName } from 'store/userPerfil'
import { useSelector, useDispatch } from 'react-redux';

const UserInfoContainer = ({ avatarBackground, className }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserName())
  }, [dispatch])

  const userName = useSelector(getName);

  return (
    <UserInfo className={className} avatarBackground={avatarBackground} name={userName} />
  )
}

UserInfoContainer.propTypes = {
  className: PropTypes.string,
  avatarBackground: PropTypes.string,
};

UserInfoContainer.defaultProps = {
  className: '',
  avatarBackground: '#ccc',
};

export default UserInfoContainer
