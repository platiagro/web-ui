import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

import './UserInfo.style.less';

const UserInfo = ({
  className,
  style,
  name,
  avatarBackground,
  avatarColor,
  renderAvatar,
  initialsCount,
}) => {
  const initials = useMemo(() => {
    if (name && name.trim()) {
      const trimmedName = name.trim();
      const wordsArray = trimmedName.split(' ');
      const [firstName] = wordsArray;

      if (initialsCount === 1) return firstName.charAt(0).toUpperCase();
      return firstName.substring(0, 2).toUpperCase();
    }

    return '';
  }, [initialsCount, name]);

  return (
    <div className={`user-info-component ${className}`} style={style}>
      {renderAvatar ? (
        renderAvatar(initials)
      ) : (
        <Avatar
          className='user-info-component-avatar'
          style={{
            color: avatarColor,
            background: avatarBackground,
          }}
        >
          {initials}
        </Avatar>
      )}

      <span className='user-info-component-name'>{name}</span>
    </div>
  );
};

UserInfo.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  name: PropTypes.string,
  avatarBackground: PropTypes.string,
  avatarColor: PropTypes.string,
  renderAvatar: PropTypes.node,
  initialsCount: PropTypes.oneOf([1, 2]),
};

UserInfo.defaultProps = {
  className: '',
  style: undefined,
  name: '',
  avatarBackground: '#ccc',
  avatarColor: 'white',
  renderAvatar: undefined,
  initialsCount: 1,
};

export default UserInfo;
