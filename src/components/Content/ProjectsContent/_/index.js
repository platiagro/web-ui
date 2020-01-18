// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import NewProjectButton from '../NewProjectButton';
import ProjectsEmpty from '../ProjectsEmpty';
import ProjectsTable from '../ProjectsTable';
import NewProjectModal from '../NewProjectModal';

// STYLES
import './style.scss';

// MOCKS
import projectsMock from '../ProjectsTable/_projectsMock';

const ProjectsContent = () => {
  // HOOKS
  // editing hook
  const [modalVisible, setModalVisible] = useState(false);

  // FUNCTIONS
  // show modal function
  const showModal = () => {
    setModalVisible(true);
  };
  // hide modal function
  const hideModal = () => {
    setModalVisible(false);
  };

  // RENDER
  return (
    // div container
    <div className='projectsPage'>
      {/* new project button */}
      <NewProjectButton disabled={false} handleClick={showModal} />
      {/* new project modal */}
      <NewProjectModal
        visible={modalVisible}
        handleCloseModal={hideModal}
        handleNewProject={(projectName) => alert(projectName)}
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
};

export default ProjectsContent;
