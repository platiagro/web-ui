// CORE LIBS
import React from 'react';
import PropTypes from 'prop-types';

// UI LIBS
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const UsingDeploymentsButton = (props) => {
  const { handleClick } = props;
  return (
    <Button
      onClick={handleClick}
      icon={<QuestionCircleOutlined />}
      className='newProjectButton'
      shape='round'
      type='primary-inverse'
    >
      Como usar um fluxo implantado?
    </Button>
  );
};

// PROP TYPES
UsingDeploymentsButton.propTypes = {
  /** function to handle click */
  handleClick: PropTypes.func.isRequired,
};

// EXPORT
export default UsingDeploymentsButton;
