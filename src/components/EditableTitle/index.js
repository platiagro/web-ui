// CORE LIBS
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon } from 'antd';
import AutosizeInput from 'react-input-autosize';

/**
 * EditableTitle.
 * This component is responsible for displaying an editable title.
 */
const EditableTitle = ({
  title,
  loading,
  handleSubmit,
  className,
  editingClassName,
}) => {
  // HOOKS
  // editing hook
  const [editing, setEditing] = useState(false);
  // input value hook
  const [inputValue, setInputValue] = useState(title);

  // FUNCTIONS
  // before submit
  const beforeSubmit = (e) => {
    // removing white spaces from title
    const newTitle = e.currentTarget.value.trim();

    if (newTitle !== title)
      if (newTitle.length > 0) handleSubmit(newTitle);
      else setInputValue(title);
  };
  // handle the key press
  const handleKeyPress = (e) => {
    const input = e.currentTarget;
    // on enter key press
    if (e.key === 'Enter') {
      input.blur();
      // on esc key press
    } else if (e.key === 'Escape') {
      setInputValue(title);
      setTimeout(() => input.blur(), 100);
    }
  };
  // handle input change
  const handleChange = (e) => {
    setInputValue(e.currentTarget.value);
  };

  // RENDER
  return (
    // div container
    <div>
      {/* input */}
      <AutosizeInput
        onBlur={beforeSubmit}
        onClick={() => {
          setEditing(true);
        }}
        onKeyUp={handleKeyPress}
        onChange={handleChange}
        className={editing ? className : editingClassName}
        value={inputValue}
        readOnly={!editing}
        disabled={loading}
      />
      {/* loading */}
      {loading && <Icon type='loading' />}
    </div>
  );
};

// PROP TYPES
EditableTitle.propTypes = {
  /** editable title string */
  title: PropTypes.string.isRequired,
  /** editable title is loading */
  loading: PropTypes.bool.isRequired,
  /** editable title submit function */
  handleSubmit: PropTypes.func.isRequired,
  /** editable title default css class string */
  className: PropTypes.string.isRequired,
  /** editable title editing css class string */
  editingClassName: PropTypes.string.isRequired,
};

// EXPORT
export default EditableTitle;
