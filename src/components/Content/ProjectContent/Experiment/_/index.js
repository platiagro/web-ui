// CORE LIBS
import React from 'react';

// UI LIBS
import { Row } from 'antd';

// COMPONENTS
import ExperimentHeader from '../ExperimentHeader/_';
import ExperimentFlow from '../ExperimentFlow/_';

// MOCKS
import flowMock from '../ExperimentFlow/_/_flowMock';

/**
 * Editable Title.
 * This component is responsible for displaying an editable title.
 */
const Experiment = () => (
  // frangment container
  <>
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
