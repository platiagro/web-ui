// CORE LIBS
import React from 'react';

// COMPONENTS
import ContentHeaderContainer from 'components/ContentHeader/_/ContentHeaderContainer';
import ProjectsTable from '../ProjectsTable/ProjectsTableContainer';
import NewProjectModal from '../NewProjectModal/NewProjectModalContainer';

// CONTAINERS
import NewProjectButtonContainer from '../NewProjectButton/NewProjectButtonContainer';
import DeleteProjectsButtonContainer from '../DeleteProjectsButton/DeleteProjectsButtonContainer';

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
