import React from 'react';
import PropTypes from 'prop-types';

import { monitoringShape } from './propTypes';
import MonitoringPanelList from './MonitoringPanelList';
import MonitoringPanelSkeleton from './MonitoringPanelSkeleton';
import MonitoringPanelPlaceholder from './MonitoringPanelPlaceholder';

import './styles.less';

const MonitoringPanel = ({
  className,
  isLoading,
  isDeleting,
  monitorings,
  selectedMonitoring,
  handleSelectMonitoring,
}) => {
  const renderMonitoringPanel = () => {
    if (isLoading) return <MonitoringPanelSkeleton />;

    const hasNoMonitorings = !monitorings || monitorings.length === 0;
    if (hasNoMonitorings) return <MonitoringPanelPlaceholder />;

    return (
      <MonitoringPanelList
        isDeleting={isDeleting}
        monitorings={monitorings}
        selectedMonitoring={selectedMonitoring}
        handleSelectMonitoring={handleSelectMonitoring}
      />
    );
  };

  return (
    <div className={`monitoring-panel ${className}`}>
      {renderMonitoringPanel()}
    </div>
  );
};

MonitoringPanel.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  isDeleting: PropTypes.bool,
  monitorings: PropTypes.arrayOf(PropTypes.shape(monitoringShape)),
  selectedMonitoring: PropTypes.shape(monitoringShape),
  handleSelectMonitoring: PropTypes.func,
};

MonitoringPanel.defaultProps = {
  className: '',
  isLoading: false,
  isDeleting: false,
  monitorings: [],
  selectedMonitoring: null,
  handleSelectMonitoring: undefined,
};

export default MonitoringPanel;
