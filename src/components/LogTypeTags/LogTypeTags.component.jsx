import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

import {
  InfoCircleOutlined,
  BugOutlined,
  CodeOutlined,
} from '@ant-design/icons';

import './styles.less';

const LogTypeTags = ({
  className,
  style,
  isErrorTagSelected,
  isInfoTagSelected,
  isDebugTagSelected,
  handleToggleErrorTag,
  handleToggleInfoTag,
  handleToggleDebugTag,
}) => {
  return (
    <div style={style} className={`log-type-tags ${className}`}>
      <Tag
        color={isErrorTagSelected ? '#FFCCC7' : undefined}
        onClick={handleToggleErrorTag}
        icon={<BugOutlined />}
      >
        Error
      </Tag>

      <Tag
        color={isInfoTagSelected ? '#E8E8E8' : undefined}
        onClick={handleToggleInfoTag}
        icon={<InfoCircleOutlined />}
      >
        Info
      </Tag>

      <Tag
        color={isDebugTagSelected ? '#EFDBFF' : undefined}
        onClick={handleToggleDebugTag}
        icon={<CodeOutlined />}
      >
        Debug
      </Tag>
    </div>
  );
};

LogTypeTags.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  isErrorTagSelected: PropTypes.bool,
  isInfoTagSelected: PropTypes.bool,
  isDebugTagSelected: PropTypes.bool,
  handleToggleErrorTag: PropTypes.func,
  handleToggleInfoTag: PropTypes.func,
  handleToggleDebugTag: PropTypes.func,
};

LogTypeTags.defaultProps = {
  className: '',
  style: undefined,
  isErrorTagSelected: false,
  isInfoTagSelected: false,
  isDebugTagSelected: false,
  handleToggleErrorTag: undefined,
  handleToggleInfoTag: undefined,
  handleToggleDebugTag: undefined,
};

export default LogTypeTags;
