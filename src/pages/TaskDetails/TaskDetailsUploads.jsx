import React from 'react';
import PropTypes from 'prop-types';
import { ClockCircleOutlined } from '@ant-design/icons';

import { Placeholder } from 'components';

const TaskDetailsUploads = ({ uploadedFiles }) => {
  return (
    <div className='task-details-page-content-info-uploads'>
      <div className='task-details-page-content-info-uploads-title'>
        <ClockCircleOutlined />
        <span>Uploads Recentes</span>
      </div>

      {uploadedFiles.length === 0 && (
        <Placeholder
          iconComponent={<ClockCircleOutlined />}
          message='Nenhum Upload Foi Realizado'
        />
      )}

      {uploadedFiles.map((_, index) => {
        return <div key={`file-${index}`}>File</div>;
      })}
    </div>
  );
};

TaskDetailsUploads.propTypes = {
  uploadedFiles: PropTypes.array.isRequired,
};

export default TaskDetailsUploads;
