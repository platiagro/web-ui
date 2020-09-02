// CORE LIBS
import React from 'react';

// COMPONENTS
import ContentHeader from '../../ContentHeader/_/ContentHeaderContainer';
import ImplantedExperimentsTable from '../ImplantedExperimentsTable/_/Container';

import NewDeploymentsModalContainer from '../UsingDeploymentsModal/Container';
import ButtonUsingDeploymentsContainer from '../ButtonUsingDeployments/Container';
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
      <NewDeploymentsModalContainer />
      <ButtonUsingDeploymentsContainer />
      <ImplantedExperimentsTable />
    </div>
  </>
);

// EXPORT
export default ImplantedExperimentsContent;
