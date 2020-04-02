// CORE LIBS
import React from 'react';

// UI LIBS
import { Spin, Row } from 'antd';

// COMPONENTS
import ExperimentHeader from '../ExperimentHeader/_/Container';
import ExperimentFlow from '../ExperimentFlow/_/Container';
import Drawer from '../Drawer/_/Container';

/**
 * Experiment.
 * This component is responsible for displaying an experiment.
 */
const Experiment = () => {
  return (
    // frangment container
    <>
      {/* drawer */}
      <Drawer />
      {/* row container  */}
      <Row>
        {/* experiment header */}
        <ExperimentHeader />
      </Row>
      {/* row container */}
      <Row style={{ overflow: 'auto', height: '60vh' }}>
        {/* experiment flow */}
        <ExperimentFlow />
      </Row>
    </>
  );
};

// EXPORT
export default Experiment;
