import React from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

const TAB_TYPE = 'TAB';
const tabTargetConfig = {
  drop(props, monitor) {
    const mon = monitor;
    const dragKey = mon.getItem().index;
    const hoverKey = props.index;

    if (dragKey === hoverKey) {
      return;
    }

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
  const { activeTab, children, onMoveTab } = props;

  const tabs = [];
  React.Children.forEach(children, (c) => {
    tabs.push(c);
  });

  const renderTabBar = (propsTabBar, DefaultTabBar) => (
    <DefaultTabBar {...propsTabBar}>
      {(node) => (
        <WrappedTabNode key={node.key} index={node.key} moveTabNode={onMoveTab}>
          {node}
        </WrappedTabNode>
      )}
    </DefaultTabBar>
  );

  return (
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

DraggableTabs.propTypes = {
  activeTab: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onMoveTab: PropTypes.func.isRequired,
};

DraggableTabs.defaultProps = {
  activeTab: undefined,
};

export default DraggableTabs;
