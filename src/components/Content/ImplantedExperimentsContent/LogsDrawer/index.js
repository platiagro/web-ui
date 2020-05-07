// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Drawer as AntDrawer } from 'antd';

/**
 * Drawer.
 * This component is responsible for displaying drawer.
 */
const Drawer = ({ title, isVisible, logs, handleClose }) => {
  // HOOKS

  // RENDER
  return (
    // ant design drawer container
    <AntDrawer
      width={'40vw'}
      title={title}
      visible={isVisible}
      closable
      onClose={handleClose}
    >
      <div>{logs}</div>
    </AntDrawer>
  );
};

// PROP TYPES
Drawer.propTypes = {
  /** drawer title string */
  title: PropTypes.string.isRequired,
  /** log string */
  logs: PropTypes.string.isRequired,
  /** drawer is visible */
  isVisible: PropTypes.bool.isRequired,
  /** select input change handler */
  handleClose: PropTypes.func.isRequired,
};

// PROP DEFAULT VALUES
Drawer.defaultProps = {
  /** drawer results list */
  results: undefined,
};

// EXPORT
export default Drawer;
