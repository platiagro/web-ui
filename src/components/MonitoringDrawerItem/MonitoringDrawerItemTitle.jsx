import React from 'react';
import PropTypes from 'prop-types';
import {
  FilterOutlined,
  MoreOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Button, Tooltip, Dropdown, Menu } from 'antd';

import { DragIndicatorComponent } from 'assets';

const MonitoringDrawerItemTitle = ({
  monitoringName,
  hasFilters,
  isShowingFilters,
  handleRemove,
  handleDownload,
  handleToggleFilters,
}) => {
  const getFilterButtonClassName = () => {
    const classNames = ['monitoring-drawer-item-filter-button'];

    if (hasFilters) {
      classNames.push('monitoring-drawer-item-has-filters');
    }

    if (isShowingFilters) {
      classNames.push('monitoring-drawer-item-filter-button-selected');
    }

    return classNames.join(' ');
  };

  return (
    <div className='monitoring-drawer-item-header'>
      <div className='monitoring-drawer-item-drag-indicator' draggable>
        <DragIndicatorComponent />
      </div>

      <div className='monitoring-drawer-item-title'>{monitoringName}</div>

      <div className='monitoring-drawer-item-right'>
        <Tooltip
          title={
            hasFilters
              ? 'Veja os filtros da tarefa'
              : 'A tarefa não possui filtros'
          }
        >
          <Button
            className={getFilterButtonClassName()}
            shape='circle'
            type='ghost'
            disabled={!hasFilters}
            icon={<FilterOutlined />}
            onClick={handleToggleFilters}
          >
            <div className='blue-dot'></div>
          </Button>
        </Tooltip>

        {/* eslint-disable-next-line sonarjs/no-redundant-boolean */}
        {false && ( // TODO: Exibe botão e dropdown quando funcionarem
          <Dropdown
            trigger='click'
            overlay={
              <Menu>
                <Menu.Item onClick={handleDownload}>
                  <DownloadOutlined />
                  <span>Download</span>
                </Menu.Item>

                <Menu.Item onClick={handleRemove} disabled>
                  <DeleteOutlined />
                  <span>Remover</span>
                </Menu.Item>
              </Menu>
            }
          >
            <Button
              className='monitoring-drawer-item-more-button'
              shape='circle'
              type='ghost'
              icon={<MoreOutlined />}
              onClick={(e) => e.preventDefault()}
            />
          </Dropdown>
        )}
      </div>
    </div>
  );
};

MonitoringDrawerItemTitle.propTypes = {
  monitoringName: PropTypes.string,
  hasFilters: PropTypes.bool,
  isShowingFilters: PropTypes.bool,
  handleRemove: PropTypes.func,
  handleDownload: PropTypes.func,
  handleToggleFilters: PropTypes.func,
};

MonitoringDrawerItemTitle.defaultProps = {
  monitoringName: '',
  hasFilters: false,
  isShowingFilters: false,
  handleRemove: undefined,
  handleDownload: undefined,
  handleToggleFilters: undefined,
};

export default MonitoringDrawerItemTitle;
