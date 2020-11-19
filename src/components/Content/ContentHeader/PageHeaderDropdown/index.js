// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { DownOutlined, ExperimentOutlined, ToolOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';

// STYLES
import './style.less';

/**
 * Page Header Dropdown.
 * This component is responsible for page header dropdown to change view.
 *
 * @param {object} props Component props
 * 
 * @returns {PageHeaderDropdown} Component
 * 
 * @component
 */
const PageHeaderDropdown = (props) => {
  // destructuring props
  const {
    type
  } = props;

  let icon, title, targetTitle;

  switch (type) {
    case 'experiment':
      icon = <ExperimentOutlined />;
      title = 'Experimentação';
      targetTitle = 'Pré-implantação';
      break;
    case 'deployment':
      icon = <ToolOutlined />;
      title = 'Pré-implantação';
      targetTitle = 'Experimentação';
      break;
    default:
      break;
  }

  const menu = (
    <Menu className='dropdown-menu'>
      <h1>Ir para:</h1>
      <Button shape='round' type='primary-inverse' size='medium'>
        {targetTitle}
      </Button>
    </Menu>
  );

  return (
    <div className='pageHeaderDropdown'>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button className={type} type='primary-inverse' size='large' onClick={e => e.preventDefault()}>
          {icon}
          {title}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  )
}
// PROP TYPES
PageHeaderDropdown.propTypes = {
  /** Actual page type (experiment/deployment)*/
  type: PropTypes.string.isRequired,
  /** Target route for button*/
  target: PropTypes.string.isRequired
};

// EXPORT
export default PageHeaderDropdown;
