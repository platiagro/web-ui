// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS

import { EditOutlined } from '@ant-design/icons';
import { Typography, Tooltip } from 'antd';

import './style.less';

const { Title } = Typography;

const EditTitle = ({ title, level, editable, handleClick }) => {
  return (
    <div className='custom-edit-title'>
      <Title level={level}>{title}</Title>
      {editable && (
        <Tooltip title='Editar'>
          <EditOutlined
            className='custom-edit-input-icon'
            type='edit'
            onClick={handleClick}
          />
        </Tooltip>
      )}
    </div>
  );
};

EditTitle.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  editable: PropTypes.bool.isRequired,
};

export default EditTitle;
