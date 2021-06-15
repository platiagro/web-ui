import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Popconfirm, Popover, Input } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  CopyOutlined,
} from '@ant-design/icons';

import DraggableTabs from './DraggableTabs';

import './style.less';

const ExperimentsTabs = ({
  experiments,
  loading,
  handleChange,
  handleMoveTab,
  activeExperiment,
  deleteHandler,
  renameHandler,
  duplicateHandler,
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [experimentName, setExperimentName] = useState('');
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [selectedExperimentId, setSelectedExperimentId] = useState(null);

  const renamingInputRef = useRef(null);
  const duplicatingInputRef = useRef(null);

  const handleShowRenamingPopover = (id, name) => {
    setSelectedExperimentId(id);
    setExperimentName(name);
    setIsRenaming(true);
  };

  const handleShowDuplicatingPopover = (id, name) => {
    setSelectedExperimentId(id);
    setExperimentName(name);
    setIsDuplicating(true);
  };

  const handleConfirmDuplication = (name) => {
    if (name.length > 0) {
      setIsDuplicating(false);
      duplicateHandler(selectedExperimentId, name);
    }
  };

  const handleConfirmRenaming = (name) => {
    if (name.length > 0) {
      setIsRenaming(false);
      renameHandler(selectedExperimentId, name);
    }
  };

  const handleFocusRenamingPopover = (isVisible) => {
    if (renamingInputRef.current && isVisible) {
      renamingInputRef.current.focus();
    }
  };

  const handleFocusDuplicatingPopover = (isVisible) => {
    if (duplicatingInputRef.current && isVisible) {
      duplicatingInputRef.current.focus();
    }
  };

  return (
    <>
      <DraggableTabs
        activeExperiment={activeExperiment}
        handleMoveTab={handleMoveTab}
        onChange={handleChange}
      >
        {loading && experiments.length <= 0 && (
          <Tabs.TabPane
            tab={<div className='tab-title-custom' />}
            disabled={loading}
          />
        )}

        {experiments.length > 0 &&
          experiments.map(({ name, uuid, running }) => (
            <Tabs.TabPane
              key={uuid}
              disabled={loading}
              tab={
                <>
                  <ContextMenuTrigger
                    id={uuid ? 'menu_id' : 'empty'}
                    holdToDisplay={-1}
                    experimentId={uuid}
                    experimentTitle={name}
                    collect={(propsAux) => propsAux}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <div className='tab-title-custom'>
                        {name}

                        {(running || loading) && activeExperiment === uuid && (
                          <LoadingOutlined />
                        )}
                      </div>

                      {!!uuid && (
                        <Popconfirm
                          title='Excluir o experimento?'
                          onConfirm={(e) => {
                            e.stopPropagation();
                            deleteHandler(uuid);
                          }}
                          onCancel={(e) => {
                            e.stopPropagation();
                            setSelectedExperimentId(null);
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
              }
            />
          ))}
      </DraggableTabs>

      <ContextMenu className='menu-tab' id='menu_id'>
        <Popover
          trigger='click'
          visible={isRenaming}
          onVisibleChange={setIsRenaming}
          afterVisibleChange={handleFocusRenamingPopover}
          content={
            <>
              <p>Renomear</p>
              <Input.Search
                ref={renamingInputRef}
                enterButton='Ok'
                onSearch={handleConfirmRenaming}
                placeholder='Digite o novo nome'
                value={experimentName}
                onChange={(e) => {
                  setExperimentName(e.target.value);
                }}
                loading={loading}
                disabled={loading}
                allowClear
              />
            </>
          }
        >
          <MenuItem
            className='menu-tab-item'
            onClick={(_, { experimentId, experimentTitle }) => {
              handleShowRenamingPopover(experimentId, experimentTitle);
            }}
            preventClose
          >
            <div className='menu-item-name'>
              <EditOutlined />
              <span>Renomear</span>
            </div>
          </MenuItem>
        </Popover>

        <Popover
          trigger='click'
          visible={isDuplicating}
          onVisibleChange={setIsDuplicating}
          afterVisibleChange={handleFocusDuplicatingPopover}
          content={
            <>
              <p>Duplicar</p>
              <Input.Search
                ref={duplicatingInputRef}
                enterButton='Ok'
                placeholder='Digite o novo nome'
                loading={loading}
                disabled={loading}
                onSearch={handleConfirmDuplication}
                onChange={(e) => setExperimentName(e.target.value)}
                allowClear
              />
            </>
          }
        >
          <MenuItem
            className='menu-tab-item'
            onClick={(_, { experimentId, experimentTitle }) => {
              handleShowDuplicatingPopover(experimentId, experimentTitle);
            }}
            preventClose
          >
            <div className='menu-item-name'>
              <CopyOutlined />
              <span>Duplicar</span>
            </div>
          </MenuItem>
        </Popover>

        <Popconfirm
          title='Excluir o experimento?'
          onConfirm={() => deleteHandler(selectedExperimentId)}
          onCancel={() => setSelectedExperimentId(null)}
          okText='Sim'
          cancelText='Não'
        >
          <MenuItem className='menu-tab-item' preventClose>
            <div className='menu-item-name'>
              <DeleteOutlined />
              <span>Excluir</span>
            </div>
          </MenuItem>
        </Popconfirm>
      </ContextMenu>
    </>
  );
};

ExperimentsTabs.propTypes = {
  experiments: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeExperiment: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  renameHandler: PropTypes.func.isRequired,
  handleMoveTab: PropTypes.func.isRequired,
  duplicateHandler: PropTypes.func.isRequired,
};

ExperimentsTabs.defaultProps = {
  activeExperiment: undefined,
};

export default ExperimentsTabs;
