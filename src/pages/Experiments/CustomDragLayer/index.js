import React from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import GenericBox from '../GenericBox';
import './style.less';

const getItemStyles = (props) => {
  const { initialOffset, currentOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  let { x, y } = currentOffset;
  const transform = `translate(${x - 100}px, ${y - 25}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

const CustomDragLayer = DragLayer((monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))((props) => {
  const { item, itemType, isDragging } = props;

  if (!isDragging) {
    return null;
  }

  return (
    <div className='drag-layer'>
      <div style={getItemStyles(props)}>
        {itemType === 'TASK' ? (
          <GenericBox name={item.name} icon={item.icon} />
        ) : null}
      </div>
    </div>
  );
});

CustomDragLayer.propTypes = {
  isDragging: PropTypes.bool,
  itemType: PropTypes.string,
  item: PropTypes.any,
};

export default CustomDragLayer;
