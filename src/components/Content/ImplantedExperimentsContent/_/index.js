// CORE LIBS
import React from 'react';

// COMPONENTS
import ContentHeader from 'components/Content/ContentHeader/_/ContentHeaderContainer';

// CONTAINERS
import {
  DeploymentsTableContainer,
  InferenceTestResultModalContainer,
  LogsDrawerContainer,
  UsingDeploymentsButtonContainer,
  UsingDeploymentsModalContainer,
} from 'containers';

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
      <UsingDeploymentsButtonContainer />
      <UsingDeploymentsModalContainer />
      <DeploymentsTableContainer />
      <LogsDrawerContainer />
      <InferenceTestResultModalContainer />
    </div>
  </>
);

// EXPORT
export default ImplantedExperimentsContent;
