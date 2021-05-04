import { useEffect } from 'react';

export default ({ monitorings, selectedMonitoring, setSelectedMonitoring }) => {
  useEffect(() => {
    if (!selectedMonitoring) return;

    const selectedMonitoringIndex = monitorings.findIndex((monitoring) => {
      return monitoring.uuid === selectedMonitoring.uuid;
    });

    if (selectedMonitoringIndex === -1) setSelectedMonitoring(null);
  }, [monitorings, selectedMonitoring, setSelectedMonitoring]);
};
