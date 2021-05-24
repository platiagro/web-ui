import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import './TaskTemplateItem.style.less';

const TaskTemplateItem = ({
  className,
  style,
  title,
  description,
  buttonText,
  handleClickButton,
  titleComponent,
}) => {
  return (
    <div className={`task-template-item ${className}`} style={style}>
      <div className='task-template-item-title-container'>
        {titleComponent || (
          <div className='task-template-item-title'>{title}</div>
        )}
      </div>

      <div className='task-template-item-description'>{description}</div>

      <Button
        className='task-template-item-button'
        onClick={handleClickButton}
        type='default'
        shape='round'
      >
        {buttonText}
      </Button>
    </div>
  );
};

TaskTemplateItem.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  handleClickButton: PropTypes.func,
  titleComponent: PropTypes.node,
};

TaskTemplateItem.defaultProps = {
  className: '',
  style: undefined,
  title: '',
  description: '',
  buttonText: '',
  handleClickButton: undefined,
  titleComponent: undefined,
};

export default TaskTemplateItem;
