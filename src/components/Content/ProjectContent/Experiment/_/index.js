// CORE LIBS
import React from 'react';

// UI LIBS
import { Row } from 'antd';

// COMPONENTS
import ExperimentHeader from '../ExperimentHeader/_/Container';
import ExperimentFlow from '../ExperimentFlow/_/Container';
import Drawer from '../Drawer/_';

// MOCKS
import resultsDrawerMock from '../Drawer/ResultsDrawer/_/_resultsDrawerMock';

/**
 * Experiment.
 * This component is responsible for displaying an experiment.
 */
const Experiment = () => (
  // frangment container
  <>
    {/* drawer */}
    <Drawer
      title='Drawer Title'
      isVisible={false}
      results={resultsDrawerMock}
      handleClose={(e) => alert('closing drawer')}
    />
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

// EXPORT
export default Experiment;
