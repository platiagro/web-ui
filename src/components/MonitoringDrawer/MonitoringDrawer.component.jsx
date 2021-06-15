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

import { ADD_CARD_KEY } from './constants';

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
      bodyStyle={{ padding: 0, background: '#eceff1' }}
      onClose={handleHideDrawer}
      visible={isShowing}
      width={'90vw'}
      push={false}
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
              containerPadding={[30, 30]}
            >
              {monitorings.map((monitoring) => {
                const monitoringFigures = figures[monitoring.uuid] || [];

                const hasFigures = monitoringFigures.length > 0;
                const hasFilters = !!monitoring.filters?.length && hasFigures;

                const handleDownloadMonitoringChart = () => {
                  // TODO: Fazer o download do gráfico
                };

                const handleRemoveThisMonitoring = () => {
                  // TODO: Fazer a remoção do <MonitoringDrawerItem /> do grid
                };

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
