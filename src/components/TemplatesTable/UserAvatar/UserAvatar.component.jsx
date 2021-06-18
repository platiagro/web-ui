import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import './UserAvatar.style.less';

const UserAvatar = ({ userName, avatarColor }) => {
  const avatarLetter = useMemo(() => {
    return userName?.substr(0, 1).toUpperCase();
  }, [userName]);

  return (
    <div className='userAvatar'>
      <div className='avatar' style={{ backgroundColor: avatarColor }}>
        {avatarLetter}
      </div>

      <div className='name'>{userName}</div>
    </div>
  );
};

UserAvatar.propTypes = {
  avatarColor: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default UserAvatar;
