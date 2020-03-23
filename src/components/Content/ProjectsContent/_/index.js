// CORE LIBS
import React, { useState } from 'react';

// COMPONENTS
import ContentHeader from '../../ContentHeader/Container';
import NewProjectButton from '../NewProjectButton/Container';
import ProjectsTable from '../ProjectsTable/Container';
import NewProjectModal from '../NewProjectModal/Container';

/**
 * Projects Content.
 * This component is responsible for displaying the projects content.
 */
const ProjectsContent = () => {
  // RENDER
  return (
    // fragment
    <>
      {/* content header */}
      <ContentHeader title='Projetos' editable={false} />
      {/* div content page container */}
      <div className='contentPage'>
        {/* new project button */}
        <NewProjectButton />
        {/* new project modal */}
        <NewProjectModal />
        {/* projects table */}
        <ProjectsTable />
      </div>
    </>
  );
};

// EXPORT
export default ProjectsContent;
