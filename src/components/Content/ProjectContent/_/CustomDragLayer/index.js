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

  function renderItem() {
    switch (itemType) {
      case 'TASK':
        return <GenericBox name={item.name} icon={item.icon} />;
      default:
        return null;
    }
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div className='drag-layer'>
      <div style={getItemStyles(props)}>{renderItem()}</div>
    </div>
  );
});

// PROP TYPES
CustomDragLayer.propTypes = {
  isDragging: PropTypes.bool.isRequired,
  itemType: PropTypes.string.isRequired,
  item: PropTypes.any.isRequired,
};

export default CustomDragLayer;
