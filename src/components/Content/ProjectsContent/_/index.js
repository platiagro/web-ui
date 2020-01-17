// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import NewProjectButton from '../NewProjectButton';

// STYLES
import './style.scss';

const ProjectsContent = () => (
  <div className='projectsPage'>
    <NewProjectButton
      disabled={false}
      handleClick={() => alert('newProject!')}
    />
  </div>
);

export default ProjectsContent;
