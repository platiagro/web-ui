/**
 * Component responsible for:
 * - Structuring the editable title layout
 * - Update the title
 */
import React, { useState } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';

const EditableTitle = (props) => {
  const { details, onUpdate } = props;
  const { name } = details;
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newVal, setNewVal] = useState(name);

  // Funtion to handle text change
  const handleChange = (e) => {
    setNewVal(e.currentTarget.value);
  };

  // Funtion to handle submit
  const handleSubmit = (e) => {
    setLoading(true);
    if (!!e.currentTarget.value.trim() && e.currentTarget.value !== name) {
      onUpdate(details, e.currentTarget.value).then((response) => {
        if (!response) {
          setNewVal(name);
        }
      });
    } else {
      setNewVal(name);
    }

    setEditMode(false);
    setLoading(false);
  };

  // Funtion to handle the key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setNewVal(name);
    }
  };

  return (
    <>
      <AutosizeInput
        onBlur={handleSubmit}
        onClick={() => {
          setEditMode(true);
        }}
        onKeyUp={handleKeyPress}
        onChange={handleChange}
        className={
          editMode
            ? 'ant-page-header-heading-title autosize-input-custom'
            : 'ant-page-header-heading-title autosize-input-custom edit-mode'
        }
        value={newVal}
        readOnly={!editMode}
        disabled={loading}
      />
      {loading && <Icon type='loading' />}
    </>
  );
};

EditableTitle.propTypes = {
  details: PropTypes.shape({
    uuid: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditableTitle;
