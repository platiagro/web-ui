// CORE LIBS
import React, { useState } from 'react';

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
const Experiment = () => {
  // HOOKS
  // drawer visible hook
  const [drawerVisible, setDrawerVisible] = useState(false);
  // drawer dataset hook
  const [drawerDataset, setDrawerDataset] = useState(false);
  // drawer title hook
  const [drawerTitle, setDrawerTitle] = useState('Título Drawer');

  // FUNCTIONS
  // show drawer function
  const showDrawer = () => setDrawerVisible(true);
  // hide drawer function
  const hideDrawer = () => setDrawerVisible(false);
  // set dataset type drawer
  const setDrawerToDataset = () => setDrawerDataset(true);
  // unset dataset type drawer
  const unsetDrawerToDataset = () => setDrawerDataset(false);

  // openning drawer
  const openDrawer = (operatorId, title) => {
    // configuring drawer title
    setDrawerTitle(title);

    // configuring drawer body
    if (operatorId === 'dataset') {
      // operator is dataset
      setDrawerToDataset();
    } else {
      // operator not is dataset
      unsetDrawerToDataset();
    }

    showDrawer();
  };

  return (
    // frangment container
    <>
      {/* drawer */}
      <Drawer
        title={drawerTitle}
        isVisible={drawerVisible}
        isDataset={drawerDataset}
        results={resultsDrawerMock}
        handleClose={hideDrawer}
      />
      {/* row container  */}
      <Row>
        {/* experiment header */}
        <ExperimentHeader />
      </Row>
      {/* row container */}
      <Row style={{ overflow: 'auto', height: '60vh' }}>
        {/* experiment flow */}
        <ExperimentFlow handleTaskBoxClick={openDrawer} />
      </Row>
    </>
  );
};

// EXPORT
export default Experiment;
