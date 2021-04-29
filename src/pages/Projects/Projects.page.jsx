import React from 'react';

import ContentHeaderContainer from 'components/ContentHeader/ContentHeaderContainer';

import ProjectsTable from './ProjectsTable/ProjectsTableContainer';
import NewProjectModal from './NewProjectModal/NewProjectModalContainer';
import NewProjectButtonContainer from './NewProjectButton/NewProjectButtonContainer';
import DeleteProjectsButtonContainer from './DeleteProjectsButton/DeleteProjectsButtonContainer';

const ProjectsContent = () => {
  return (
    <>
      <ContentHeaderContainer
        title='Meus projetos'
        editable={false}
        backIcon={false}
      />

      <div className='contentPage'>
        <NewProjectButtonContainer />
        <DeleteProjectsButtonContainer />
        <NewProjectModal />
        <ProjectsTable />
      </div>
    </>
  );
};

export default ProjectsContent;
