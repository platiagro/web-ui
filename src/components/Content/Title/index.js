// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon, Typography } from 'antd';

// TYPOGRAPHY COMPONENTS
const { Title: AntTitle } = Typography;

/**
 * Title.
 * This component is responsible for displaying a normal or editable title.
 */
const Title = ({ title, level, loading, handleSubmit }) => {
  // FUNCTIONS
  // before submit
  const beforeSubmit = (newTitle) => {
    // removing white spaces from title
    const trimedNewTitle = newTitle.trim();

    // new title is different from old and not blank
    if (trimedNewTitle !== title && trimedNewTitle.length > 0)
      handleSubmit(trimedNewTitle);
  };

  // CONSTANTS
  // is editable
  const editable = handleSubmit ? { onChange: beforeSubmit } : undefined;

  // RENDER
  return (
    // fragment container
    <>
      {/* ant design title */}
      <AntTitle level={level} editable={editable}>
        {title}
      </AntTitle>
      {/* loading */}
      {loading && <Icon type='loading' />}
    </>
  );
};

// PROP TYPES
Title.propTypes = {
  /** title string */
  title: PropTypes.string.isRequired,
  /** title level number */
  level: PropTypes.number.isRequired,
  /** title is loading */
  loading: PropTypes.bool.isRequired,
  /** title submit function */
  handleSubmit: PropTypes.func.isRequired,
};

// EXPORT
export default Title;
