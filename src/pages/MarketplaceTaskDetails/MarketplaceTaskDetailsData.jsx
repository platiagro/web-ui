import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Typography, Avatar, Tag } from 'antd';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';

import { TASK_CATEGORIES } from 'configs';

import MarketplaceTaskDetailsDataSkeleton from './MarketplaceTaskDetailsDataSkeleton';

const MarketplaceTaskDetailsData = ({
  taskData,
  isCopyingTask,
  isLoadingTask,
  handleCopyTask,
}) => {
  if (isLoadingTask) return <MarketplaceTaskDetailsDataSkeleton />;

  return (
    <div className='marketplace-task-details-content-data'>
      <div className='marketplace-task-details-content-data-header'>
        <Avatar
          className='marketplace-task-details-content-data-header-avatar'
          src={taskData.img}
          alt='Task Author'
          size={100}
        >
          {taskData.name.charAt(0)}
        </Avatar>

        <div className='marketplace-task-details-content-data-header-info'>
          <Typography.Title
            level={4}
            className='marketplace-task-details-content-data-header-info-name'
          >
            {taskData.name}
          </Typography.Title>

          <Typography.Paragraph>
            {TASK_CATEGORIES[taskData.category]?.name || taskData.category}
          </Typography.Paragraph>

          {taskData.author?.uuid && taskData.author?.name && (
            <Link
              to={`/marketplace/author/${taskData.author?.uuid || ''}`}
              component={Typography.Link}
            >
              {taskData.author?.name}
            </Link>
          )}
        </div>

        <Button
          shape='round'
          type='primary'
          onClick={handleCopyTask}
          disabled={isCopyingTask}
          icon={isCopyingTask ? <LoadingOutlined /> : <DownloadOutlined />}
        >
          Fazer uma cópia
        </Button>
      </div>

      <div className='marketplace-task-details-content-data-body'>
        {!!taskData.description && (
          <div>
            <Typography.Title level={5}>Visão geral</Typography.Title>
            <Typography.Text>{taskData.description}</Typography.Text>
          </div>
        )}

        {!!taskData.dataIn && (
          <div>
            <Typography.Title level={5}>Entrada</Typography.Title>
            <Typography.Text>{taskData.dataIn}</Typography.Text>
          </div>
        )}

        {!!taskData.dataOut && (
          <div>
            <Typography.Title level={5}>Saída</Typography.Title>
            <Typography.Text>{taskData.dataOut}</Typography.Text>
          </div>
        )}

        {!!taskData.docs && (
          <div>
            <Typography.Title level={5}>Documentação</Typography.Title>
            <Typography.Link
              target='_blank'
              href={taskData.docs}
              referrerPolicy='no-referrer'
            >
              {taskData.docs}
            </Typography.Link>
          </div>
        )}

        {!!taskData.tags && (
          <div>
            <Typography.Title level={5}>Tags</Typography.Title>
            {taskData.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

MarketplaceTaskDetailsData.propTypes = {
  taskData: PropTypes.object,
  isCopyingTask: PropTypes.bool,
  isLoadingTask: PropTypes.bool,
  handleCopyTask: PropTypes.func,
};

MarketplaceTaskDetailsData.defaultProps = {
  taskData: {},
  isCopyingTask: false,
  isLoadingTask: false,
  handleCopyTask: undefined,
};

export default MarketplaceTaskDetailsData;
