import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography } from 'antd';

const MarketplaceAuthorInfo = ({ author, numberOfTasks, numberOfFlows }) => {
  return (
    <div className='marketplace-author-info'>
      <div className='marketplace-author-info-content'>
        <Avatar
          className='marketplace-author-info-content-avatar'
          alt={author.name}
          src={author.img}
          size={100}
        >
          {author.name?.charAt(0)}
        </Avatar>

        <div className='marketplace-author-info-content-texts'>
          <Typography.Title
            className='marketplace-author-info-content-texts-title'
            level={3}
          >
            {author.name}
          </Typography.Title>

          <Typography.Paragraph>{author.userName}</Typography.Paragraph>

          <div className='marketplace-author-info-content-texts-counters'>
            <span>
              <Typography.Text>Tarefas: </Typography.Text>
              <Avatar>
                <Typography.Text>{numberOfTasks}</Typography.Text>
              </Avatar>
            </span>

            <span>
              <Typography.Text>Fluxos: </Typography.Text>
              <Avatar>
                <Typography.Text>{numberOfFlows}</Typography.Text>
              </Avatar>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

MarketplaceAuthorInfo.propTypes = {
  author: PropTypes.object,
  numberOfTasks: PropTypes.number,
  numberOfFlows: PropTypes.number,
};

MarketplaceAuthorInfo.defaultProps = {
  author: {},
  numberOfTasks: 0,
  numberOfFlows: 0,
};

export default MarketplaceAuthorInfo;
