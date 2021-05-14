import React, { useState } from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import { withResizeDetector } from 'react-resize-detector';

import { useToggleState } from 'hooks';

import MonitoringDrawerItemTabs from './MonitoringDrawerItemTabs';
import MonitoringDrawerItemTitle from './MonitoringDrawerItemTitle';
import MonitoringDrawerItemFilters from './MonitoringDrawerItemFilters';

import './MonitoringDrawerItem.style.less';

const MonitoringDrawerItem = ({
  className,
  handleDownload,
  handleRemove,
  figures,
  hasFilters,
  monitoringName,
}) => {
  const [isShowingFilters, handleToggleFilters] = useToggleState(false);
  const [selectedTabKey, setSelectedTabKey] = useState(undefined);
  const [filters, setFilters] = useState(undefined);

  const handleClearFilters = () => {
    setFilters(undefined);
    handleToggleFilters();
  };

  return (
    <Card
      className={`monitoring-drawer-item ${className}`}
      bodyStyle={{ padding: '0', height: '100%' }}
      headStyle={{ cursor: 'grabbing' }}
      title={
        <MonitoringDrawerItemTitle
          hasFilters={hasFilters}
          monitoringName={monitoringName}
          isShowingFilters={isShowingFilters}
          handleRemove={handleRemove}
          handleDownload={handleDownload}
          handleToggleFilters={handleToggleFilters}
        />
      }
    >
      <div className='monitoring-drawer-item-content'>
        <MonitoringDrawerItemTabs
          figures={figures}
          selectedTabKey={selectedTabKey}
          handleSelectTab={setSelectedTabKey}
        />

        <MonitoringDrawerItemFilters
          filters={filters}
          hasFilters={hasFilters}
          isShowingFilters={isShowingFilters}
          handleClearFilters={handleClearFilters}
          handleToggleFilters={handleToggleFilters}
        />
      </div>
    </Card>
  );
};

MonitoringDrawerItem.propTypes = {
  className: PropTypes.string,
  handleDownload: PropTypes.func,
  handleRemove: PropTypes.func,
  figures: PropTypes.array,
  hasFilters: PropTypes.bool,
  monitoringName: PropTypes.string,
};

MonitoringDrawerItem.defaultProps = {
  className: '',
  handleDownload: undefined,
  handleRemove: undefined,
  figures: [],
  hasFilters: false,
  monitoringName: '',
};

export default withResizeDetector(MonitoringDrawerItem);
