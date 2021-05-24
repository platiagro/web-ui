/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import React, { memo } from 'react';
import { Menu, Dropdown } from 'antd';
import { getSmoothStepPath } from 'react-flow-renderer';

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
          className='react-flow__arrowhead'
          id={arrow.id}
          markerWidth='12.5'
          markerHeight='12.5'
          viewBox='-10 -10 20 20'
          refX='-5'
          refY='0'
          key={arrow.id}
        >
          <polyline
            stroke={arrow.color}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1'
            fill={arrow.color}
            points='-5,-4 0,0 -5,4 -5,-4'
          ></polyline>
        </marker>
      ))}

      {CIRCLES.map((circle) => (
        <marker
          className='react-flow__edge'
          id={circle.id}
          markerWidth='12.5'
          markerHeight='12.5'
          viewBox='-10 -10 20 20'
          refX='3'
          refY='0'
          key={circle.id}
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
    data: { onDelete } = {},
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

    return (
      <Dropdown
        trigger={['contextMenu']}
        overlay={
          <Menu onClick={() => onDelete(target, source)}>
            {onDelete && <Menu.Item key='remove'>Remover</Menu.Item>}
          </Menu>
        }
      >
        <path
          id={id}
          style={style}
          d={edgePath}
          className='react-flow__edge-path'
          markerEnd='url(#react-flow__arrowend)'
          markerStart='url(#react-flow__circle)'
        />
      </Dropdown>
    );
  },
};

export default Vectors;
