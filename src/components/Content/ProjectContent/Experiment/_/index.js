// CORE LIBS
import React from 'react';

// UI LIBS
import { Row } from 'antd';

// COMPONENTS
import ExperimentHeader from '../ExperimentHeader/_';
import ExperimentFlow from '../ExperimentFlow/_';
import Drawer from '../Drawer/_';

// MOCKS
import flowMock from '../ExperimentFlow/_/_flowMock';

/**
 * Editable Title.
 * This component is responsible for displaying an editable title.
 */
const Experiment = () => (
  // frangment container
  <>
    {/* drawer */}
    <Drawer
      title='Drawer Title'
      visible
      results
      handleClose={(e) => alert('close drawer')}
    />
    {/* row container  */}
    <Row>
      {/* experiment header */}
      <ExperimentHeader />
    </Row>
    {/* row container */}
    <Row>
      {/* experiment flow */}
      <ExperimentFlow components={flowMock} />
    </Row>
  </>
);

// EXPORT
export default Experiment;
