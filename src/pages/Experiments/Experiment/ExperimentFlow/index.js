import React, { useMemo, useState } from 'react';
import lodash from 'lodash';
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
  isOver,
  canDrop,
  loading,
  arrowConfigs,
  numberOfLogs,
  connectDropTarget,
  isLogsPanelSelected,
  handleTaskBoxClick,
  handleSavePosition,
  handleToggleLogsPanel,
  handleSaveDependencies,
  handleDeselectOperator,
}) => {
  const [connectClass, setConnectClass] = useState('');

  const handleLoad = (reactFlowInstance) => {
    setTimeout(() => {
      reactFlowInstance.fitView();
      reactFlowInstance.zoomTo(1);
    }, 0);
  };

  const handleConnect = (params) => {
    const targetTask = tasks.find(({ uuid }) => uuid === params.target);
    const targetDependencies = targetTask.dependencies;
    handleSaveDependencies(params.target, [
      ...targetDependencies,
      params.source,
    ]);
  };

  const handleDeleteConnection = (target, source) => {
    const targetTask = tasks.find((el) => el.uuid === target);
    const targetDependencies = targetTask.dependencies;
    const filteredDependencies = targetDependencies.filter(
      (dep) => dep !== source
    );

    handleSaveDependencies(target, filteredDependencies);
  };

  const handleDragStop = (_, task) => {
    handleSavePosition(task.id, task.position);
  };

  const isActive = useMemo(() => {
    return canDrop && isOver;
  }, [canDrop, isOver]);

  const backgroundColor = useMemo(() => {
    if (isActive) return 'rgba(20,250,20,0.1)';
    else if (canDrop) return 'rgba(250,20,20,0.1)';
    return '#ffffff';
  }, [canDrop, isActive]);

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
        deleteKeyCode={46}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodesConnectable={true}
        elements={lodash.flattenDeep(cardsElements)}
        onLoad={handleLoad}
        onConnect={handleConnect}
        onNodeDragStop={handleDragStop}
        onPaneClick={handleDeselectOperator}
        onConnectEnd={() => setConnectClass('')}
        onSelectionChange={handleDeselectOperator}
        onPaneContextMenu={(e) => e.preventDefault()}
        onConnectStart={() => setConnectClass('Connecting')}
        onElementsRemove={(e) => {
          const line = e[0];
          if (line.type !== 'cardNode') {
            handleDeleteConnection(line.target, line.source);
          }
        }}
      >
        <Background
          gap={25}
          size={1}
          variant='dots'
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
  tasks: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  isOver: PropTypes.bool.isRequired,
  numberOfLogs: PropTypes.number.isRequired,
  arrowConfigs: PropTypes.object.isRequired,
  connectDropTarget: PropTypes.object.isRequired,
  isLogsPanelSelected: PropTypes.bool.isRequired,
  handleSavePosition: PropTypes.func.isRequired,
  handleTaskBoxClick: PropTypes.func.isRequired,
  handleToggleLogsPanel: PropTypes.func.isRequired,
  handleDeselectOperator: PropTypes.func.isRequired,
  handleSaveDependencies: PropTypes.func.isRequired,
  handleSaveFlowTransform: PropTypes.func.isRequired,
};

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
