import React, { useState } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';
import * as componentsApi from '../../services/componentsApi';

const EditableTitle = (props) => {
  const {
    details: { name, uuid },
    fetch,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newVal, setNewVal] = useState(name);

  const handleChange = (e) => {
    setNewVal(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    if (!!e.currentTarget.value.trim() && e.currentTarget.value !== name) {
      const response = await componentsApi.updateComponent(
        uuid,
        e.currentTarget.value
      );

      if (!response) {
        setNewVal(name);
      } else {
        await fetch();
      }
    } else {
      setNewVal(name);
    }

    setEditMode(false);
    setLoading(false);
  };

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
};

export default EditableTitle;
