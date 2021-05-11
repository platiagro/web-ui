import React, { useState } from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import { withResizeDetector } from 'react-resize-detector';

import { useToggleState } from 'hooks';

import MonitoringDrawerItemTabs from './MonitoringDrawerItemTabs';
import MonitoringDrawerItemTitle from './MonitoringDrawerItemTitle';

import './MonitoringDrawerItem.style.less';

const MonitoringDrawerItem = ({
  handleDownload,
  handleRemove,
  figures,
  hasFilters,
  monitoringName,
}) => {
  const [isShowingFilters, handleToggleFilters] = useToggleState(false);
  const [selectedTabKey, setSelectedTabKey] = useState(undefined);

  return (
    <Card
      className='monitoring-drawer-item'
      bodyStyle={{ padding: '8px 24px 16px 24px', overflowX: 'auto' }}
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
      <MonitoringDrawerItemTabs
        figures={figures}
        selectedTabKey={selectedTabKey}
        handleSelectTab={setSelectedTabKey}
      />
    </Card>
  );
};

MonitoringDrawerItem.propTypes = {
  handleDownload: PropTypes.func,
  handleRemove: PropTypes.func,
  figures: PropTypes.array,
  hasFilters: PropTypes.bool,
  monitoringName: PropTypes.string,
};

MonitoringDrawerItem.defaultProps = {
  handleDownload: undefined,
  handleRemove: undefined,
  figures: [],
  hasFilters: false,
  monitoringName: '',
};

export default withResizeDetector(MonitoringDrawerItem);
