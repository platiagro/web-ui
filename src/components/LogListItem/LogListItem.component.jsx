import React from 'react';
import PropTypes from 'prop-types';
import {
  BugOutlined,
  InfoCircleOutlined,
  CodeOutlined,
} from '@ant-design/icons';

import { LOG_TYPES } from 'configs';

import './styles.less';

const LogListItem = ({ className, style, type, title, text }) => {
  const renderIcon = () => {
    if (type === LOG_TYPES.ERROR) return <BugOutlined />;
    else if (type === LOG_TYPES.INFO) return <InfoCircleOutlined />;
    else if (type === LOG_TYPES.DEBUG) return <CodeOutlined />;
    return null;
  };

  const getLogTypeClass = () => {
    if (type === LOG_TYPES.ERROR) return 'error-log';
    else if (type === LOG_TYPES.INFO) return 'info-log';
    else if (type === LOG_TYPES.DEBUG) return 'debug-log';
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
  type: PropTypes.oneOf(Object.values(LOG_TYPES)),
  title: PropTypes.string,
  text: PropTypes.string,
};

LogListItem.defaultProps = {
  className: '',
  style: undefined,
  title: undefined,
  type: LOG_TYPES.INFO,
  text: '',
};

export default LogListItem;
