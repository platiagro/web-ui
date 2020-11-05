import React, { memo } from 'react';
import { getSmoothStepPath } from 'react-flow-renderer';
import { Menu, Dropdown } from 'antd';

const ARROWS = [
  {
    id: 'react-flow__arrowend',
    color: '#979797',
  },
  {
    id: 'react-flow__arrowend-selected',
    color: '#1890ff',
  },
  {
    id: 'react-flow__arrowend-hovered',
    color: '#595959',
  },
];

const CIRCLES = [
  {
    id: 'react-flow__circle',
    color: '#979797',
  },
  {
    id: 'react-flow__circle-selected',
    color: '#1890ff',
  },
  {
    id: 'react-flow__circle-hovered',
    color: '#595959',
  },
];

const Vectors = () => (
  <svg>
    <defs>
      {ARROWS.map((arrow) => (
        <marker
          class='react-flow__arrowhead'
          id={arrow.id}
          markerWidth='12.5'
          markerHeight='12.5'
          viewBox='-10 -10 20 20'
          refX='-5'
          refY='0'
        >
          <polyline
            stroke={arrow.color}
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='1'
            fill={arrow.color}
            points='-5,-4 0,0 -5,4 -5,-4'
          ></polyline>
        </marker>
      ))}

      {CIRCLES.map((circle) => (
        <marker
          class='react-flow__edge'
          id={circle.id}
          markerWidth='12.5'
          markerHeight='12.5'
          viewBox='-10 -10 20 20'
          refX='3'
          refY='0'
        >
          <circle r='3' fill={circle.color} />
        </marker>
      ))}
    </defs>
  </svg>
);

export const nodeTypes = {
  cardNode: memo(({ data }) => {
    return data.label;
  }),
};

export const edgeTypes = {
  customEdge: ({
    id,
    target,
    source,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data: { onDelete },
  }) => {
    const edgePath = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      borderRadius: 20,
    });

    const menu = (
      <Menu onClick={() => onDelete(target, source)}>
        <Menu.Item key='remove'>Remover</Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <path
          id={id}
          style={style}
          className='react-flow__edge-path'
          d={edgePath}
          markerEnd='url(#react-flow__arrowend)'
          markerStart='url(#react-flow__circle)'
        />
      </Dropdown>
    );
  },
};

export default Vectors;
