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

/**
 * Projects Content.
 * This component is responsible for displaying the projects content.
 */
const ProjectsContent = ({ projects }) => {
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

  // COMPONENTS RENDERS
  // projects empty
  const renderProjectsEmpty = () => <ProjectsEmpty />;
  // projects table
  const renderProjectsTable = () => (
    <ProjectsTable
      projects={projects}
      handleClickProject={(uuid) => alert(uuid)}
    />
  );

  // RENDER
  return (
    // fragment
    <>
      {/* new project button */}
      <NewProjectButton disabled={false} handleClick={showModal} />
      {/* new project modal */}
      <NewProjectModal
        visible={modalVisible}
        handleCloseModal={hideModal}
        handleNewProject={(projectName) => alert(projectName)}
      />
      {/* projects table or projects empty */}
      {projects.length > 0 ? renderProjectsTable() : renderProjectsEmpty()}
    </>
  );
};

// PROP TYPES
ProjectsContent.propTypes = {
  /** projects content projects list */
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT
export default ProjectsContent;
