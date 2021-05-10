import React, { useCallback } from 'react';
import { Drawer } from 'antd';
import PropTypes from 'prop-types';
import RGL, { WidthProvider } from 'react-grid-layout';

import MonitoringDrawerTitle from './MonitoringDrawerTitle';
import MonitoringDrawerAddCard from './MonitoringDrawerAddCard';
import MonitoringDrawerSkeleton from './MonitoringDrawerSkeleton';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './MonitoringDrawer.style.less';

const ReactGridLayout = WidthProvider(RGL);
const ADD_CARD_KEY = '@MONITORING_DRAWER/ADD_CARD_KEY';

const MonitoringDrawer = ({
  isShowing,
  isLoading,
  isAdding,
  handleDownload,
  handleHideDrawer,
  handleUpdateLayout,
  handleAddMonitoringTask,
  deploymentName,
  monitoringTasks,
}) => {
  const generateGridLayout = useCallback(() => {
    let totalW = 0;

    const gridLayout = monitoringTasks.map((item) => {
      let itemLayout = item.layout;
      if (!itemLayout) {
        itemLayout = {
          x: (Math.floor(totalW / 6) % 2) * 6,
          y: 9999,
          w: 6,
          h: 12,
        };
      }
      totalW += itemLayout.w;
      itemLayout.i = item.uuid;
      itemLayout.minW = 6;
      itemLayout.minH = 12;
      return itemLayout;
    });

    gridLayout.push({
      i: ADD_CARD_KEY,
      x: (Math.floor(totalW / 6) % 2) * 6,
      y: 99999,
      w: 6,
      h: 2,
      isBounded: true,
      isDraggable: true,
      isResizable: false,
    });

    return gridLayout;
  }, [monitoringTasks]);

  const handleMoveOrResize = useCallback(
    (layout, _, newItem) => {
      if (newItem.i === ADD_CARD_KEY) return;

      for (const layoutItem of layout) {
        if (layoutItem.i !== ADD_CARD_KEY) {
          let compareResult = monitoringTasks.find(
            (e) => e.uuid === layoutItem.i
          );

          compareResult.layout = {
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          };

          handleUpdateLayout(compareResult, false);
        }
      }
    },
    [handleUpdateLayout, monitoringTasks]
  );

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
          handleDownload={handleDownload}
        />
      }
      closable
      destroyOnClose
    >
      <div className='monitoring-drawer-content'>
        {isLoading ? (
          <MonitoringDrawerSkeleton />
        ) : (
          <ReactGridLayout
            cols={12}
            rowHeight={35}
            className={'layout'}
            layout={generateGridLayout()}
            onDragStop={handleMoveOrResize}
            onResizeStop={handleMoveOrResize}
          >
            <MonitoringDrawerAddCard
              key={ADD_CARD_KEY}
              isAdding={isAdding}
              handleAddMonitoringTask={handleAddMonitoringTask}
            />
          </ReactGridLayout>
        )}
      </div>
    </Drawer>
  );
};

MonitoringDrawer.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAdding: PropTypes.bool.isRequired,
  handleDownload: PropTypes.func.isRequired,
  handleHideDrawer: PropTypes.func.isRequired,
  handleUpdateLayout: PropTypes.func.isRequired,
  handleAddMonitoringTask: PropTypes.func.isRequired,
  deploymentName: PropTypes.string,
  monitoringTasks: PropTypes.array,
};

MonitoringDrawer.defaultProps = {
  deploymentName: '',
  monitoringTasks: [],
};

export default MonitoringDrawer;
