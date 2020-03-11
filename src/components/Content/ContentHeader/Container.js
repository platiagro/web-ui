// CORE LIBS
import React from 'react';
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

// EXPORT
export default ContentHeaderContainer;
