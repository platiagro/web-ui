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

  const getClassName = () => {
    return `log-list-item ${getLogTypeClass()} ${className}`;
  };

  return (
    <div style={style} className={getClassName()}>
      <div className='log-list-item-icon'>{renderIcon()}</div>

      <div className='log-list-item-content'>
        {!!title && <div className='log-list-item-content-title'>{title}</div>}
        <div className='log-list-item-content-text'>{text}</div>
      </div>
    </div>
  );
};

LogListItem.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.oneOf(['ERROR', 'INFO', 'DEBUG']),
  title: PropTypes.string,
  text: PropTypes.string,
};

LogListItem.defaultProps = {
  className: '',
  style: undefined,
  title: undefined,
  type: 'INFO',
  text: '',
};

export default LogListItem;
