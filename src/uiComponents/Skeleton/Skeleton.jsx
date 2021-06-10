import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton as AntSkeleton } from 'antd';

const Skeleton = ({ isActive, paragraphConfig, size, hasTitle }) => {
  return (
    <AntSkeleton
      size={size}
      title={hasTitle}
      active={isActive}
      paragraph={paragraphConfig}
    />
  );
};

Skeleton.propTypes = {
  hasTitle: PropTypes.bool,
  isActive: PropTypes.bool,
  paragraphConfig: PropTypes.object,
  size: PropTypes.string,
};

Skeleton.defaultProps = {
  hasTitle: false,
  isActive: true,
  paragraphConfig: { rows: 1, width: '100%' },
  size: 'large',
};

export default Skeleton;
