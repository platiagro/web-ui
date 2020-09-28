// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// UI LIBS
import ReactFlow, { Background } from 'react-flow-renderer';

// COMPONENTS
import TaskBox from '../TaskBox';
import LoadingBox from '../LoadingBox';
import Vectors, { nodeTypes, edgeTypes } from './CustomNodes';

// STYLES
import './style.less';

// GRID CONFIGURATION
const columnsNumber = 3;

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
 * @param {object} props Component props
 * @returns {ExperimentFlow} React component
 */
const ExperimentFlow = ({
  tasks,
  loading,
  handleTaskBoxClick,
  handleDeselectOperator,
}) => {
  const [connectClass, setConnectClass] = useState('');

  const calcDefaultPosition = (i) => {
    //Booleans to help arrow positioning in the future
    // const isFirstRowComponent = i % columnsNumber === 0;
    // const isLastRowComponent = (i + 1) % columnsNumber === 0;
    // const isLastFlowComponent = i === tasks.length - 1;

    return {
      x: 250 * (i % columnsNumber) + 50,
      y: 150 * Math.floor(i / columnsNumber) + 50,
    };
  };

  const cardsElements = tasks.map((component, index) => {
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
      position: calcDefaultPosition(index),
    };

    return [card, ...arrows];
  });

  const handleLoad = (reactFlowInstance) =>
    reactFlowInstance.setTransform({ x: 0, y: 0, zoom: 1 });

  //TODO: Will be used later.
  const handleConnect = (params) =>
    console.log(`Connect ${params.source} to ${params.target}`);

  const handleDragStop = (event, task) =>
    console.log(`${task.id} dragged to`, task.position);

  return loading ? (
    <LoadingBox />
  ) : (
    <ReactFlow
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      elements={_.flattenDeep(cardsElements)}
      onPaneClick={handleDeselectOperator}
      onLoad={handleLoad}
      onConnect={handleConnect}
      onNodeDragStop={handleDragStop}
      onConnectEnd={() => setConnectClass('')}
      onConnectStart={() => setConnectClass('Connecting')}
    >
      <Background variant='dots' gap={25} size={1} color='#58585850' />
      <Vectors />
    </ReactFlow>
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
};

// EXPORT
export default ExperimentFlow;
