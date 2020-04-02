// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { PageHeader } from 'antd';

// COMPONENTS
import Title from '../Title';

// STYLES
import './style.scss';

/**
 * Content Header.
 * This component is responsible for displaying the content header with editable
 * title and go back arrow.
 */
const ContentHeader = ({ handleGoBack, handleSubmit, title, loading }) => {
  // RENDER
  return (
    // page header component
    <PageHeader
      className='contentHeader'
      title={
        // title component
        <Title
          loading={loading}
          level={2}
          title={title}
          handleSubmit={handleSubmit}
        />
      }
      onBack={handleGoBack}
    />
  );
};

// PROP TYPES
ContentHeader.propTypes = {
  /** content header go back function */
  handleGoBack: PropTypes.func.isRequired,
  /** content header edit submit function */
  handleSubmit: PropTypes.func,
  /** content header title */
  title: PropTypes.string.isRequired,
};

// PROP DEFAULT VALUES
ContentHeader.defaultProps = {
  /** content header edit submit function */
  handleSubmit: undefined,
};

// EXPORT
export default ContentHeader;
