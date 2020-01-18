// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Layout } from 'antd';

// COMPONENTS
import ContentHeader from '../ContentHeader';

// CONTENTS
import ProjectsContent from '../ProjectsContent/_';

// MOCKS
import projectsMock from '../ProjectsContent/ProjectsTable/_projectsMock';

/**
 * Content.
 * This component is responsible for displaying the content.
 */
const Content = ({ showHeader }) => {
  // COMPONENTS RENDERS
  // content header
  const renderContentHeader = () => (
    <ContentHeader
      title='Título'
      editable
      handleGoBack={() => alert('goBack!')}
    />
  );

  // RENDER
  return (
    // layout component
    <Layout>
      {/* show header */}
      {showHeader && renderContentHeader()}
      {/* projects content */}
      <ProjectsContent projects={projectsMock} />
    </Layout>
  );
};

// PROP TYPES
Content.propTypes = {
  /** content show sheader */
  showHeader: PropTypes.bool.isRequired,
};

// EXPORT
export default Content;
