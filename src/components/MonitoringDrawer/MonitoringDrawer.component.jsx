import React from 'react';
import { Drawer } from 'antd';
import PropTypes from 'prop-types';
import RGL, { WidthProvider } from 'react-grid-layout';

import { CustomDndProvider, MonitoringDrawerItem } from 'components';

import { ADD_CARD_KEY } from './constants';
import useGridLayout from './useGridLayout';
import useMoveOrResize from './useMoveOrResize';
import MonitoringDrawerTitle from './MonitoringDrawerTitle';
import MonitoringDrawerAddCard from './MonitoringDrawerAddCard';
import MonitoringDrawerSkeleton from './MonitoringDrawerSkeleton';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './MonitoringDrawer.style.less';

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
      bodyStyle={{ padding: 0 }}
      onClose={handleHideDrawer}
      visible={isShowing}
      width={'85vw'}
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
              className={'layout'}
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
                  <MonitoringDrawerItem
                    key={monitoring.uuid}
                    hasFilters={hasFilters}
                    figures={monitoringFigures}
                    monitoringName={monitoring.task?.name}
                    handleRemove={handleRemoveThisMonitoring}
                    handleDownload={handleDownloadMonitoringChart}
                  />
                );
              })}

              <MonitoringDrawerAddCard
                key={ADD_CARD_KEY}
                isAdding={isAdding}
                handleAddMonitoring={handleAddMonitoring}
              />
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
