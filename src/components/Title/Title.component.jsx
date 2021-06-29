import React from 'react';
import { Skeleton } from 'antd';
import PropTypes from 'prop-types';

import EditTitle from 'containers/EditTitleContainer';

import './style.less';

const Title = ({ title, level, loading, handleSubmit }) => {
  const beforeSubmit = (newTitle) => {
    const trimmedNewTitle = newTitle.trim();
    if (trimmedNewTitle !== title && trimmedNewTitle.length > 0) {
      handleSubmit(trimmedNewTitle);
    }
  };

  return (
    <div className='Title'>
      {loading ? (
        <Skeleton
          className='skeleton-title'
          title={{ width: 150 }}
          paragraph={false}
          active
        />
      ) : (
        <EditTitle
          level={level}
          title={title}
          editable={!!handleSubmit}
          beforeSubmit={beforeSubmit}
        />
      )}
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

Title.defaultProps = {
  handleSubmit: undefined,
};

export default Title;
