// CORE LIBS
import React from 'react';

// UI LIBS
import { Row } from 'antd';

// COMPONENTS
import ExperimentHeader from '../ExperimentHeader/_/Container';
import ExperimentFlow from '../ExperimentFlow/_/Container';

// CONTAINERS
import { OperatorResizableSectionContainer } from 'containers';

/**
 * Experiment.
 * This component is responsible for displaying an experiment.
 */
const Experiment = () => {
  return (
    // frangment container
    <>
      {/* row container  */}
      <Row>
        {/* experiment header */}
        <ExperimentHeader />
      </Row>
      {/* row container */}
      <Row style={{ overflow: 'auto', height: '65vh', alignItems: 'stretch' }}>
        {/* Resizable Section Container */}
        <OperatorResizableSectionContainer />
        {/* experiment flow */}
        <ExperimentFlow />
      </Row>
    </>
  );
};

// EXPORT
export default Experiment;
