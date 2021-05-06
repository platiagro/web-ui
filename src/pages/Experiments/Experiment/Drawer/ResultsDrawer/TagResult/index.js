// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Tag } from 'antd';

/**
 * Tag Result.
 * This component is responsible for displaying tag result.
 */
const TagResult = ({ title, tags }) => (
  // div container
  <div>
    {/* rendering title */}
    <p>{title}</p>
    {/* rendering tags */}
    {tags.map((tag) => (
      <Tag key={tag.uuid}>{tag.title}</Tag>
    ))}
  </div>
);

// PROP TYPES
TagResult.propTypes = {
  /** tag result title string */
  title: PropTypes.string.isRequired,
  /** tag result tags list */
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// EXPORT
export default TagResult;
