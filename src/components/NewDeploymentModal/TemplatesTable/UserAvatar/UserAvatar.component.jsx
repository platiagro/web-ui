import PropTypes from 'prop-types';
import React from 'react';

import './UserAvatar.style.less';

/**
 * Componente de avatar de usuário
 */
function UserAvatar(props) {
  const { userName, avatarColor } = props;

  const avatarLetter = userName?.substr(0, 1).toUpperCase();

  return (
    <div className='userAvatar'>
      <div className='avatar' style={{ backgroundColor: avatarColor }}>
        {avatarLetter}
      </div>
      <div className='name'>{userName}</div>
    </div>
  );
}

UserAvatar.propTypes = {
  avatarColor: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default UserAvatar;
