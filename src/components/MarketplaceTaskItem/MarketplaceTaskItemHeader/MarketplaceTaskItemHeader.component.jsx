import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Avatar, Typography } from 'antd';

import './MarketplaceTaskItemHeader.style.less';

const MarketplaceTaskItemHeader = ({
  name,
  userId,
  userName,
  imageSrc,
  avatarColor,
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='marketplace-task-item-header'>
      <Avatar
        className='marketplace-task-item-header-avatar'
        style={{ backgroundColor: avatarColor }}
        src={imageSrc}
        alt={name}
        size={48}
      >
        {name.charAt(0)}
      </Avatar>

      <div className='marketplace-task-item-header-data'>
        <Typography.Title level={5}>{name}</Typography.Title>

        <Link
          onClick={handleClick}
          to={`/marketplace/autor/${userId}`}
          component={Typography.Link}
        >
          {userName}
        </Link>
      </div>
    </div>
  );
};

MarketplaceTaskItemHeader.propTypes = {
  name: PropTypes.string,
  userId: PropTypes.string,
  userName: PropTypes.string,
  imageSrc: PropTypes.string,
  avatarColor: PropTypes.string,
};

MarketplaceTaskItemHeader.defaultProps = {
  name: '',
  userId: '',
  userName: '',
  imageSrc: '',
  avatarColor: undefined,
};

export default MarketplaceTaskItemHeader;
