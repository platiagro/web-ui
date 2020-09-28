// REACT LIBS
import React from 'react';
import PropTypes from 'prop-types';

// ANTD ICON
import { TableOutlined } from '@ant-design/icons';

// UI COMPONENTS
import { Button } from 'uiComponents';

/**
 * Data view primary rounded button.
 *
 * @component
 *
 * @param {object} props Component props
 *
 * @returns {DataViewButton} Component
 *
 * @example
 * // Data View Button click handler
 * const handleClick = () => alert('Click!');
 * // Data View Button is loading
 * const isLoading = false;
 * // Data View Button is disabled
 * const isDisabled = false;
 *
 * // rendering component
 * return (
 *   <DataViewButton
 *     disabled={isDisabled}
 *     loading={isLoading}
 *     handleClick={handleClick}
 *   />
 * );
 */
const DataViewButton = (props) => {
  // destructuring props
  const { isDisabled, isLoading, handleClick } = props;

  // button shape
  const icon = <TableOutlined />;

  // button icon
  const shape = 'round';

  // button type
  const type = 'primary';

  // rendering component
  return (
    <Button
      icon={icon}
      isDisabled={isDisabled}
      isLoading={isLoading}
      handleClick={handleClick}
      shape={shape}
      type={type}
    >
      Visualizar dados
    </Button>
  );
};

// PROP TYPES
DataViewButton.propTypes = {
  /** Data View Button click handler */
  handleClick: PropTypes.func.isRequired,
  /** Data View Button is loading */
  isLoading: PropTypes.bool.isRequired,
  /** Data View Button is disabled */
  isDisabled: PropTypes.bool.isRequired,
};

// EXPORT DEFAULT
export default DataViewButton;
