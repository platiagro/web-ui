// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { DropTarget } from 'react-dnd';

// UI LIBS
import ReactFlow, { Background } from 'react-flow-renderer';

// COMPONENTS
import TaskBox from '../TaskBox';
import LoadingBox from '../LoadingBox';
import Vectors, { nodeTypes, edgeTypes } from './CustomNodes';

// STYLES
import './style.less';

/**
 * Experiment Flow.
 * This component is responsible for displaying experiment flow grid.
 *
 * @component
 * @param props.tasks
 * @param props.loading
 * @param props.handleTaskBoxClick
 * @param props.tasks
 * @param props.loading
 * @param props.handleTaskBoxClick
 * @param props.tasks
 * @param props.loading
 * @param props.handleTaskBoxClick
 * @param props.handleDeselectOperator
 * @param props.handleSavePosition
 * @param {object} props Component props
 * @returns {ExperimentFlow} React component
 */
const ExperimentFlow = ({
  tasks,
  loading,
  handleTaskBoxClick,
  handleDeselectOperator,
  handleSavePosition,
  handleSaveFlowTransform,
  canDrop,
  isOver,
  connectDropTarget,
}) => {
  const [connectClass, setConnectClass] = useState('');

  const cardsElements = tasks.map((component) => {
    const arrows = component.dependencies.map((arrow) => {
      return {
        id: `${component.uuid}-${arrow}`,
        type: 'customEdge',
        target: component.uuid,
        source: arrow,
      };
    });

    const card = {
      id: component.uuid,
      sourcePosition: 'right',
      targetPosition: 'left',
      type: 'cardNode',
      data: {
        label: (
          <div
            id={component.uuid}
            style={{ width: 200 }}
            className='task-elements'
          >
            <TaskBox
              handleClick={handleTaskBoxClick}
              operator={component}
              onConnectingClass={connectClass}
              {...component}
            />
          </div>
        ),
      },
      position: { x: component.positionX, y: component.positionY },
    };

    return [card, ...arrows];
  });

  const handleLoad = (reactFlowInstance) => {
    handleSaveFlowTransform({ x: 0, y: 0, zoom: 1 });
    reactFlowInstance.setTransform({ x: 0, y: 0, zoom: 1 });
  };

  //TODO: Will be used later.
  const handleConnect = (params) =>
    console.log(`${params.target} has new dependency: ${params.source}`);

  const handleDragStop = (event, task) =>
    handleSavePosition(task.id, task.position);

  const isActive = canDrop && isOver;

  let backgroundColor = '#fff';
  if (isActive) {
    backgroundColor = 'rgba(20,250,20,0.1)';
  } else if (canDrop) {
    backgroundColor = 'rgba(250,20,20,0.1)';
  }

  return loading ? (
    <LoadingBox />
  ) : (
    <div style={{ height: '100%' }} ref={connectDropTarget}>
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesConnectable={false}
        elements={_.flattenDeep(cardsElements)}
        onPaneClick={handleDeselectOperator}
        onSelectionChange={handleDeselectOperator}
        onLoad={handleLoad}
        onConnect={handleConnect}
        onNodeDragStop={handleDragStop}
        onConnectEnd={() => setConnectClass('')}
        onConnectStart={() => setConnectClass('Connecting')}
        onMoveEnd={handleSaveFlowTransform}
      >
        <Background
          variant='dots'
          gap={25}
          size={1}
          color={'#58585850'}
          style={{ backgroundColor }}
        />
        <Vectors />
      </ReactFlow>
    </div>
  );
};

// PROP TYPES
ExperimentFlow.propTypes = {
  /** experiment flow tasks list */
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** experiment flow task box click handler */
  handleTaskBoxClick: PropTypes.func.isRequired,
  /** is loading */
  loading: PropTypes.bool.isRequired,
  /** flag for enable drop */
  canDrop: PropTypes.bool.isRequired,
  /** flag for show item over drop area */
  isOver: PropTypes.bool.isRequired,
  /** function to save offset of Flow Area */
  handleSaveFlowTransform: PropTypes.func.isRequired,
};

//HOC for transform ExperimentFlow into DropTarget
const ExperimentFlowDrop = DropTarget(
  'TASK',
  {
    canDrop(props) {
      const canDrop = !props.loading;
      return canDrop;
    },
    drop: (props, monitor) => {
      const delta = monitor.getClientOffset();

      const offset = props.flowTransform;

      const positions = { x: delta.x - 435, y: delta.y - 189 };

      const zoomRealPosition = {
        x: (positions.x - offset.x) / offset.zoom,
        y: (positions.y - offset.y) / offset.zoom,
      };

      return {
        name: 'Flow',
        pos: zoomRealPosition,
      };
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })
)(ExperimentFlow);

// EXPORT
export default ExperimentFlowDrop;
