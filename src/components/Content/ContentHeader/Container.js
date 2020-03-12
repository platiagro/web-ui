// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// COMPONENTS
import ContentHeader from './index';

/**
 * Content Header Container.
 * This component is responsible for create a logic container for content header
 * with route control.
 */
const ContentHeaderContainer = ({ title, editable }) => {
  // getting history
  const history = useHistory();

  // HANDLERS
  const goBackHandler = () => history.goBack();

  // RENDER
  return (
    <ContentHeader
      title={title}
      editable={editable}
      handleGoBack={goBackHandler}
    />
  );
};

// PROP TYPES
ContentHeaderContainer.propTypes = {
  /** content header has editable title */
  editable: PropTypes.bool.isRequired,
  /** content header title */
  title: PropTypes.string.isRequired,
};

// EXPORT
export default ContentHeaderContainer;
