import React from 'react';
import _ from 'lodash';
import ReactFlow, { Background, Handle } from 'react-flow-renderer';
import LoadingBox from 'components/LoadingBox';
import PropTypes from 'prop-types';

import DeploymentFlowBox from './DeploymentFlowBox/DeploymentFlowBox.component';

import Vectors, {
  nodeTypes,
  edgeTypes,
} from 'components/Content/ExperimentsContent/Experiment/ExperimentFlow/_/CustomNodes';

// STYLES
import './DeploymentFlow.style.less';
/**
 * Fluxo de pré-implantação/implantação.
 */
function DeploymentFlow(props) {
  const { operators, loading } = props;

  const cardsElements = operators.map((component) => {
    const arrows = component.dependencies.map((arrow) => {
      const arrowId = `${component.uuid}/${arrow}`;
      return {
        id: arrowId,
        target: component.uuid,
        source: arrow,
        type: 'customEdge',
        data: {
          onDelete: null,
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
            <DeploymentFlowBox
              handleClick={() => {}}
              operator={component}
              dependenciesGraph={operators
                .map((el) => ({
                  id: el.uuid,
                  dep: el.dependencies,
                }))
                .reduce(
                  (obj, item) => Object.assign(obj, { [item.id]: item.dep }),
                  {}
                )}
              title={component.name}
              onSelect={() => {}}
              leftFlowHandle={
                <Handle
                  type='target'
                  position='left'
                  className='arrow-handler left'
                  isValidConnection={() => false}
                />
              }
              rightFlowHandle={
                <Handle
                  type='source'
                  position='right'
                  className='arrow-handler right'
                  isValidConnection={() => false}
                />
              }
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
    setTimeout(() => {
      reactFlowInstance.fitView();
      reactFlowInstance.zoomTo(1);
    }, 0);
  };

  //TODO: Trocar log por salvar posição do card
  const handleDragStop = (event, task) => console.log(task.id, task.position);

  return loading ? (
    <LoadingBox siderColor='#FFF2E8' />
  ) : (
    <div style={{ height: '100%' }}>
      <ReactFlow
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        nodesConnectable={false}
        elements={_.flattenDeep(cardsElements)}
        onLoad={handleLoad}
        onNodeDragStop={handleDragStop}
        onPaneContextMenu={(e) => e.preventDefault()}
      >
        <Background variant='dots' gap={25} size={1} color={'#58585850'} />
        <Vectors />
      </ReactFlow>
    </div>
  );
}

DeploymentFlow.propTypes = {
  operators: PropTypes.array,
  loading: PropTypes.bool,
};

export default DeploymentFlow;
