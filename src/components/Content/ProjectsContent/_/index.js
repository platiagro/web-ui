// CORE LIBS
import React from 'react';

// COMPONENTS
import ContentHeaderContainer from '../../ContentHeader/ContentHeaderContainer';
import DeleteProjectsButton from '../DeleteProjectsButton/Container';
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
      <ContentHeaderContainer title='Meus projetos' editable={false} />
      {/* div content page container */}
      <div className='contentPage'>
        {/* new project button */}
        <NewProjectButton />
        {/* delete projects button */}
        <DeleteProjectsButton />
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
