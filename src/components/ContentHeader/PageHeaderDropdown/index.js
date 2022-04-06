import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import {
  DownOutlined,
  ToolOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';

import './style.less';

const PAGE_HEADER_DROPDOWN_TYPES = {
  EXPERIMENT: 'experiment',
  DEPLOYMENT: 'deployment',
};

const PageHeaderDropdown = ({ type, target }) => {
  const history = useHistory();

  const { icon, title, targetTitle } = useMemo(() => {
    switch (type) {
      case PAGE_HEADER_DROPDOWN_TYPES.EXPERIMENT: {
        return {
          icon: <ExperimentOutlined />,
          title: 'Experimentação',
          targetTitle: 'Pré-implantação',
        };
      }

      case PAGE_HEADER_DROPDOWN_TYPES.DEPLOYMENT: {
        return {
          icon: <ToolOutlined />,
          title: 'Pré-implantação',
          targetTitle: 'Experimentação',
        };
      }

      default:
        return {};
    }
  }, [type]);

  const handleChangeView = () => {
    history.push(target);
  };

  return (
    <div className='pageHeaderDropdown'>
      <Dropdown
        trigger={['click']}
        overlay={
          <div className='dropdown-menu'>
            <h1>Ir para:</h1>
            <Button
              shape='round'
              size='medium'
              type='primary-inverse'
              onClick={handleChangeView}
            >
              {targetTitle}
            </Button>
          </div>
        }
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
