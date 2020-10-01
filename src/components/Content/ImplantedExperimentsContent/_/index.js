// CORE LIBS
import React from 'react';

// COMPONENTS
import ButtonUsingDeploymentsContainer from '../ButtonUsingDeployments/Container';
import ContentHeader from '../../ContentHeader/_/ContentHeaderContainer';
import ImplantedExperimentsTableContainer from '../ImplantedExperimentsTable/_/Container';
import InferenceTestResultModalContainer from '../InferenceTestResultModal/Container';
import LogsDrawerContainer from '../LogsDrawer/Container';
import NewDeploymentsModalContainer from '../UsingDeploymentsModal/Container';

/**
 * Implantend Experiments Content.
 * This component is responsible for displaying the implanted experiments content.
 */
const ImplantedExperimentsContent = () => (
  // fragment container
  <>
    {/* content header */}
    <ContentHeader
      title='Fluxos implantados'
      editable={false}
      backIcon={false}
    />
    {/* div content page container */}
    <div className='contentPage'>
      <ButtonUsingDeploymentsContainer />
      <NewDeploymentsModalContainer />
      <ImplantedExperimentsTableContainer />
      <LogsDrawerContainer />
      <InferenceTestResultModalContainer />
    </div>
  </>
);

// EXPORT
export default ImplantedExperimentsContent;
