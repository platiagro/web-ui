// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Row } from 'antd';

// COMPONENTS
import ExperimentHeader from '../ExperimentHeader/_';
import ExperimentFlow from '../ExperimentFlow/_';

// MOCKS
import flowMock from '../ExperimentFlow/_/_flowMock';

const Experiment = () => (
  <>
    <Row>
      <ExperimentHeader />
    </Row>
    <Row>
      <ExperimentFlow components={flowMock} />
    </Row>
  </>
);

export default Experiment;
