// CORE LIBS
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

// UI LIBS
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Tabs, Popconfirm, Popover, Input } from 'antd';

// COMPONENTS
import DraggableTabs from '../DraggableTabs';

//STYLE
import './style.less';

// TABS COMPONENTS
const { TabPane } = Tabs;

/**
 * Experiments Tabs.
 * This component is responsible for displaying experiments tabs.
 *
 * @component
 * @param {object} props Component props
 * @returns {ExperimentsTabs} React component
 */
const ExperimentsTabs = (props) => {
  // destructuring props
  const {
    experiments,
    loading,
    handleChange,
    handleMoveTab,
    activeExperiment,
    deleteHandler,
    renameHandler,
  } = props;

  // Id for make delete and rename requisitions
  const [currentId, setCurrentId] = useState(null);
  // Name for use into rename popover
  const [currentName, setCurrentName] = useState('');
  // Visible for rename popover
  const [renameVisible, setRenameVisible] = useState(false);

  useEffect(() => {
    // change rename popover visibility on experiments change
    setRenameVisible(false);
  }, [experiments]);

  // COMPONENTS RENDERS
  // title
  const renderTitle = (title, running, experimentId, loadingTitle) => (
    <>
      <ContextMenuTrigger
        id={experimentId ? 'menu_id' : 'empty'}
        experimentId={experimentId}
        experimentTitle={title}
        collect={(propsAux) => propsAux}
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
            {(running || loadingTitle) && <LoadingOutlined />}
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
              <CloseOutlined
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
      {icon}
      <span>{name}</span>
    </div>
  );

  //Content of rename popover, using Search for press enter and suffix ok button
  const content = (
    <>
      <p>Renomear</p>
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
    </>
  );

  // render tabs
  const renderTabs = () => {
    // if is loading
    if (loading && experiments.length <= 0) {
      // rendering loading tab
      return (
        <TabPane
          tab={<div className='tab-title-custom' />}
          disabled={loading}
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
      setRenameVisible(true);
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
        <Popover
          trigger='click'
          content={content}
          visible={renameVisible}
          onVisibleChange={(visible) => {
            setRenameVisible(visible);
          }}
        >
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
            <ItemName name='Renomear' icon={<EditOutlined />} />
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
            <ItemName name='Excluir' icon={<DeleteOutlined />} />
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
