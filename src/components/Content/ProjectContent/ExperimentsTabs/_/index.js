// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { LoadingOutlined } from '@ant-design/icons';
import { Tabs, Spin } from 'antd';

// COMPONENTS
import DraggableTabs from '../DraggableTabs';

// TABS COMPONENTS
const { TabPane } = Tabs;

/**
 * Experiments Tabs.
 * This component is responsible for displaying experiments tabs.
 *
 * @param root0
 * @param root0.experiments
 * @param root0.loading
 * @param root0.handleChange
 * @param root0.handleMoveTab
 * @param root0.activeExperiment
 * @param root0
 * @param root0.experiments
 * @param root0.loading
 * @param root0.handleChange
 * @param root0.handleMoveTab
 * @param root0.activeExperiment
 * @param root0
 * @param root0.experiments
 * @param root0.loading
 * @param root0.handleChange
 * @param root0.handleMoveTab
 * @param root0.activeExperiment
 * @param root0
 * @param root0.experiments
 * @param root0.loading
 * @param root0.handleChange
 * @param root0.handleMoveTab
 * @param root0.activeExperiment
 * @param root0
 * @param root0.experiments
 * @param root0.loading
 * @param root0.handleChange
 * @param root0.handleMoveTab
 * @param root0.activeExperiment
 * @param root0
 * @param root0.experiments
 * @param root0.loading
 * @param root0.handleChange
 * @param root0.handleMoveTab
 * @param root0.activeExperiment
 */
const ExperimentsTabs = ({
  experiments,
  loading,
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
      {running && <LoadingOutlined />}
    </>
  );
  // render tabs
  const renderTabs = () => {
    // if is loading
    if (loading) {
      // rendering loading tab
      return (
        <TabPane
          tab={<Spin size='small' indicator={<LoadingOutlined />} />}
          disabled
          key='sem experimento'
        />
      );
    }

    // has experiments
    if (experiments.length > 0) {
      // rendering tabs
      return experiments.map(({ name, uuid, running }) => (
        <TabPane tab={renderTitle(name, running)} key={uuid} />
      ));
    }

    // rendering empty tab
    return (
      <TabPane
        tab={renderTitle('Sem experimentos')}
        disabled
        key='sem experimento'
      />
    );
  };

  return (
    /* draggable tabs component */
    <DraggableTabs
      handleMoveTab={handleMoveTab}
      onChange={handleChange}
      activeExperiment={activeExperiment}
    >
      {renderTabs()}
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
  /** is loading */
  loading: PropTypes.bool.isRequired,
};

// PROP DEFAULT VALUES
ExperimentsTabs.defaultProps = {
  /** experiments tabs active experiment key */
  activeExperiment: undefined,
};

// EXPORT
export default ExperimentsTabs;
