// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Tabs, Icon } from 'antd';

// COMPONENTS
import DraggableTabs from '../DraggableTabs';

// TABS COMPONENTS
const { TabPane } = Tabs;

/**
 * Experiments Tabs.
 * This component is responsible for displaying experiments tabs.
 */
const ExperimentsTabs = ({
  experiments,
  handleChange,
  handleMoveTab,
  activeExperiment,
}) => {
  // COMPONENTS RENDERS
  // title
  const renderTitle = (title, running) => (
    // react fragment
    <>
      {/* title */}
      {title}
      {/* running spinner */}
      {running && <Icon type='loading' />}
    </>
  );

  return (
    // draggable tabs component
    <DraggableTabs
      handleMoveTab={handleMoveTab}
      onChange={handleChange}
      activeExperiment={activeExperiment}
    >
      {experiments.length > 0 ? (
        // rendering tabs
        experiments.map(({ name, uuid, running }) => (
          <TabPane tab={renderTitle(name, running)} key={uuid} />
        ))
      ) : (
        // rendering empty tab
        <TabPane
          tab={renderTitle('Sem experimentos')}
          disabled
          key='sem experimento'
        />
      )}
    </DraggableTabs>
  );
};

// PROP TYPES
ExperimentsTabs.propTypes = {
  /** experiments list */
  experiments: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** experiments tabs active experiment key */
  activeExperiment: PropTypes.string,
  /** experiments tabs handle tab change function */
  handleChange: PropTypes.func.isRequired,
  /** experiments tabs handle move tab function */
  handleMoveTab: PropTypes.func.isRequired,
};

// PROP DEFAULT VALUES
ExperimentsTabs.defaultProps = {
  /** experiments tabs active experiment key */
  activeExperiment: undefined,
};

// EXPORT
export default ExperimentsTabs;
