/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Icon } from 'antd';
import AutosizeInput from 'react-input-autosize';
import * as projectsServices from '../../services/projectsApi';

const EditableTitle = (props) => {
  const {
    details: { uuid, name, projectId },
    fetch,
  } = props;
  // const { value } = props;
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newVal, setNewVal] = useState(name);

  const handleChange = (e) => {
    setNewVal(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    console.log(e.currentTarget.value.trim(), name, uuid, projectId);
    setLoading(true);
    if (!!e.currentTarget.value && e.currentTarget.value !== name) {
      const response = await projectsServices.updateExperiment(
        projectId,
        uuid,
        e.currentTarget.value
      );
      if (!!response) {
        fetch();
      }
    } else {
      console.log('NÃO MUDOU');
      setNewVal(name);
    }

    setEditMode(false);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
      // handleSubmit(e);
    }
  };

  return (
    <div>
      <AutosizeInput
        onBlur={handleSubmit}
        onClick={() => {
          setEditMode(true);
        }}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        className={
          editMode
            ? 'experiment-title autosize-input-custom'
            : 'experiment-title autosize-input-custom edit-mode'
        }
        value={newVal}
        readOnly={!editMode}
        disabled={loading}
      />
      {loading && <Icon type='loading' />}
    </div>
  );
};

export default EditableTitle;
