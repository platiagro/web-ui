// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import ContentHeader from '../../ContentHeader';
import NewProjectButton from '../NewProjectButton';
import ProjectsEmpty from '../ProjectsEmpty';
import ProjectsTable from '../ProjectsTable';
import NewProjectModal from '../NewProjectModal';

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
      {/* content header */}
      <ContentHeader
        title='Projetos'
        editable={false}
        handleGoBack={() => alert('goBack!')}
      />
      {/* div content page container */}
      <div className='contentPage'>
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
      </div>
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
