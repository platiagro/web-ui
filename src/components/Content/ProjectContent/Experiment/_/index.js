// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Row } from 'antd';

// COMPONENTS
import ExperimentHeader from '../ExperimentHeader/_';
import ExperimentFlow from '../ExperimentFlow/_';

const Experiment = () => (
  <>
    <Row>
      <ExperimentHeader />
    </Row>
    <Row>
      <ExperimentFlow />
    </Row>
  </>
);

export default Experiment;
