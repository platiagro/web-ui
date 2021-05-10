import React from 'react';
import PropTypes from 'prop-types';
import {
  FilterOutlined,
  MoreOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Card, Select, Button, Tooltip, Dropdown, Menu } from 'antd';

import { useToggleState } from 'hooks';
import { ReactComponent as DragIndicator } from 'assets/dragIndicator.svg';

import './MonitoringDrawerItem.style.less';

const MonitoringDrawerItem = ({
  handleChangeSelectedTask,
  handleDownload,
  handleRemove,
}) => {
  const [isShowingFilters, handleToggleFilters] = useToggleState(false);

  return (
    <Card
      className='monitoring-drawer-item'
      title={
        <div className='monitoring-drawer-item-header'>
          <div className='monitoring-drawer-item-drag-indicator'>
            <DragIndicator />
          </div>

          <Select
            className='monitoring-drawer-item-select'
            onChange={handleChangeSelectedTask}
            placeholder='Selecione a Tarefa'
            optionLabelProp='label'
            size='large'
          />

          <div className='monitoring-drawer-item-right'>
            <Tooltip title='A tarefa não possui filtros'>
              <Button
                className='monitoring-drawer-item-filter-button'
                shape='circle'
                type='ghost'
                icon={<FilterOutlined />}
                handleClick={handleToggleFilters}
              />
            </Tooltip>

            <Dropdown
              trigger='click'
              overlay={
                <Menu>
                  <Menu.Item onClick={handleDownload}>
                    <DownloadOutlined />
                    <span>Download</span>
                  </Menu.Item>

                  <Menu.Item onClick={handleRemove}>
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
                handleClick={(e) => e.preventDefault()}
              />
            </Dropdown>
          </div>
        </div>
      }
    ></Card>
  );
};

MonitoringDrawerItem.propTypes = {
  handleChangeSelectedTask: PropTypes.func,
  handleDownload: PropTypes.func,
  handleRemove: PropTypes.func,
};

MonitoringDrawerItem.defaultProps = {
  handleChangeSelectedTask: undefined,
  handleDownload: undefined,
  handleRemove: undefined,
};

export default MonitoringDrawerItem;
