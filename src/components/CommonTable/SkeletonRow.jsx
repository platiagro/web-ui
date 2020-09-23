// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI COMPONENTS
import { Skeleton } from 'uiComponents';

/**
 * A row with skeleton loading
 *
 * @param {object} props Component props
 *
 * @returns {SkeletonRow} Component
 *
 * @component
 */
const SkeletonRow = (props) => {
  // destructuring props
  const { children, isLoading } = props;

  // rendering component
  return isLoading ? <Skeleton /> : children;
};

// PROP TYPES
SkeletonRow.propTypes = {
  /** Row content */
  children: PropTypes.any.required,
  /** Row is loading */
  isLoading: PropTypes.bool,
};

// DEFAULT PROPS
SkeletonRow.defaultProps = {
  /** Row is loading */
  isLoading: true,
};

// EXPORT DEFAULT
export default SkeletonRow;
