import React, { memo } from 'react';
import { getSmoothStepPath } from 'react-flow-renderer';

const Vectors = () => (
  <svg>
    <defs>
      <marker
        class='react-flow__arrowhead'
        id='react-flow__arrowend'
        markerWidth='12.5'
        markerHeight='12.5'
        viewBox='-10 -10 20 20'
        refX='-5'
        refY='0'
      >
        <polyline
          stroke='#979797'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='1'
          fill='#979797'
          points='-5,-4 0,0 -5,4 -5,-4'
        ></polyline>
      </marker>

      <marker
        class='react-flow__arrowhead'
        id='react-flow__arrowend-selected'
        markerWidth='12.5'
        markerHeight='12.5'
        viewBox='-10 -10 20 20'
        refX='-5'
        refY='0'
      >
        <polyline
          stroke='#1890ff'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='1'
          fill='#1890ff'
          points='-5,-4 0,0 -5,4 -5,-4'
        ></polyline>
      </marker>

      <marker
        class='react-flow__arrowhead'
        id='react-flow__arrowend-hovered'
        markerWidth='12.5'
        markerHeight='12.5'
        viewBox='-10 -10 20 20'
        refX='-5'
        refY='0'
      >
        <polyline
          stroke='#595959'
          stroke-linecap='round'
          stroke-linejoin='round'
          stroke-width='1'
          fill='#595959'
          points='-5,-4 0,0 -5,4 -5,-4'
        ></polyline>
      </marker>

      <marker
        class='react-flow__edge'
        id='react-flow__circle'
        markerWidth='12.5'
        markerHeight='12.5'
        viewBox='-10 -10 20 20'
        refX='3'
        refY='0'
      >
        <circle r='3' fill='#979797' />
      </marker>

      <marker
        class='react-flow__edge'
        id='react-flow__circle-hovered'
        markerWidth='12.5'
        markerHeight='12.5'
        viewBox='-10 -10 20 20'
        refX='3'
        refY='0'
      >
        <circle r='3' fill='#595959' />
      </marker>

      <marker
        class='react-flow__edge'
        id='react-flow__circle-selected'
        markerWidth='12.5'
        markerHeight='12.5'
        viewBox='-10 -10 20 20'
        refX='3'
        refY='0'
      >
        <circle r='3' fill='#1890ff' />
      </marker>
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
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
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
      <path
        id={id}
        style={style}
        className='react-flow__edge-path'
        d={edgePath}
        markerEnd='url(#react-flow__arrowend)'
        markerStart='url(#react-flow__circle)'
      />
    );
  },
};

export default Vectors;
