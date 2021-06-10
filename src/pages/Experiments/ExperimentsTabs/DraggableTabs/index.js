import React from 'react';
import PropTypes from 'prop-types';

import { Tabs } from 'antd';
import { DragSource, DropTarget } from 'react-dnd';

const TAB_TYPE = 'TAB';

const tabTargetConfig = {
  drop(props, monitor) {
    const mon = monitor;
    const dragKey = mon.getItem().index;
    const hoverKey = props.index;
    if (dragKey === hoverKey) return;
    props.moveTabNode(dragKey, hoverKey);
    mon.getItem().index = hoverKey;
  },
};

const tabSourceConfig = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const TabNode = ({ connectDragSource, connectDropTarget, children }) => {
  return connectDragSource(connectDropTarget(children));
};

const WrappedTabNode = DropTarget(TAB_TYPE, tabTargetConfig, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource(TAB_TYPE, tabSourceConfig, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(TabNode)
);

const DraggableTabs = (props) => {
  const { handleMoveTab, children, activeExperiment } = props;

  const tabs = [];
  React.Children.forEach(children, (c) => {
    tabs.push(c);
  });

  const renderTabBar = (propsTabBar, DefaultTabBar) => (
    <DefaultTabBar {...propsTabBar}>
      {(node) => (
        <WrappedTabNode
          key={node.key}
          index={node.key}
          moveTabNode={handleMoveTab}
        >
          {node}
        </WrappedTabNode>
      )}
    </DefaultTabBar>
  );

  return (
    <Tabs
      type='card'
      className='experimentTabs'
      renderTabBar={renderTabBar}
      activeKey={activeExperiment}
      {...props}
    >
      {tabs}
    </Tabs>
  );
};

DraggableTabs.propTypes = {
  handleMoveTab: PropTypes.func.isRequired,
  activeExperiment: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

DraggableTabs.defaultProps = {
  activeExperiment: undefined,
};

export default DraggableTabs;
