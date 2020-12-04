import React from 'react';
import _ from 'lodash';
import ReactFlow, { Background } from 'react-flow-renderer';
import LoadingBox from 'components/LoadingBox';
import PropTypes from 'prop-types';

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
      };
    });

    const card = {
      id: component.uuid,
      sourcePosition: 'right',
      targetPosition: 'left',
      data: {
        label: component.name,
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
  const handleDragStop = (_, task) =>
    console.log(task.id, task.position);
 
  return  loading ? (
    <LoadingBox siderColor='#FFF2E8' />
  ) : (
    <div style={{ height: '100%' }} >
      <ReactFlow
        nodesConnectable={false}
        elements={_.flattenDeep(cardsElements)}
        onLoad={handleLoad}
        onNodeDragStop={handleDragStop}
        onPaneContextMenu={(e) => e.preventDefault()}
      >
        <Background
          variant='dots'
          gap={25}
          size={1}
          color={'#58585850'}
        />
      </ReactFlow>
  </div>
);
}

DeploymentFlow.propTypes = {
  operators: PropTypes.array,
  loading: PropTypes.bool
}

export default DeploymentFlow;
