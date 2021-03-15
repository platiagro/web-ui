// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import EditTitle from './EditTitle/Container';

/**
 * Title.
 * This component is responsible for displaying a normal or editable title.
 *
 * @component
 * @param {object} props Component props
 * @returns {Title} React component
 */
const Title = (props) => {
  // destructuring props
  const { title, level, loading, handleSubmit } = props;

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
  const editable = handleSubmit ? true : false;

  // RENDER
  return (
    // fragment container
    <>
      {/* if loading */}
      {loading ? (
        // loading
        <div>
          <Spin indicator={<LoadingOutlined />} />
        </div>
      ) : (
        <EditTitle
          level={level}
          title={title}
          editable={editable}
          beforeSubmit={beforeSubmit}
        />
      )}
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
  loading: PropTypes.bool,
  /** title submit function */
  handleSubmit: PropTypes.func,
};

// PROP DEFAULT VALUES
Title.defaultProps = {
  /** title edit submit function */
  handleSubmit: undefined,
};

// EXPORT
export default Title;
