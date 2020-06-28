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
const ContentHeaderContainer = ({ title }) => {
  // getting history
  const history = useHistory();

  // HANDLERS
  const goBackHandler = () => history.goBack();

  // RENDER
  return (
    <ContentHeader title={title} loading={false} handleGoBack={goBackHandler} />
  );
};

// PROP TYPES
ContentHeaderContainer.propTypes = {
  /** content header title */
  title: PropTypes.string.isRequired,
};

// EXPORT
export default ContentHeaderContainer;
