import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const TagResult = ({ title, tags }) => (
  <div>
    <p>{title}</p>
    {tags.map((tag) => (
      <Tag key={tag.uuid}>{tag.title}</Tag>
    ))}
  </div>
);

TagResult.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TagResult;
