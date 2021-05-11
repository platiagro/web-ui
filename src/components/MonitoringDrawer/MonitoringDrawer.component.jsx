import React from 'react';
import { Drawer } from 'antd';
import PropTypes from 'prop-types';
import RGL, { WidthProvider } from 'react-grid-layout';

import { CustomDndProvider, MonitoringDrawerItem } from 'components';

import useGridLayout from './useGridLayout';
import useMoveOrResize from './useMoveOrResize';
import MonitoringDrawerTitle from './MonitoringDrawerTitle';
import MonitoringDrawerAddCard from './MonitoringDrawerAddCard';
import MonitoringDrawerSkeleton from './MonitoringDrawerSkeleton';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './MonitoringDrawer.style.less';
import { ADD_CARD_KEY } from './constants';

const ReactGridLayout = WidthProvider(RGL);

const MonitoringDrawer = ({
  isShowing,
  isLoading,
  isAdding,
  figures,
  monitorings,
  deploymentName,
  handleHideDrawer,
  handleUpdateLayout,
  handleAddMonitoring,
  handleDownloadAllFigures,
}) => {
  const gridLayout = useGridLayout(monitorings);
  const handleMoveOrResize = useMoveOrResize(monitorings, handleUpdateLayout);

  return (
    <Drawer
      className='monitoring-drawer'
      bodyStyle={{ padding: 0, overflow: 'hidden' }}
      onClose={handleHideDrawer}
      visible={isShowing}
      width={'90vw'}
      title={
        <MonitoringDrawerTitle
          deploymentName={deploymentName}
          handleDownloadAllFigures={handleDownloadAllFigures}
        />
      }
      closable
      destroyOnClose
    >
      <div className='monitoring-drawer-content'>
        {isLoading ? (
          <MonitoringDrawerSkeleton />
        ) : (
          <CustomDndProvider>
            <ReactGridLayout
              layout={gridLayout}
              rowHeight={35}
              cols={12}
              onDragStop={handleMoveOrResize}
              onResizeStop={handleMoveOrResize}
            >
              {monitorings.map((monitoring) => {
                const hasFilters = !!monitoring.filters?.length;
                const monitoringFigures = figures[monitoring.uuid] || [];

                const handleDownloadMonitoringChart = () => {};
                const handleRemoveThisMonitoring = () => {};

                return (
                  <div key={monitoring.uuid}>
                    <MonitoringDrawerItem
                      hasFilters={hasFilters}
                      figures={monitoringFigures}
                      monitoringName={monitoring.task?.name}
                      handleRemove={handleRemoveThisMonitoring}
                      handleDownload={handleDownloadMonitoringChart}
                    />
                  </div>
                );
              })}

              <div key={ADD_CARD_KEY}>
                <MonitoringDrawerAddCard
                  isAdding={isAdding}
                  handleAddMonitoring={handleAddMonitoring}
                />
              </div>
            </ReactGridLayout>
          </CustomDndProvider>
        )}
      </div>
    </Drawer>
  );
};

MonitoringDrawer.propTypes = {
  isAdding: PropTypes.bool,
  isShowing: PropTypes.bool,
  isLoading: PropTypes.bool,
  figures: PropTypes.object,
  monitorings: PropTypes.array,
  deploymentName: PropTypes.string,
  handleHideDrawer: PropTypes.func,
  handleUpdateLayout: PropTypes.func,
  handleAddMonitoring: PropTypes.func,
  handleDownloadAllFigures: PropTypes.func,
};

MonitoringDrawer.defaultProps = {
  isAdding: false,
  isShowing: false,
  isLoading: false,
  figures: {},
  monitorings: [],
  deploymentName: '',
  handleHideDrawer: undefined,
  handleUpdateLayout: undefined,
  handleAddMonitoring: undefined,
  handleDownloadAllFigures: undefined,
};

export default MonitoringDrawer;
