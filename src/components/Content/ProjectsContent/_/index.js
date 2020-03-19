// CORE LIBS
import React, { useState } from 'react';

// COMPONENTS
import ContentHeader from '../../ContentHeader/Container';
import NewProjectButton from '../NewProjectButton';
import ProjectsTable from '../ProjectsTable/Container';
import NewProjectModal from '../NewProjectModal/Container';

/**
 * Projects Content.
 * This component is responsible for displaying the projects content.
 */
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
    // fragment
    <>
      {/* content header */}
      <ContentHeader title='Projetos' editable={false} />
      {/* div content page container */}
      <div className='contentPage'>
        {/* new project button */}
        <NewProjectButton disabled={false} handleClick={showModal} />
        {/* new project modal */}
        <NewProjectModal visible={modalVisible} handleCloseModal={hideModal} />
        {/* projects table */}
        <ProjectsTable />
      </div>
    </>
  );
};

// EXPORT
export default ProjectsContent;
