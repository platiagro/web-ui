// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

// UI LIBS
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Tabs, Spin, Popconfirm, Popover, Input } from 'antd';

// COMPONENTS
import DraggableTabs from '../DraggableTabs';

//STYLE
import './style.scss';

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
  renameHandler,
}) => {
  //Id for make delete and rename requisitions
  const [currentId, setCurrentId] = useState(null);
  //Name for use into rename popover
  const [currentName, setCurrentName] = useState('');
  // COMPONENTS RENDERS
  // title
  const renderTitle = (title, running, experimentId, loading) => (
    <>
      <ContextMenuTrigger
        id={experimentId ? 'menu_id' : 'empty'}
        experimentId={experimentId}
        experimentTitle={title}
        collect={(props) => props}
        holdToDisplay={-1}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className='tab-title-custom'>
            {title}
            {(running || loading) && <LegacyIcon type='loading' />}
          </div>
          {experimentId && (
            <Popconfirm
              title='Excluir o experimento?'
              onConfirm={(e) => {
                //Need to stop propagation for don't enter into tab
                e.stopPropagation();
                deleteHandler(experimentId);
              }}
              onCancel={(e) => {
                e.stopPropagation();
                setCurrentId(null);
              }}
              okText='Sim'
              cancelText='Não'
            >
              <LegacyIcon
                type='close'
                className='close-icon-tab'
                onClick={(e) => e.stopPropagation()}
              />
            </Popconfirm>
          )}
        </div>
      </ContextMenuTrigger>
    </>
  );

  const ItemName = ({ name, icon }) => (
    <div className='menu-item-name'>
      <LegacyIcon type={icon} />
      <span>{name}</span>
    </div>
  );

  //Content of rename popover, using Search for press enter and suffix ok button
  const content = (
    <Input.Search
      enterButton='Ok'
      onSearch={(name) => {
        //Only send rename if has a name
        if (name.length > 0) {
          renameHandler(currentId, name);
        }
      }}
      placeholder='Digite o novo nome'
      value={currentName}
      onChange={(e) => {
        setCurrentName(e.target.value);
      }}
      loading={loading}
      disabled={loading}
      allowClear
    />
  );

  // render tabs
  const renderTabs = () => {
    // if is loading
    if (loading && experiments.length <= 0) {
      // rendering loading tab
      return (
        <TabPane
          tab={
            <div className='tab-title-custom'>
              <Spin
                size='small'
                indicator={<LegacyIcon type='loading' spin />}
              />
            </div>
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
        <TabPane
          disabled={loading}
          tab={renderTitle(name, running, uuid, loading)}
          key={uuid}
        />
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

  //Handlers
  const handleMenuClick = (action, uuid, title) => {
    setCurrentId(uuid);
    if (action === 'rename') {
      setCurrentName(title);
    }
  };

  return (
    /* draggable tabs component */
    <>
      <DraggableTabs
        handleMoveTab={handleMoveTab}
        onChange={handleChange}
        activeExperiment={activeExperiment}
      >
        {renderTabs()}
      </DraggableTabs>
      <ContextMenu className='menu-tab' id='menu_id'>
        <Popover content={content} title='Renomear' trigger='click'>
          <MenuItem
            className='menu-tab-item'
            data={{ action: 'rename' }}
            onClick={(e, data) =>
              handleMenuClick(
                data.action,
                data.experimentId,
                data.experimentTitle
              )
            }
            preventClose={true}
          >
            <ItemName name='Renomear' icon='edit' />
          </MenuItem>
        </Popover>
        <Popconfirm
          title='Excluir o experimento?'
          onConfirm={() => deleteHandler(currentId)}
          onCancel={() => setCurrentId(null)}
          okText='Sim'
          cancelText='Não'
        >
          <MenuItem
            className='menu-tab-item'
            data={{ action: 'delete' }}
            preventClose={true}
            onClick={(e, data) =>
              handleMenuClick(data.action, data.experimentId)
            }
          >
            <ItemName name='Excluir' icon='delete' />
          </MenuItem>
        </Popconfirm>
      </ContextMenu>
    </>
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
  /** delete experiment function to use on context menu */
  deleteHandler: PropTypes.func.isRequired,
  /** rename experiment function to use on context menu */
  renameHandler: PropTypes.func.isRequired,
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
