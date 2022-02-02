import React, { useEffect, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { LinkOutlined } from '@ant-design/icons';


import { DragIndicatorComponent } from 'assets';

const MenuItem = ({
  isDragging,
  connectDragSource,
  connectDragPreview,
  children,
  disabled,
  tutorialUrl,
}) => {
  const opacity = useMemo(() => (isDragging ? 0.6 : 1), [isDragging]);

  useEffect(() => {
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true,
      });
    }
  }, [connectDragPreview]);

  const getClassName = () => {
    const disabledClass = disabled ? 'draggable-item-content-disabled' : '';
    return `draggable-item-content ${disabledClass}`;
  };


  return (
    <div
      className={getClassName()}
      ref={connectDragSource}
      draggable={!disabled}
      disabled={disabled}
      style={{ opacity }}
    >
      <div className='draggable-item-content-icon'>
        <DragIndicatorComponent />
      </div>

      <div className='draggable-item-content-text'>{children}</div>

      <div className='draggable-item '>
        <a className='icon' href={tutorialUrl} target="_blank" rel='noreferrer'> <LinkOutlined /> </a> 
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  isDragging: PropTypes.bool,
  connectDragSource: PropTypes.any,
  connectDragPreview: PropTypes.any,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  tutorialUrl: PropTypes.string,
};

const DraggableItem = DragSource(
  'TASK',
  {
    canDrag(props) {
      return !props.disabled;
    },
    beginDrag: (props) => ({
      name: props.name,
      icon: props.icon,
      taskId: props.taskId,
      taskType: props.taskType,
      disabled: props.disabled,
    }),
    endDrag(props, monitor) {
      if (monitor.didDrop()) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        if (dropResult) {
          props.handleSelect(item.taskId, item.taskType, dropResult?.pos);
        }
      }
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })
)(MenuItem);

DraggableItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  taskType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  handleSelect: PropTypes.func.isRequired,
  tutorialUrl: PropTypes.string,
};

DraggableItem.defaultProps = {
  tutorialUrl: ''
}

export default memo(DraggableItem);
