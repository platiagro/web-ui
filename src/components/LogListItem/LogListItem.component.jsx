import React from 'react';
import PropTypes from 'prop-types';
import {
  BugOutlined,
  InfoCircleOutlined,
  CodeOutlined,
} from '@ant-design/icons';

import './styles.less';

const LogListItem = ({ className, style, type, title, text }) => {
  const renderIcon = () => {
    if (type === 'ERROR') return <BugOutlined />;
    else if (type === 'INFO') return <InfoCircleOutlined />;
    else if (type === 'DEBUG') return <CodeOutlined />;
    return null;
  };

  const getLogTypeClass = () => {
    if (type === 'ERROR') return 'error-log';
    else if (type === 'INFO') return 'info-log';
    else if (type === 'DEBUG') return 'debug-log';
    return '';
  };

  return (
    <div
      style={style}
      className={`log-list-item ${getLogTypeClass()} ${className}`}
    >
      <div className='log-list-item-icon'>{renderIcon()}</div>

      <div className='log-list-item-content'>
        <div className='log-list-item-content-title'>{title}</div>
        <div className='log-list-item-content-text'>{text}</div>
      </div>
    </div>
  );
};

LogListItem.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.oneOf(['ERROR', 'INFO', 'DEBUG']).isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

LogListItem.defaultProps = {
  className: '',
  style: undefined,
};

export default LogListItem;
