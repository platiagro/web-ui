// CORE LIBS
import React from 'react';

// COMPONENTS
import ContentHeader from '../../ContentHeader/Container';
import ImplantedExperimentsTable from '../ImplantedExperimentsTable/_/Container';

/**
 * Implantend Experiments Content.
 * This component is responsible for displaying the implanted experiments content.
 */
const ImplantedExperimentsContent = () => (
  // fragment container
  <>
    {/* content header */}
    <ContentHeader title='Experimentos Implantados' editable={false} />
    {/* div content page container */}
    <div className='contentPage'>
      <ImplantedExperimentsTable />
    </div>
  </>
);

// EXPORT
export default ImplantedExperimentsContent;
