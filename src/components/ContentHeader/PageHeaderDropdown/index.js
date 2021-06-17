import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import {
  DownOutlined,
  ExperimentOutlined,
  ToolOutlined,
} from '@ant-design/icons';

import './style.less';

const PAGE_HEADER_DROPDOWN_TYPES = {
  EXPERIMENT: 'experiment',
  DEPLOYMENT: 'deployment',
};

const PageHeaderDropdown = ({ type, target }) => {
  const history = useHistory();

  let icon, title, targetTitle;

  switch (type) {
    case PAGE_HEADER_DROPDOWN_TYPES.EXPERIMENT: {
      icon = <ExperimentOutlined />;
      title = 'Experimentação';
      targetTitle = 'Pré-implantação';
      break;
    }

    case PAGE_HEADER_DROPDOWN_TYPES.DEPLOYMENT: {
      icon = <ToolOutlined />;
      title = 'Pré-implantação';
      targetTitle = 'Experimentação';
      break;
    }

    default:
      break;
  }

  const handleChangeView = () => {
    history.push(target);
  };

  return (
    <div className='pageHeaderDropdown'>
      <Dropdown
        overlay={
          <Menu className='dropdown-menu'>
            <h1>Ir para:</h1>
            <Button
              shape='round'
              type='primary-inverse'
              size='medium'
              onClick={handleChangeView}
            >
              {targetTitle}
            </Button>
          </Menu>
        }
        trigger={['click']}
      >
        <Button
          className={type}
          size='large'
          type='primary-inverse'
          onClick={(e) => e.preventDefault()}
        >
          {icon}
          {title}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

PageHeaderDropdown.propTypes = {
  type: PropTypes.oneOf([
    PAGE_HEADER_DROPDOWN_TYPES.EXPERIMENT,
    PAGE_HEADER_DROPDOWN_TYPES.DEPLOYMENT,
  ]).isRequired,
  target: PropTypes.string.isRequired,
};

export default PageHeaderDropdown;
