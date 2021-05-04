// CORE LIBS
import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ReactFlow, { Background } from 'react-flow-renderer';

import TaskBox from 'components/TaskBox';
import LoadingBox from 'components/LoadingBox';
import { LogsButton } from 'components/Buttons';

import Vectors, { nodeTypes, edgeTypes } from './CustomNodes';

import './style.less';

const ExperimentFlow = ({
  tasks,
  loading,
  arrowConfigs,
  handleTaskBoxClick,
  handleDeselectOperator,
  handleSavePosition,
  handleSaveDependencies,
  canDrop,
  isOver,
  connectDropTarget,
  handleToggleLogsPanel,
  isLogsPanelSelected,
  numberOfLogs,
}) => {
  const [connectClass, setConnectClass] = useState('');

  const handleLoad = (reactFlowInstance) => {
    setTimeout(() => {
      reactFlowInstance.fitView();
      reactFlowInstance.zoomTo(1);
    }, 0);
  };

  const handleConnect = (params) => {
    const targetDependencies = tasks.filter(
      (operator) => operator.uuid === params.target
    )[0].dependencies;

    handleSaveDependencies(params.target, [
      ...targetDependencies,
      params.source,
    ]);
  };

  const handleDeleteConnection = (target, source) => {
    const targetDependencies = [...tasks].filter((el) => el.uuid === target)[0]
      .dependencies;
    const removeDependencies = targetDependencies.filter(
      (dep) => dep !== source
    );

    handleSaveDependencies(target, removeDependencies);
  };

  const handleDragStop = (event, task) =>
    handleSavePosition(task.id, task.position);

  const isActive = canDrop && isOver;

  let backgroundColor = '#fff';
  if (isActive) {
    backgroundColor = 'rgba(20,250,20,0.1)';
  } else if (canDrop) {
    backgroundColor = 'rgba(250,20,20,0.1)';
  }

  const cardsElements = tasks.map((component) => {
    const arrows = component.dependencies.map((arrow) => {
      const arrowId = `${component.uuid}/${arrow}`;
      return {
        id: arrowId,
        type: 'customEdge',
        target: component.uuid,
        source: arrow,
        animated: arrowId === arrowConfigs.uuid ? arrowConfigs.loading : false,
        data: {
          onDelete: handleDeleteConnection,
        },
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
              dependenciesGraph={tasks
                .map((el) => ({
                  id: el.uuid,
                  dep: el.dependencies,
                }))
                .reduce(
                  (obj, item) => Object.assign(obj, { [item.id]: item.dep }),
                  {}
                )}
              {...component}
            />
          </div>
        ),
      },
      position: {
        x: component.positionX,
        y: component.positionY,
      },
    };

    return [card, ...arrows];
  });

  return loading ? (
    <LoadingBox />
  ) : (
    <div className='experiment-flow' ref={connectDropTarget}>
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesConnectable={true}
        elements={_.flattenDeep(cardsElements)}
        onPaneClick={handleDeselectOperator}
        onSelectionChange={handleDeselectOperator}
        onLoad={handleLoad}
        onConnect={handleConnect}
        onNodeDragStop={handleDragStop}
        onConnectEnd={() => setConnectClass('')}
        onConnectStart={() => setConnectClass('Connecting')}
        onPaneContextMenu={(e) => e.preventDefault()}
        deleteKeyCode={46}
        onElementsRemove={(e) => {
          const line = e[0];
          if (line.type !== 'cardNode') {
            handleDeleteConnection(line.target, line.source);
          }
        }}
      >
        <Background
          variant='dots'
          gap={25}
          size={1}
          color={'#58585850'}
          style={{ backgroundColor }}
        />

        <LogsButton
          className='experiment-flow-logs-button'
          errorCount={numberOfLogs}
          isActive={isLogsPanelSelected}
          onClick={handleToggleLogsPanel}
        />

        <Vectors />
      </ReactFlow>
    </div>
  );
};

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
  handleSaveFlowTransform: PropTypes.func,
};

//HOC for transform ExperimentFlow into DropTarget
const ExperimentFlowDrop = DropTarget(
  'TASK',
  {
    canDrop(props) {
      return !props.loading;
    },
    drop: (props, monitor) => {
      const delta = monitor.getClientOffset();
      delta.x = delta.x ?? 435;
      delta.y = delta.y ?? 189;

      const offset = {
        x: props.transformations[0],
        y: props.transformations[1],
        zoom: props.transformations[2],
      };

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

export default ExperimentFlowDrop;