import React from 'react';
import PropTypes from 'prop-types';
import { ClockCircleOutlined, PaperClipOutlined } from '@ant-design/icons';

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

      {uploadedFiles.map((file, index) => {
        return (
          <div
            key={`file-${file.uid}-${index}`}
            className='task-details-page-content-info-uploads-file'
          >
            <PaperClipOutlined />
            <span>{file.name}</span>
          </div>
        );
      })}
    </div>
  );
};

TaskDetailsUploads.propTypes = {
  uploadedFiles: PropTypes.array.isRequired,
};

export default TaskDetailsUploads;
