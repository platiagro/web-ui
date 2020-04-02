// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Spin, Row, Col } from 'antd';
import { ArcherContainer, ArcherElement } from 'react-archer';

// COMPONENTS
import ComponentBox from '../ComponentBox';

// STYLES
import './styles.scss';

// GRID CONFIGURATION
// numbers of columns in grid
const columnsNumber = 3;
// column size
const columnSize = 24 / columnsNumber;

// TODO: alterar components para tasks
/**
 * Experiment Flow.
 * This component is responsible for displaying experiment flow grid.
 */
const ExperimentFlow = ({ components, loading, handleTaskBoxClick }) => {
  // COMPONENTS RENDERS
  // flow grid column
  const renderFlowGridColumn = (
    isLastRowComponent,
    isLastFlowComponent,
    componentIndex,
    component
  ) => {
    // component box
    const componentBox = (
      <ComponentBox
        handleClick={handleTaskBoxClick}
        {...component}
        operator={component}
      />
    );

    // render component box with arrow connection
    if (!isLastFlowComponent)
      return (
        // arrow
        <ArcherElement
          id={`component${componentIndex}`}
          relations={[
            {
              targetId: `component${componentIndex + 1}`,
              targetAnchor:
                componentIndex > 0 && isLastRowComponent ? 'top' : 'left',
              sourceAnchor:
                componentIndex > 0 && isLastRowComponent ? 'bottom' : 'right',
            },
          ]}
        >
          {/* component box */}
          {componentBox}
        </ArcherElement>
      );

    // render component box without arrow connection
    return (
      // arrow
      <ArcherElement id={`component${componentIndex}`}>
        {/* component box */}
        {componentBox}
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
    components.forEach((component, index) => {
      // first component in row
      const isFirstRowComponent = index % columnsNumber === 0;
      // last component in row
      const isLastRowComponent = (index + 1) % columnsNumber === 0;
      // last component in flow
      const isLastFlowComponent = index === components.length - 1;

      // cleaning row aux
      if (isFirstRowComponent) {
        gridRowAux = [];
      }

      // building grid row
      gridRowAux.push(
        // column container
        <Col key={`col-${component.key}`} span={columnSize}>
          {/* rendering flow grid column */}
          {renderFlowGridColumn(
            isLastRowComponent,
            isLastFlowComponent,
            index,
            component
          )}
        </Col>
      );

      // addding row to grid
      if (isLastRowComponent || isLastFlowComponent) {
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
  return (
    // loading spinner
    <Spin spinning={loading}>
      {/* arrow connection container */}
      <ArcherContainer strokeColor='gray' noCurves>
        {/* flow grid */}
        <div className='experiment-wraper'>{renderFlowGrid()}</div>
      </ArcherContainer>
    </Spin>
  );
};

// TODO: add loading prop
// PROP TYPES
ExperimentFlow.propTypes = {
  /** experiment flow components list */
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  /** experiment flow task box click handler */
  handleTaskBoxClick: PropTypes.func.isRequired,
};

// EXPORT
export default ExperimentFlow;
