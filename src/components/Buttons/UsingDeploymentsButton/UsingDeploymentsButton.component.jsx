import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { QuestionCircleOutlined } from '@ant-design/icons';

const UsingDeploymentsButton = ({ onClick }) => {
  return (
    <Button
      shape='round'
      onClick={onClick}
      type='primary-inverse'
      className='newProjectButton'
      icon={<QuestionCircleOutlined />}
    >
      Como usar um fluxo implantado?
    </Button>
  );
};

UsingDeploymentsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default UsingDeploymentsButton;
