// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import NewProjectButton from '../NewProjectButton';
import ProjectsEmpty from '../ProjectsEmpty';
import ProjectsTable from '../ProjectsTable';

// STYLES
import './style.scss';

// MOCKS
import projectsMock from '../ProjectsTable/_projectsMock';

const ProjectsContent = () => (
  // div container
  <div className='projectsPage'>
    {/* new project button */}
    <NewProjectButton
      disabled={false}
      handleClick={() => alert('newProject!')}
    />
    {/* projects empty */}
    {/* <ProjectsEmpty /> */}
    {/* projects table */}
    <ProjectsTable
      projects={projectsMock}
      handleClickProject={(uuid) => alert(uuid)}
    />
  </div>
);

export default ProjectsContent;
