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
const ExperimentFlow = ({ components, loading, handleTaskBoxClick }) => {
  const archerContainerRef = useRef(null);
  const [positions, setPositions] = useState(
    components.map(() => ({ x: 0, y: 0 }))
  );
  // archerContainerRef.current.refreshScreen();
  // COMPONENTS RENDERS
  // flow grid column
  // const renderFlowGridColumn = (
  //   isLastRowComponent,
  //   isLastFlowComponent,
  //   componentIndex,
  //   component
  // ) => {
  //   // component box
  //   const componentBox = (
  //     <Draggable bounds='parent'>
  //       <div>
  //         <ComponentBox
  //           handleClick={handleTaskBoxClick}
  //           {...component}
  //           operator={component}
  //         />
  //       </div>
  //     </Draggable>
  //   );

  //   // render component box with arrow connection
  //   if (!isLastFlowComponent)
  //     return (
  //       // arrow
  //       <ArcherElement
  //         id={`component${componentIndex}`}
  //         relations={[
  //           {
  //             targetId: `component${componentIndex + 1}`,
  //             targetAnchor:
  //               componentIndex > 0 && isLastRowComponent ? 'top' : 'left',
  //             sourceAnchor:
  //               componentIndex > 0 && isLastRowComponent ? 'bottom' : 'right',
  //           },
  //         ]}
  //       >
  //         {/* component box */}
  //         {componentBox}
  //       </ArcherElement>
  //     );

  //   // render component box without arrow connection
  //   return (
  //     // arrow
  //     <ArcherElement id={`component${componentIndex}`}>
  //       {/* component box */}
  //       {componentBox}
  //     </ArcherElement>
  //   );
  // };
  // // flow grid
  // const renderFlowGrid = () => {
  //   // flow grid array
  //   let flowGrid = [];
  //   // flow grid aux array
  //   const flowGridAux = [];
  //   // grid row aux array
  //   let gridRowAux = [];

  //   // building flow grid rows
  //   components.forEach((component, index) => {
  //     // first component in row
  //     const isFirstRowComponent = index % columnsNumber === 0;
  //     // last component in row
  //     const isLastRowComponent = (index + 1) % columnsNumber === 0;
  //     // last component in flow
  //     const isLastFlowComponent = index === components.length - 1;

  //     // cleaning row aux
  //     if (isFirstRowComponent) {
  //       gridRowAux = [];
  //     }

  //     // building grid row
  //     gridRowAux.push(
  //       // column container
  //       <Col key={`col-${index}`} span={columnSize}>
  //         {/* rendering flow grid column */}
  //         {renderFlowGridColumn(
  //           isLastRowComponent,
  //           isLastFlowComponent,
  //           index,
  //           component
  //         )}
  //       </Col>
  //     );

  //     // addding row to grid
  //     if (isLastRowComponent || isLastFlowComponent) {
  //       flowGridAux.push(gridRowAux);
  //     }
  //   });

  //   // building flow grid
  //   flowGrid = flowGridAux.map((flowGridRow, index) => {
  //     // row key
  //     const key = `row${index}`;

  //     return (
  //       // row container
  //       <Row key={key} gutter={[48, 96]} type='flex'>
  //         {/* flow grid row */}
  //         {flowGridRow}
  //       </Row>
  //     );
  //   });

  //   return flowGrid;
  // };

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
