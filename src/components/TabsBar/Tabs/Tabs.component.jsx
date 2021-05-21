import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs as AntdTabs, Popconfirm, Popover, Input } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  CopyOutlined,
} from '@ant-design/icons';

import CustomDndProvider from 'components/CustomDndProvider';

import DraggableTabs from '../DraggableTabs';

const Tabs = ({
  activeTab,
  deleteTitle,
  loading,
  onChange,
  onDelete,
  onDuplicate,
  onMoveTab,
  onRename,
  tabs,
}) => {
  const [currentId, setCurrentId] = useState(null);
  const [currentName, setCurrentName] = useState('');
  const [renameVisible, setRenameVisible] = useState(false);
  const [duplicateVisible, setDuplicateVisible] = useState(false);

  useEffect(() => {
    setRenameVisible(false);
    setDuplicateVisible(false);
  }, [tabs]);

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
              okText='Sim'
              cancelText='Não'
              title={deleteTitle}
              onConfirm={(e) => {
                e.stopPropagation();
                onDelete(tabId);
              }}
              onCancel={(e) => {
                e.stopPropagation();
                setCurrentId(null);
              }}
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

  const contentRename = (
    <>
      <p>Renomear</p>
      <Input.Search
        enterButton='Ok'
        onSearch={(name) => {
          if (name.length > 0) {
            onRename(currentId, name);
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
            onDuplicate(currentId, name);
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

  const renderTabs = () => {
    if (loading && tabs.length <= 0) {
      return (
        <AntdTabs.TabPane
          tab={<div className='tab-title-custom' />}
          disabled={loading}
          key='without-tab'
        />
      );
    }

    if (tabs.length > 0) {
      return tabs.map(({ name, uuid, running }) => (
        <AntdTabs.TabPane
          disabled={loading}
          tab={renderTitle(name, running, uuid, loading)}
          key={uuid}
        />
      ));
    }
  };

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
      <CustomDndProvider>
        <DraggableTabs
          activeTab={activeTab}
          onChange={onChange}
          onMoveTab={onMoveTab}
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
              <div className='menu-item-name'>
                <EditOutlined />
                <span>Renomear</span>
              </div>
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
              <div className='menu-item-name'>
                <CopyOutlined />
                <span>Duplicar</span>
              </div>
            </MenuItem>
          </Popover>

          <Popconfirm
            title={deleteTitle}
            onConfirm={() => onDelete(currentId)}
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
              <div className='menu-item-name'>
                <DeleteOutlined />
                <span>Excluir</span>
              </div>
            </MenuItem>
          </Popconfirm>
        </ContextMenu>
      </CustomDndProvider>
    </>
  );
};

Tabs.propTypes = {
  activeTab: PropTypes.string,
  deleteTitle: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  onMoveTab: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Tabs.defaultProps = {
  activeTab: undefined,
};

export default Tabs;
