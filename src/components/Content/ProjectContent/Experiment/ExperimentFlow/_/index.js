// CORE LIBS
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Spin, Row, Col } from 'antd';
import { ArcherContainer, ArcherElement } from 'react-archer';

import Draggable from 'react-draggable';

// COMPONENTS
import TaskBox from '../TaskBox';

// STYLES
import './styles.less';

// GRID CONFIGURATION
// numbers of columns in grid
const columnsNumber = 3;
// column size
const columnSize = 24 / columnsNumber;

/**
 * Experiment Flow.
 * This component is responsible for displaying experiment flow grid.
 *
 * @component
 * @param {object} props Component props
 * @returns {ExperimentFlow} React component
 */
const ExperimentFlow = (props) => {
  // destructuring props
  const { tasks, loading, handleTaskBoxClick } = props;

  // COMPONENTS RENDERS
  // flow grid column
  const renderFlowGridColumn = (
    isLastRowTask,
    isLastFlowTask,
    taskIndex,
    task
  ) => {
    // task box
    const taskBox = (
      <TaskBox handleClick={handleTaskBoxClick} {...task} operator={task} />
    );

    // render task box with arrow connection
    if (!isLastFlowTask)
      return (
        // arrow
        <ArcherElement
          id={`task${taskIndex}`}
          relations={[
            {
              targetId: `task${taskIndex + 1}`,
              targetAnchor: taskIndex > 0 && isLastRowTask ? 'top' : 'left',
              sourceAnchor: taskIndex > 0 && isLastRowTask ? 'bottom' : 'right',
            },
          ]}
        >
          {/* task box */}
          {taskBox}
        </ArcherElement>
      );

    // render task box without arrow connection
    return (
      // arrow
      <ArcherElement id={`task${taskIndex}`}>
        {/* task box */}
        {taskBox}
      </ArcherElement>
    );
  };
  // flow grid
  const renderFlowGrid = () => {
    // flow grid array
    let flowGrid = [];
    // flow grid aux array
    const flowGridAux = [];
    // grid row aux array
    let gridRowAux = [];

    // building flow grid rows
    tasks.forEach((task, index) => {
      // first task in row
      const isFirstRowTask = index % columnsNumber === 0;
      // last task in row
      const isLastRowTask = (index + 1) % columnsNumber === 0;
      // last task in flow
      const isLastFlowTask = index === tasks.length - 1;

      // cleaning row aux
      if (isFirstRowTask) {
        gridRowAux = [];
      }

      // building grid row
      gridRowAux.push(
        // column container
        <Col key={`col-${index}`} span={columnSize}>
          {/* rendering flow grid column */}
          {renderFlowGridColumn(isLastRowTask, isLastFlowTask, index, task)}
        </Col>
      );

      // addding row to grid
      if (isLastRowTask || isLastFlowTask) {
        flowGridAux.push(gridRowAux);
      }
    });

    // building flow grid
    flowGrid = flowGridAux.map((flowGridRow, index) => {
      // row key
      const key = `row${index}`;

      return (
        // row container
        <Row key={key} gutter={[48, 96]} type='flex'>
          {/* flow grid row */}
          {flowGridRow}
        </Row>
      );
    });

    return flowGrid;
  };

  // RENDER
  // return (
  //   // loading spinner
  //   <div
  //     style={{
  //       position: 'relative',
  //       backgroundColor: 'beige',
  //       height: '100%',
  //     }}
  //   >
  //     <Spin spinning={loading}>
  //       {/* arrow connection container */}
  //       <ArcherContainer strokeColor='gray' noCurves>
  //         {/* flow grid */}
  //         <div className='experiment-wraper'>{renderFlowGrid()}</div>
  //       </ArcherContainer>
  //     </Spin>
  //   </div>
  // );

  // console.log(positions);
  return (
    // <div
    //   style={{
    //     position: 'relative',
    //     backgroundColor: 'beige',
    //     height: '100%',
    //   }}
    // >
    <ArcherContainer
      ref={archerContainerRef}
      strokeColor='#FA541C'
      // noCurves
      arrowLength={0}
      style={{
        position: 'relative',
        backgroundColor: 'beige',
        height: '100%',
      }}
    >
      {loading ? (
        <Spin />
      ) : (
          components.map((component, index) => (
            <Draggable
              bounds='parent'
              defaultPosition={{ x: index, y: index }}
              onDrag={() => archerContainerRef.current.refreshScreen()}
            // onStop={() => console.log('stop', archerContainerRef)}
            >
              <div style={{ width: 200 }}>
                {index}
                {console.log(component)}
                <ArcherElement
                  id={`component${index}`}
                  relations={
                    index + 1 < components.length
                      ? [
                        {
                          targetId: `component${index + 1}`,
                          targetAnchor: 'left',
                          sourceAnchor: 'middle',
                        },
                      ]
                      : []
                  }
                >
                  <ComponentBox
                    handleClick={handleTaskBoxClick}
                    {...component}
                    operator={component}
                  />
                </ArcherElement>
              </div>
            </Draggable>
          ))
        )}
    </ArcherContainer>
    // </div>
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
