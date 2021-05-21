import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import './style.less';

const EditTitle = ({ title, level, editable, handleClick }) => {
  return (
    <div className='custom-edit-title'>
      <Typography.Title level={level} ellipsis>
        {title}
      </Typography.Title>

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
  handleClick: PropTypes.func,
};

EditTitle.defaultProps = {
  handleClick: undefined,
};

export default EditTitle;
