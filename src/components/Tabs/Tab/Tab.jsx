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
  CopyOutlined,
} from '@ant-design/icons';
import { Tabs, Popconfirm, Popover, Input } from 'antd';

// COMPONENTS
import DraggableTabs from '../DraggableTabs';

// TABS COMPONENTS
const { TabPane } = Tabs;

/**
 * This component is responsible for displaying tab.
 */
const Tab = (props) => {
  const {
    activeTab,
    deleteTitle,
    handleChange,
    handleDelete,
    handleDuplicate,
    handleMoveTab,
    handleRename,
    loading,
    tabs,
  } = props;

  // Id for make delete and rename requisitions
  const [currentId, setCurrentId] = useState(null);
  // Name for use into rename popover
  const [currentName, setCurrentName] = useState('');
  // Visible for rename popover
  const [renameVisible, setRenameVisible] = useState(false);
  // Visible for duplicate popover
  const [duplicateVisible, setDuplicateVisible] = useState(false);

  useEffect(() => {
    // change rename popover visibility on tabs change
    setRenameVisible(false);
    setDuplicateVisible(false);
  }, [tabs]);

  // COMPONENTS RENDERS
  // title
  const renderTitle = (title, running, tabId, loadingTitle) => (
    <>
      <ContextMenuTrigger
        id={tabId ? 'menu_id' : 'empty'}
        tabId={tabId}
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
            {(running || loadingTitle) && activeTab === tabId && (
              <LoadingOutlined />
            )}
          </div>
          {tabId && (
            <Popconfirm
              title={deleteTitle}
              onConfirm={(e) => {
                //Need to stop propagation for don't enter into tab
                e.stopPropagation();
                handleDelete(tabId);
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
  const contentRename = (
    <>
      <p>Renomear</p>
      <Input.Search
        enterButton='Ok'
        onSearch={(name) => {
          //Only send rename if has a name
          if (name.length > 0) {
            handleRename(currentId, name);
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

  const contentDuplicate = (
    <>
      <p>Duplicar</p>
      <Input.Search
        enterButton='Ok'
        onSearch={(name) => {
          if (name.length > 0) {
            handleDuplicate(currentId, name);
          }
        }}
        placeholder='Digite o novo nome'
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
    if (loading && tabs.length <= 0) {
      // rendering loading tab
      return (
        <TabPane
          tab={<div className='tab-title-custom' />}
          disabled={loading}
          key='without-tab'
        />
      );
    }

    // has tabs
    if (tabs.length > 0) {
      // rendering tabs
      return tabs.map(({ name, uuid, running }) => (
        <TabPane
          disabled={loading}
          tab={renderTitle(name, running, uuid, loading)}
          key={uuid}
        />
      ));
    }
  };

  // Handlers
  const handleMenuClick = (action, uuid, title) => {
    setCurrentId(uuid);
    switch (action) {
      case 'rename':
        setCurrentName(title);
        setRenameVisible(true);
        break;
      case 'duplicate':
        setCurrentName(title);
        setDuplicateVisible(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <DraggableTabs
        handleMoveTab={handleMoveTab}
        onChange={handleChange}
        activeTab={activeTab}
      >
        {renderTabs()}
      </DraggableTabs>
      <ContextMenu className='menu-tab' id='menu_id'>
        <Popover
          trigger='click'
          content={contentRename}
          visible={renameVisible}
          onVisibleChange={(visible) => {
            setRenameVisible(visible);
          }}
        >
          <MenuItem
            className='menu-tab-item'
            data={{ action: 'rename' }}
            onClick={(e, data) =>
              handleMenuClick(data.action, data.tabId, data.experimentTitle)
            }
            preventClose={true}
          >
            <ItemName name='Renomear' icon={<EditOutlined />} />
          </MenuItem>
        </Popover>

        <Popover
          trigger='click'
          content={contentDuplicate}
          visible={duplicateVisible}
          onVisibleChange={(visible) => {
            setDuplicateVisible(visible);
          }}
        >
          <MenuItem
            className='menu-tab-item'
            data={{ action: 'duplicar' }}
            onClick={(e, data) =>
              handleMenuClick(data.action, data.tabId, data.experimentTitle)
            }
            preventClose={true}
          >
            <ItemName name='Duplicar' icon={<CopyOutlined />} />
          </MenuItem>
        </Popover>

        <Popconfirm
          title={deleteTitle}
          onConfirm={() => handleDelete(currentId)}
          onCancel={() => setCurrentId(null)}
          okText='Sim'
          cancelText='Não'
        >
          <MenuItem
            className='menu-tab-item'
            data={{ action: 'delete' }}
            preventClose={true}
            onClick={(e, data) => handleMenuClick(data.action, data.tabId)}
          >
            <ItemName name='Excluir' icon={<DeleteOutlined />} />
          </MenuItem>
        </Popconfirm>
      </ContextMenu>
    </>
  );
};

// PROP TYPES
Tab.propTypes = {
  /** active tab key */
  activeTab: PropTypes.string,
  /** delete pop confirm title */
  deleteTitle: PropTypes.string,
  /** handle tab change function */
  handleChange: PropTypes.func.isRequired,
  /** delete function to use on context menu */
  handleDelete: PropTypes.func.isRequired,
  /** duplicate function to use on context menu */
  handleDuplicate: PropTypes.func.isRequired,
  /** handle move tab function */
  handleMoveTab: PropTypes.func.isRequired,
  /** rename function to use on context menu */
  handleRename: PropTypes.func.isRequired,
  /** is loading */
  loading: PropTypes.bool.isRequired,
  /** tabs list */
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// PROP DEFAULT VALUES
Tab.defaultProps = {
  /** experiments tabs active experiment key */
  activeTab: undefined,
};

// EXPORT
export default Tab;
