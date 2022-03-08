import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const ResultsDrawerAddCard = ({ isAdding, handleAddFigure }) => {
  return (
    <Card className='results-drawer-add-card'>
      <Button
        shape='round'
        type='primary-inverse'
        onClick={handleAddFigure}
        icon={isAdding ? <LoadingOutlined /> : <PlusOutlined />}
      >
        <span>Adicionar Resultado</span>
      </Button>
    </Card>
  );
};

ResultsDrawerAddCard.propTypes = {
  isAdding: PropTypes.bool,
  handleAddFigure: PropTypes.func,
};

ResultsDrawerAddCard.defaultProps = {
  isAdding: false,
  handleAddFigure: undefined,
};

export default ResultsDrawerAddCard;
