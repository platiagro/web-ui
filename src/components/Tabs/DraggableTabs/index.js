// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Tabs } from 'antd';
import { DragSource, DropTarget } from 'react-dnd';

// DRAG AND DROP PROPERTIES
// tab type
const TAB_TYPE = 'TAB';
// tab target
const tabTargetConfig = {
  // drop event
  drop(props, monitor) {
    // monitor constant
    const mon = monitor;
    // get dragging tab key
    const dragKey = mon.getItem().index;
    // get hovering tab key
    const hoverKey = props.index;

    // dragging tab is same of hovering tab
    if (dragKey === hoverKey) {
      return;
    }

    // moving tab
    props.moveTabNode(dragKey, hoverKey);
    // setting new key to dragging tab
    mon.getItem().index = hoverKey;
  },
};
// tab source
const tabSourceConfig = {
  // drag event
  beginDrag(props) {
    // getting tab properties
    return {
      id: props.id,
      index: props.index,
    };
  },
};

// DRAG AND DROP TAB NODES CONTAINERS
// tab node
const TabNode = ({ connectDragSource, connectDropTarget, children }) => {
  // connecting drag and drop
  return connectDragSource(connectDropTarget(children));
};
// wrapped tab node (configuring drag and drop)
const WrappedTabNode = DropTarget(TAB_TYPE, tabTargetConfig, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource(TAB_TYPE, tabSourceConfig, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(TabNode)
);

/**
 * Draggable Tabs.
 * This component is responsible for displaying and configuring draggable tabs.
 */
const DraggableTabs = (props) => {
  const { handleMoveTab, children, activeTab } = props;

  // tabs array
  const tabs = [];
  React.Children.forEach(children, (c) => {
    tabs.push(c);
  });

  // COMPONENTS RENDERS
  // tab bar
  const renderTabBar = (propsTabBar, DefaultTabBar) => (
    // tab bar
    <DefaultTabBar {...propsTabBar}>
      {/* wrapped tabs */}
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

  // RENDER
  return (
    // drag and drop provider
    <Tabs
      activeKey={activeTab}
      type='card'
      renderTabBar={renderTabBar}
      className='draggableTabs'
      {...props}
    >
      {tabs}
    </Tabs>
  );
};

// PROP TYPES
DraggableTabs.propTypes = {
  /** draggable tabs move tab handler */
  handleMoveTab: PropTypes.func.isRequired,
  /** draggable tabs active tab key */
  activeTab: PropTypes.string,
  /** draggable tabs or tab */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

// PROP DEFAULT VALUES
DraggableTabs.defaultProps = {
  /** draggable tabs active tab key */
  activeTab: undefined,
};

// EXPORT
export default DraggableTabs;
