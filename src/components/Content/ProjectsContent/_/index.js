// CORE LIBS
import React from 'react';

// COMPONENTS
import ContentHeaderContainer from '../../ContentHeader/_/ContentHeaderContainer';
import ProjectsTable from '../ProjectsTable/Container';
import NewProjectModal from '../NewProjectModal/Container';

// CONTAINERS
import NewProjectButtonContainer from '../NewProjectButton/Container';
import DeleteProjectsButtonContainer from '../DeleteProjectsButton/Container';

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
      <ContentHeaderContainer
        title='Meus projetos'
        editable={false}
        backIcon={false}
      />
      {/* div content page container */}
      <div className='contentPage'>
        {/* new project button */}
        <NewProjectButtonContainer />
        {/* delete projects button */}
        <DeleteProjectsButtonContainer />
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
