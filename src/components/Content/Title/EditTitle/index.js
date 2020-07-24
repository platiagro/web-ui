// CORE LIBS
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Typography, Input, Tooltip } from 'antd';

import './style.scss';

const { Title } = Typography;

const EditTitle = ({ title, level, editable, beforeSubmit }) => {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setCurrentTitle(title);
  }, [title]);

  const handleSubmit = () => {
    beforeSubmit(currentTitle);
    setEditMode(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      setCurrentTitle(title);
      setEditMode(false);
    }
  };
  return !editMode ? (
    <div className='custom-edit-title'>
      <Title level={level}>{title}</Title>
      {editable && (
        <Tooltip title='Editar'>
          <LegacyIcon
            className='custom-edit-input-icon'
            type='edit'
            onClick={() => setEditMode(true)}
          />
        </Tooltip>
      )}
    </div>
  ) : (
    <Input
      value={currentTitle}
      onChange={(e) => setCurrentTitle(e.target.value)}
      autoFocus
      onFocus={(e) => e.target.select()}
      onBlur={handleSubmit}
      onKeyUp={handleKeyPress}
    />
  );
};

EditTitle.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  editable: PropTypes.bool.isRequired,
  beforeSubmit: PropTypes.func.isRequired,
};

export default EditTitle;
