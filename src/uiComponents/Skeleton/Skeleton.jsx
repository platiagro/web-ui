// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// ANTD UI LIB COMPONENTS
import { Skeleton as AntSkeleton } from 'antd';

/**
 * Simple skeleton based in Ant Design skeleton.
 *
 * https://ant.design/components/skeleton/
 *
 * @param {object} props Component props
 *
 * @returns {Skeleton} Component
 *
 * @component
 */
const Skeleton = (props) => {
  // destructuring props
  const { isActive, paragraphConfig, size, hasTitle } = props;

  // rendering component
  return (
    <AntSkeleton
      active={isActive}
      paragraph={paragraphConfig}
      size={size}
      title={hasTitle}
    />
  );
};

// PROP TYPES
Skeleton.propTypes = {
  /** Skeleton has a title*/
  hasTitle: PropTypes.bool,
  /** Skeleton is active */
  isActive: PropTypes.bool,
  /** Skeleton paragraph configuration */
  paragraphConfig: PropTypes.object,
  /** Skeleton size */
  size: PropTypes.string,
};

// DEFAULT PROPS
Skeleton.defaultProps = {
  /** Skeleton has a title*/
  hasTitle: false,
  /** Skeleton is active */
  isActive: true,
  /** Skeleton paragraph configuration */
  paragraphConfig: { rows: 1, width: '100%' },
  /** Skeleton size */
  size: 'large',
};

// EXPORT DEFAULT
export default Skeleton;
