// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Layout } from 'antd';

// COMPONENTS
import ContentHeader from '../ContentHeader';

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
    <Layout>
      {/* show header */}
      {showHeader && renderContentHeader()}
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
