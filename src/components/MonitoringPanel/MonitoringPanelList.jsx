import React from 'react';
import PropTypes from 'prop-types';

import MonitoringFlowBox from 'components/MonitoringFlowBox';

import { monitoringShape } from './propTypes';

const MonitoringPanelList = ({
  isDeleting,
  monitorings,
  selectedMonitoring,
  handleSelectMonitoring,
}) => {
  const getMonitoringFlowBoxStatus = (isSelected) => {
    if (isSelected) return isDeleting ? 'pending' : 'success';
    return isDeleting ? 'disable' : 'default';
  };

  return (
    <div className='monitoring-panel-list'>
      {monitorings.map((monitoring, index) => {
        const isSelected = selectedMonitoring?.uuid === monitoring.uuid;
        const status = getMonitoringFlowBoxStatus(isSelected);
        const title = monitoring.task?.name || `Monitoramento ${index + 1}`;

        const handleSelectThisItem = () => {
          const isThisItemNotSelectable = !handleSelectMonitoring || isDeleting;
          if (isThisItemNotSelectable) return;
          handleSelectMonitoring(isSelected ? null : monitoring);
        };

        return (
          <MonitoringFlowBox
            key={monitoring.uuid}
            title={title}
            status={status}
            onClick={handleSelectThisItem}
          />
        );
      })}
    </div>
  );
};

MonitoringPanelList.propTypes = {
  isDeleting: PropTypes.bool,
  monitorings: PropTypes.arrayOf(PropTypes.shape(monitoringShape)),
  selectedMonitoring: PropTypes.shape(monitoringShape),
  handleSelectMonitoring: PropTypes.func,
};

MonitoringPanelList.defaultProps = {
  isDeleting: false,
  monitorings: [],
  selectedMonitoring: null,
  handleSelectMonitoring: undefined,
};

export default MonitoringPanelList;
