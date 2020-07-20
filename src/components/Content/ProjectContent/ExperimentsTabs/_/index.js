// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Tabs, Spin, Menu, Popconfirm, Dropdown } from 'antd';

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
  deleteHandler,
}) => {
  // COMPONENTS RENDERS
  // CONTEXT MENU
  const menu = (experimentId) => (
    <Menu>
      <Menu.Item key='1'>
        <Icon type='edit' />
        Renomear
      </Menu.Item>
      <Menu.Item key='2'>
        <Popconfirm
          title='Você tem certeza que deseja excluir esse projeto?'
          onConfirm={() => deleteHandler(experimentId)}
          okText='Sim'
          cancelText='Não'
        >
          <Icon type='delete' />
          Excluir
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );
  // title
  const renderTitle = (title, running, experimentId) => (
    // react fragment
    <Dropdown overlay={() => menu(experimentId)} trigger={['contextMenu']}>
      <div>
        {/* title */}
        {title}
        {/* running spinner */}
        {running && <LegacyIcon type='loading' />}
      </div>
    </Dropdown>
  );
  // render tabs
  const renderTabs = () => {
    // if is loading
    if (loading) {
      // rendering loading tab
      return (
        <TabPane
          tab={
            <Spin size='small' indicator={<LegacyIcon type='loading' spin />} />
          }
          disabled
          key='sem experimento'
        />
      );
    }

    // has experiments
    if (experiments.length > 0) {
      // rendering tabs
      return experiments.map(({ name, uuid, running }) => (
        <TabPane tab={renderTitle(name, running, uuid)} key={uuid} />
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
