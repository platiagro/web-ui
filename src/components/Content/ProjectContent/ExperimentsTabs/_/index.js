// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Tabs } from 'antd';

// COMPONENTS
import DraggableTabs from '../DraggableTabs';

// TABS COMPONENTS
const { TabPane } = Tabs;

/**
 * Experiments Tabs.
 * This component is responsible for displaying experiments tabs.
 */
const ExperimentsTabs = ({ experiments, handleChange }) => {
  return (
    // draggable tabs component
    <DraggableTabs
      handleMoveTab={(dragKey, hoverKey) => {
        alert(`drag: ${dragKey}, hover: ${hoverKey}`);
      }}
      onChange={handleChange}
    >
      {/* rendering tabs */}
      {experiments.map(({ title, key }) => (
        <TabPane tab={title} key={key} />
      ))}
    </DraggableTabs>
  );
};

// PROP TYPES
ExperimentsTabs.propTypes = {
  /** experiments list */
  experiments: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** experiments tabs handle change function */
  handleChange: PropTypes.func.isRequired,
};

// EXPORT
export default ExperimentsTabs;
